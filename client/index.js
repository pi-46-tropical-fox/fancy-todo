let baseUrl = 'http://localhost:3001'


$(document).ready(()=>{
    console.log('local:');
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
        inUser()
    } else {
        rejectUser()
    }

    $("#login").click(loginPost) 
    $("#register").click(registerPost)
    $("#regisButton").click(afterRegis)
    $("#loginButton").click(beforeRegis)



    $('#submitEdit').click(submitEdit)
    $('#submitAdd').click(submitAdd)
    $('#logoutbtn').click(sideLogout)

})

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/googlelogin`,
        headers: {google_access_token}
    })
    .done(res => {
        console.log(res)
        localStorage.setItem('access_token',res.token)
        $('#navbar').show()
        $('#todolist').show()
        $('#Flex-01').show()
        $('#modalCreate').show()
        $("#loginForm").hide()
        $("#regisForm").hide()
        showTodo()
    })
    .fail(err => console.log(err))
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    // $("#logoutbtn").hide()

    localStorage.clear()
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function showTodo(id){
    $.ajax({
        method: "GET",
        url: `${baseUrl}/todos`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(function(resp){
        $("#todolist").empty()
        resp.forEach(data => {
            $("#todolist").append(`
            <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><span id="${data.id}" class="badge badge-pill badge-warning">${data.status}</span></h5>
                <div class="d-flex flex-column">
                    <small>${moment(data.createdAt).startOf('hour').fromNow()}</small>
                    <div d-flex flex-row>
                       <span class="deleteTodo" id="${data.id}"> <ion-icon name="trash-outline"></ion-icon></span> 
                       <span class="editTodo" id="${data.id}" data-toggle="modal" data-target="#editTodoModal" data-whatever="@mdo"><ion-icon name="create-outline"></ion-icon></span> 
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column">
                <h5 class="mb-1">${data.title}</h5>
                <p class="mb-1">${data.description}</p>
                <p class="mb-1">${data.UserId}</p>
                <small>Due Date : <small>    
                <span>${(moment(data.due_date))}</span>
            </div>
        </a>
            `)
        });
        deleteTodos()
        editTodos()
        updateStatusTodo()
        showQuotes()
    })
    .fail(function(err){
        console.log(err);
    })
}

//3rd Party Quotes
function showQuotes(){
    $.ajax({
        method: "GET",
        url: `${baseUrl}/quotes`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(function(resp){
        $("#Flex-01").empty()
        // console.log(resp, 'Ini dari ajax');
        resp.forEach(data => {
        $("#Flex-01").append(`
        <div id="quotes">
            <h2>QUOTE OF THE DAY</h2> <br>
            <h5 style="color: #E89923;">${data.quote}</h5> <br>
            <p style="color: grey">- ${data.author} -</p>
        </div>
        `)
        });
    })
    .fail(function(err){
        console.log(err);
    })
}

function updateStatusTodo(){
    $('.badge-warning').click(function(){
        swal.fire({
            title: 'Are you sure?',
            text: "Your todo will be set to complete",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I already done!'
        })
        .then((result) => {
            if (result.value) {
                updatestatus(this.id)
            }else{
                swal.fire({
                    title: "cancel todo",
                    type: "success",
                    timer: 1500
                });
                }            
        });
    })
}

function updatestatus(id){
    $.ajax({
        method: "PUT",
        url: `${baseUrl}/todos/${id}`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            id
        }
    })

    .done(function(todo){
        const datas = {
            title: todo.title, 
            description: todo.description, 
            status: "Complete", 
            due_date: todo.due_date, 
            id: todo.id
        }

        console.log(todo, '<< SEBELUM UPDATE');
        console.log(datas, '<< SETELAH UPDATE');

    editTodos(data)
        swal.fire({
            title: "Your todo is now complete !!",
            type: "Completed!",
            timer: 1500
        });
        showTodo()
        showQuotes()
    })
    .fail(function(err){
        console.log(err);
        
    })
}

function deleteTodos(){
    $('.deleteTodo').on("click",function () {
        event.preventDefault()
        
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value) {
                removeTodo(this.id)
            }else{
                swal.fire({
                    title: "cancel remove todo",
                    type: "success",
                    timer: 1500
                });
            }            
        });
    })
}

function removeTodo(id){
    $.ajax({
        method: "DELETE",
        url: `${baseUrl}/todos/${id}`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            id
        }
    })
    .done(function(todo){
        swal.fire({
            title: "Your todo has been deleted!!",
            type: "deleted",
            timer: 1500
        });
        showTodo()
        showQuotes()
    })
    .fail(function(err){
       // console.log(err);
        
    })
}

function editTodos(){
    $('.editTodo').on("click",function () {
        event.preventDefault()
        $.ajax({
            method: "GET",
            url: `${baseUrl}/todos/${this.id}`,
            headers:{
                token : localStorage.getItem('token')
            }
        })
        .done(function(data){
            console.log(data, '<< INI DARI EDIT');
            let now = new Date(data.due_date)
            $('#title1').val(data.title)
            $('#description1').val(data.description)
            $('#status1').val(data.status)
            $('#duedate1').val(now.getFullYear()+"-"+("0" + (now.getMonth() + 1)).slice(-2)+"-"+("0" + now.getDate()).slice(-2))    
            $('#uid').val(data.id)
        })
        .fail(function(err){
            console.log(err);
            
        })
    })
}



function inUser(){
    $('#navbar').show()
    $('#todolist').show()
    $('#modalCreate').show()
    $('#Flex-01').show()
    $("#loginForm").hide()
    $("#regisForm").hide()
    showTodo()
    showQuotes()
}

function rejectUser(){
    $('#navbar').hide()
    $('#todolist').hide()
    $('#modalCreate').hide()
    $('#Flex-01').hide()
    $("#loginForm").show()
    $("#regisForm").hide()
}


function loginPost(event) { 
    event.preventDefault();
    let email = $('#email').val()
    let password = $('#password').val()

    if (email != '' && password != '') {
        $.ajax({
                method: "POST",
                url: `${baseUrl}/login`,
                data: {
                    email,
                    password
                }
            })
            .done(resp => {
                swal.fire({
                    type: "success",
                    title: "Success Login!",
                    timer: 1500
                })
                //console.log(resp.token);
                localStorage.setItem('token', resp.token)
                $("#loginForm").hide()
                $("#navbar").show()
                $('#todolist').show()
                $('#Flex-01').show()
                showTodo()
                showQuotes()
                $('#modalCreate').show()
                    
            })
            .fail(textStatus => {
               // console.log(textStatus)
                swal.fire({
                type: "error",
                title: "Email/Password Wrong",
                timer: 1500
                })
            })
    } else {
        swal.fire({
            type: "error",
            title: "Email/Password cannot be empty",
            timer: 1500
        })
    }   
}
    
    
function registerPost(event){

    let email = $('#Email1').val()
    let password = $('#Password1').val()

    if (email != '' && password != '') {
        $.ajax({
            method: "POST",
            url: `${baseUrl}/register`,
            data: {
                    email,
                    password
                 }
            })
            .done(resp => {
                swal.fire({
                    type: "success",
                    title: "Success Register, Please Login",
                    timer: 1500
                })
                $('#regisform').hide()
                $('#loginform').show()

                })
            .fail(status => {
                //console.log(status)
                swal.fire({
                    type: "error",
                    title: "Email Already Used",
                    timer: 1500
                })
                $('#regisform').show()
            })
    } else {
        swal.fire({
            type: "error",
            title: "Email/Password cannot be empty",
            timer: 1500
        })
        $('#regisform').show()
    }
}

function afterRegis(event) { 
    event.preventDefault();
    $("#loginForm").hide()
    $("#regisForm").show()
};

function beforeRegis(event) { 
    event.preventDefault();
    $("#loginForm").show()
    $("#regisForm").hide()
};

function sideLogout() {
    event.preventDefault()
    signOut()
    swal.fire({
        title: 'Are you sure?',
        text: "Your todo is waiting for you",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        })
        .then((result) => {
            if(result.value){
                signOut()
                swal.fire({
                    type: "success",
                    title: "You're logging out",
                    timer: 1500
                })
                // loginPost()
                $('#navbar').hide()
                $('#todolist').hide()
                $('#modalCreate').hide()
                $('#Flex-01').hide()
                $("#loginForm").show()
                $('#email').val("")
                $('#password').val("")

            }else{
                swal.fire({
                    type: "warning",
                    title: "Yes, Going back to create todos",
                    timer: 1500
                })
        }            
                    
    });
}


function submitAdd() {
    event.preventDefault()
    let title = $('#title').val()
    let status = $(`#status`).val()
    let description = $('#description').val()
    let due_date = $('#duedate').val()

    // console.log(typeof(due_date), new Date(due_date) ,'<<< FORMAT TANGGAL');
    // console.log(new Date() ,'<<< FORMAT NEW DATE');        

    if (title != '' && description != '' && due_date != '' && status != "") {
        if(new Date(due_date) >= new Date()){
            $.ajax({
                method: "POST",
                url: `${baseUrl}/todos`,
                headers:{
                        token : localStorage.getItem('token')
                        },
                data: {
                        title,
                        status,
                        description,
                        due_date,
                        UserId: this.UserId
                        }
                    })
            .done(resp => {
                $('#addTodoModal').modal('hide')
                swal.fire({
                    type: "success",
                    title: "Todo List has Been Created",
                    timer: 1500
                })
                showTodo()
                    $('#title').val('')
                    $('#description').val('')
                    $('$status').val('')
                    $('#duedate').val('')
                })
            .fail(textStatus => {
                console.log(textStatus)
                swal.fire({
                    type: "Error",
                    title: "Error"
                    })
                })
        } else {
            swal.fire({
                type: "error",
                title: "Date must be higher or equal than today",
                timer: 1500
            })
        }
    } else {
        swal.fire({
            type: "error",
            title: "Please complete the form !!",
            timer: 1500
        })
    }
}

function submitEdit(){
    let title = $('#title1').val()
    let description = $('#description1').val()
    let status = $('#status1').val()
    let due_date = $('#duedate1').val()
    let id = $('#uid').val()
    
    $.ajax({
        method: "PUT",
        url: `${baseUrl}/todos/${id}`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
                title,
                description,
                status,
                due_date
            }
        })
    .done(function(){  
            $('#editTodoModal').modal('hide')
            swal.fire({
                type: "success",
                title: "todo is changing",
                timer: 1500
            })
            showTodo()
            showQuotes()
        })
    .fail(function(err){
            console.log(err);        
    })
}
      
function testAPI() {                      
    console.log('Test FB');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}

function statusChangeCallback(response) {  
    console.log('statusChangeCallback');
    console.log(response);                  
    if (response.status === 'connected') {  
      testAPI();  
    } else {                                 
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
}
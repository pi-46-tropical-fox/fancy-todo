let baseUrl = 'http://localhost:3099'


$(document).ready(()=>{
    console.log('local:');
    console.log(localStorage.getItem("token"));
    getHero()
    if (localStorage.getItem("token") !== null) {
        inUser()
    } else {
        rejectUser()
    }

    $("#login").click(loginPost) 
    $("#register").click(registerPost)
    $("#regisButton").click(afterRegis)


    $('#submitEdit').click(submitAdd)
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

function showTodo(){
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
                <h5 class="mb-1">${data.title} <span id="${data.id}" class="badge badge-pill badge-warning">${data.status}</span></h5>
                <div class="d-flex flex-column">
                    <small>${moment(data.createdAt).startOf('hour').fromNow()}</small>
                    <div d-flex flex-row>
                       <span class="deleteTodo" id="${data.id}"> <i class="fa fa-lg fa-ban trash-icon" aria-hidden="true"></i> </span> 
                       <span class="editTodo" id="${data.id}" data-toggle="modal" data-target="#editTodoModal" data-whatever="@mdo"><i class="fa fa-lg fa-pencil pencil-icon" aria-hidden="true"></i></span> 
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column"> 
                <p class="mb-1">${data.description}</p>
                <span class="speakTodo" id="${data.id}" onclick='responsiveVoice.speak("${data.title}");'> <i class="fa fa-play fa-icon" aria-hidden="true"></i> </span>
                <small>Created At<small>    
                <span>${(moment(data.due_date))}</span>
            </div>
        </a>
            `)
        });
        deleteTodos()
        editTodos()
        updateStatusTodo()
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
                    type: "success"
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
        Swal.fire(
            'Completed!',
            'Your todo is now completed.',
            'success'
        )
        showTodo()
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
                    type: "success"
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
        Swal.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
        )
        showTodo()
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
    $("#loginForm").hide()
    $("#regisForm").hide()
    showTodo()
}

function rejectUser(){
    $('#navbar').hide()
    $('#todolist').hide()
    $('#modalCreate').hide()
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
                    title: "Success Login!"
                })
                //console.log(resp.token);
                localStorage.setItem('token', resp.token)
                $("#loginForm").hide()
                $("#navbar").show()
                $('#todolist').show()
                showTodo()
                $('#modalCreate').show()
                    
            })
            .fail(textStatus => {
               // console.log(textStatus)
                swal.fire({
                type: "error",
                title: "Email/Password Wrong"
                })
            })
    } else {
        swal.fire({
            type: "error",
            title: "Email/Password cannot be empty"
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
                    title: "Success Register, Please Login"
                })
                $('#regisform').hide()
                $('#loginform').show()

                })
            .fail(status => {
                //console.log(status)
                swal.fire({
                    type: "error",
                    title: "Email Already Used"
                })
                $('#regisform').show()
            })
    } else {
        swal.fire({
            type: "error",
            title: "Email/Password cannot be empty"
        })
        $('#regisform').show()
    }
}

function afterRegis(event) { 
    event.preventDefault();
    $("#loginForm").hide()
    $("#regisForm").show()
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
                Swal.fire(
                    "You're logging out..!!",
                        'success'
                )
                $('#navbar').hide()
                $('#todolist').hide()
                $('#modalCreate').hide()
                // $('#loginform').show()
                window.location.href = 'http://localhost:5500/client'
            }else{
                Swal.fire(
                    "Yes, make a todo's again",
                        'Aye aye succes'
            )
        }            
                    
    });
}


function submitAdd() {
    event.preventDefault()
    let title = $('#title').val()
    let status = $(`#status`).val()
    let description = $('#description').val()
    let due_date = $('#duedate').val()

        
    if (title != '' && description != '' && due_date != '') {
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
                    due_date
                    }
                })
        .done(resp => {
            $('#addTodoModal').modal('hide')
            swal.fire({
                type: "success",
                title: "Todo List has Been Created"
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
                title: "todo is changing"
            })
            showTodo()
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

function checkLoginState() {               
    FB.getLoginStatus(function(response) {  
        statusChangeCallback(response);
    });
}

//percobaan append mash bad request
function getHero(event){
    $.ajax({
        method : "GET",
        url : `${baseUrl}/hero`,
        headers :{
            token : localStorage.getItem('token')
        }
    })
    .done(respond => {
        console.log(respond);
        $('#hero').html(respond.data)
    })
    .fail(err =>{
        console.log(err);
    })
}
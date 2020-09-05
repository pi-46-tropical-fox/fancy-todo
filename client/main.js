function menuLogin(event){
    $("#form_registration").hide()
    $("#form_login").show()
    $("#todoList").hide()
    $("#addTodo").hide()
}
function menuRegister(event){
    $("#form_registration").show()
    $("#form_login").hide()
    $("#todoList").hide()
    $("#addTodo").hide()
}
function menuList(event){
    $("#form_registration").hide()
    $("#form_login").hide()
    $("#todoList").show()
    $("#addTodo").hide()
    $("#card_resto").hide()
    $(`div#editTodo`).hide()

    $('#listTodo').empty()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers:{
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((result)=>{
        result.forEach(el=>{
            // console.log(el)
            if(el.status === false){
                el.status = 'Pending'
            }else{
                el.status = 'Complete'
            }
            $('#listTodo').append(`
            <tr>
                <th scope="row">${el.userFullName}</th>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.due_date.toString().substring(0,10)}</td>
                <td>
                    <button type="submit" class="btn btn-primary" id="editTodo${el.id}">EDIT</button>
                    <button type="submit" class="btn btn-primary" class="test" id="delTodo${el.id}" value="${el.id}">DEL</button>
                </td>
            </tr>
            `)
            $(`#delTodo${el.id}`).click(function(event){
            
                let id = $(`#delTodo${el.id}`).val()
                console.log('masuk delTodo ', id)
                $.ajax({
                    method: 'DELETE',
                    url: `http://localhost:3000/todos/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .done(reponse =>{
                    menuList()
                })
                .fail(err =>{
                    console.log(err)
                })
            })
            $(`#editTodo${el.id}`).click(function(event){
                $("#form_registration").hide()
                $("#form_login").hide()
                $("#todoList").hide()
                $("#addTodo").hide()
                $("#card_resto").hide()
                $(`div#editTodo`).show()

                let id = $(`#delTodo${el.id}`).val()
                console.log('edit ', id)
                $.ajax({
                    method: 'GET',
                    url: `http://localhost:3000/todos/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .done(result=>{
                    console.log(result)
                })
                .fail(err=>{
                    console.log(err)
                })
            })
        })   
        
    })
    .fail((err)=>{
        console.log(err)
    })
}
function menuAdd(event){
    $("#form_registration").hide()
    $("#form_login").hide()
    $("#todoList").hide()
    $("#addTodo").show()
    $("#card_resto").hide()
}
function menuLogout(event){
    localStorage.clear()
    signOut()
    beforeLogin()
}
function beforeLogin(){
    $("#form_registration").hide()
    $("#form_login").show()
    $("#todoList").hide()
    $("#addTodo").hide()
    $("#nav_todoList").hide()
    $("#nav_addTodo").hide()
    $("#nav_login").show()
    $("#nav_register").show()
    $("#nav_logout").hide()
    $("#nav_resto").hide()
    $("#card_resto").hide()
}
function afterLogin(){
    $("#form_registration").hide()
    $("#form_login").hide()
    $("#todoList").show()
    $("#addTodo").hide()
    $("#nav_todoList").show()
    $("#nav_addTodo").show()
    $("#nav_login").hide()
    $("#nav_register").hide()
    $("#nav_logout").show()
    $("#nav_resto").show()
    $("#card_resto").hide()

    menuList()
}
function login(event){
    event.preventDefault()
    const email = $('#emailLogin').val()
    const password = $('#passwordLogin').val()
    
    // console.log(email, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data:{
            email,
            password
        }
    })
    .done((response)=>{
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
        localStorage.setItem('access_token', response.token)
        afterLogin()
    })
    .fail((err)=>{
        console.log(err)
    })
}
function register(event){
    event.preventDefault()
    const firstname = $('#inputFirstName3').val()
    const lastname = $('#inputLastName3').val()
    // const username = $('#inputUsername3').val()
    const email = $('#inputEmail3').val()
    const password = $('#inputPassword3').val()
    
    // console.log(username, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data:{
            firstname,
            lastname,
            email,
            password
        }
    })
    .done((response)=>{
        $('#inputFirstName3').val('')
        $('#inputLastName3').val('')
        // $('#inputUsername3').val('')
        $('#inputEmail3').val('')
        $('#inputPassword3').val('')
        beforeLogin()
    })
    .fail((err)=>{
        console.log(err)
    })
}
function addTodo(event){
    event.preventDefault()
    const title = $('#title').val()
    const description = $('#description').val()
    const status = $('#status').val()
    const due_date = $('#due_date').val()
    
    console.log(title, description, status, due_date)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data:{
            title,
            description,
            status,
            due_date
        },
        headers:{
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response)=>{
        $('#title').val('')
        $('#description').val('')
        $('#status').val('')
        $('#due_date').val('')
        menuList()
    })
    .fail((err)=>{
        console.log(err)
    })
}
function cardResto(event){
    $("#form_registration").hide()
    $("#form_login").hide()
    $("#todoList").hide()
    $("#addTodo").hide()
    $("#card_resto").show()

    $("#card_resto").empty()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/resto-recomendation',
        headers:{
            access_token: localStorage.getItem('access_token'),
            user_key: '3ffbb3ec57bb107655c060b06928d45f'
        }
    })
    .done((result)=>{
        console.log(result)
        result.forEach(el=>{
            console.log(el.collection)

            $("#card_resto").append(`
            <div class="card" style="width: 18rem; height: 20px; margin: 30px; display: inline-block;">
                <img src="${el.collection.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${el.collection.title}</h5>
                    <p class="card-text">${el.collection.description}</p>
                    <a href="${el.collection.share_url}" target="blank" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `)
        })
    })
    .fail((err)=>{
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/googleLogin',
        headers: {google_access_token}
    })
    .done(response =>{
        // console.log(response)
        localStorage.setItem('access_token', response.access_token)
        afterLogin()
    })
    .fail(err=>{
        console.log(err)
    })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        afterLogin()
    }else{
        beforeLogin()
    }

    $('#nav_login').click(menuLogin)
    $('#nav_register').click(menuRegister)
    $('#registerclick').click(menuRegister)
    $('#nav_todoList').click(menuList)
    $('#nav_addTodo').click(menuAdd)
    $('#nav_logout').click(menuLogout)
    $('#dataLogin').submit(login)
    $('#dataRegister').submit(register)
    $('#dataAddTodo').submit(addTodo)
    $('#nav_resto').click(cardResto)

    })
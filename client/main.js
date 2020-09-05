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
                    <button type="submit" class="btn btn-primary">EDIT</button>
                    <a href=#><button type="submit" class="btn btn-primary" id="delTodo" value="${el.id}">DEL</button></a>
                </td>
            </tr>
            `)
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

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
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

    const email = $('#inputEmail3').val()
    const password = $('#inputPassword3').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data:{
            email,
            password
        }
    })
    .done((response)=>{
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

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000//loginGoogle',
        headers: {google_access_token}
    })
    .done(response =>{
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
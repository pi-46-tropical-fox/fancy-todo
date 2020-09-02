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
                    <button type="submit" class="btn btn-primary">EDIT</button>
                    <a href=#><button type="submit" class="btn btn-primary" id="delTodo" value="${el.id}">DEL</button></a>
                </td>
            </tr>
            `)
        })
        // console.log(result)
        
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
}
function menuLogout(event){
    beforeLogin()
    localStorage.clear()
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
    const username = $('#usernameLogin').val()
    const password = $('#passwordLogin').val()
    
    // console.log(username, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data:{
            username,
            password
        }
    })
    .done((response)=>{
        $('#usernameLogin').val('')
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
    const username = $('#inputUsername3').val()
    const email = $('#inputEmail3').val()
    const password = $('#inputPassword3').val()
    
    // console.log(username, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data:{
            firstname,
            lastname,
            username,
            email,
            password
        }
    })
    .done((response)=>{
        $('#inputFirstName3').val('')
        $('#inputLastName3').val('')
        $('#inputUsername3').val('')
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


$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        afterLogin()
    }else{
        beforeLogin()
    }

    $('#nav_login').click(menuLogin)
    $('#nav_register').click(menuRegister)
    $('#nav_todoList').click(menuList)
    $('#nav_addTodo').click(menuAdd)
    $('#nav_logout').click(menuLogout)
    $('#dataLogin').submit(login)
    $('#dataRegister').submit(register)
    $('#dataAddTodo').submit(addTodo)
    $('#nav_resto').click(cardResto)

})
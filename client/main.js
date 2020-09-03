function showLogin(event) {
    $('#registerForm').hide()
    $('#loginForm').show()
    $('#todolist').hide()
    $('#addForm').hide()
    $('#editForm').hide()
}

function showRegister(event) {
    $('#registerForm').show()
    $('#loginForm').hide()
    $('#todolist').hide()
    $('#addForm').hide()
    $('#editForm').hide()
}

function showTodo(event) {
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#todolist').show()
    $('#addForm').hide()
    $('#editForm').hide()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todo',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        // data: {email,password}
    })
    .done(res => {
        console.log(res);
        res.forEach(todo => {
            $('#todoTable').append(`
            <tr>
                <td>${todo.title}</th>
                <td>${todo.description}</td>
                <td>${todo.status}</td>
                <td>${todo.due_date}</td>
                <td><a href="/edit/${todo.id}" class="text-center">Edit</a></td>
                <td><a href="/delete/${todo.id}" class="text-center">Delete</a></td>
            </tr>
            `)
        })
    })
    .fail(err => console.log(err))
}

function showAdd(event) {
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#todolist').hide()
    $('#addForm').show()
    $('#editForm').hide()
}

function showEdit(event) {
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#todolist').hide()
    $('#addForm').hide()
    $('#editForm').show()
}

function logout(event) {
    $('#registerForm').hide()
    $('#loginForm').show()
    $('#todolist').hide()
    $('#addForm').hide()
    $('#editForm').hide()

    beforeLogin()
    localStorage.clear()
    signOut()
    // localStorage.removeItem('access_token')
}

function initContent(event) {
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#todolist').hide()
    $('#addForm').hide()
    $('#editForm').hide()
}

function beforeLogin(event) {
    $('#nav-todo').hide()
    $('#nav-add').hide()
    $('#nav-logout').hide()
    $('#nav-login').show()
    $('#nav-register').show()
}

function afterLogin(event) {
    $('#nav-todo').show()
    $('#nav-add').show()
    $('#nav-logout').show()
    $('#nav-login').hide()
    $('#nav-register').hide()
}

function loginForm(event) {
    event.preventDefault()
    const email = $('#InputEmail').val()
    const password = $('#InputPassword').val()
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {email,password}
    })
    .done(res => {
        console.log(res)
        $('#InputEmail').val('')
        $('#InputPassword').val('')
        localStorage.setItem('access_token', res.accessToken)
        afterLogin()
        showTodo()
    })
    .fail(err => console.log(err))
}

function registerForm(event) {
    event.preventDefault()
    const email = $('#registerEmail').val()
    const password = $('#registerPassword').val()
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {email,password}
    })
    .done(res => {
        console.log(res)
        $('#registerEmail').val('')
        $('#registerPassword').val('')
        $('#registerForm').hide()
        $('#loginForm').show()
    })
    .fail(err => console.log(err))
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googlelogin',
        headers: {google_access_token}
    })
    .done(res => {
        console.log(res)
        localStorage.setItem('access_token',res.accessToken)
        afterLogin()
        showTodo()
    })
    .fail(err => console.log(err))
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

$(document).ready(function(){
    if (localStorage.getItem('access_token')) {
        afterLogin()
    } else {
        beforeLogin()
    }

    initContent()

    $('#nav-login').click(showLogin)
    $('#nav-register').click(showRegister)
    $('#nav-todo').click(showTodo)
    $('#nav-add').click(showAdd)
    $('#nav-logout').click(logout)

    $('#loginForm').submit(loginForm)
    $('#registerForm').submit(registerForm)


})
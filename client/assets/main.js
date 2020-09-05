function menuRegister(event) {
    $('#box-register').show()
    $('#box-login').hide()
    $('#box-dashboard').hide()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').hide()
}
function menuLogin(event) {
    $('#box-register').hide()
    $('#box-login').show()
    $('#box-dashboard').hide()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').hide()
}
function menuHome(event) {
    $('#box-register').hide()
    $('#box-login').hide()
    $('#box-dashboard').show()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').hide()
    $('#todos').empty('')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response) => {
        let i=1
        response.forEach((el) => {
            $('#todos').append(`
            <tr>
                <td>${i}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.due_date}</td>
                <td>
                    <a id="update-link" value="${el.id}" href="#">Update</a>
                    <a id="delete-link" href="#">Delete</a>
                </td>
            </tr>${i++}
                `)
        })
    })
    .fail((err)=> {
        console.log(err)
    })
}
function menuMovie(event) {
    $('#box-register').hide()
    $('#box-login').hide()
    $('#box-dashboard').hide()
    $('#box-movie').show()
    $('#box-create').hide()
    $('#box-update').hide()
    $('#movies').empty('')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response) => {
        console.log(response)
        let i=1
        response.forEach(el=> {
            $('#movies').append(`
            <tr>
                <td>${i}</td>
                <td>${el.title}</td>
                <td>${el.year}</td>
                <td>${el.length}</td>
                <td>${el.rating}</td>
            </tr>${i++}
            `)
        })
    })
    .fail((err)=> {
        console.log(err)
    })
}
function createTodoForm(event) {
    $('#box-register').hide()
    $('#box-login').hide()
    $('#box-dashboard').hide()
    $('#box-movie').hide()
    $('#box-create').show()
    $('#box-update').hide()
}
function updateTodoForm(event) {
    $('#box-register').hide()
    $('#box-login').hide()
    $('#box-dashboard').hide()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').show()
}
function loginForm(even) {
    event.preventDefault();
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
    .done((response)=>{
        localStorage.setItem('access_token', response.access_token)
        $('#login-email').val('')
        $('#login-password').val('')
        afterLogin()
    })
    .fail((err)=>{
        $('#login-err').text(err.responseJSON.errors)
    })
}
function registerForm(even) {
    event.preventDefault();
    const username = $('#register-username').val()
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            username,
            email,
            password
        }
    })
    .done((response)=>{
        $('#register-username').val('')
        $('#register-email').val('')
        $('#register-password').val('')
        beforeLogin()
    })
    .fail((err)=>{
        $('#register-err').text(err.responseJSON.errors)
    })
}
function createTodoButton(){
    event.preventDefault();
    const title = $('#todo-create-title').val()
    const description = $('#todo-create-description').val()
    const due_date = $('#todo-create-due_date').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done((response) => {
        $('#todo-create-title').val('')
        $('#todo-create-description').val('')
        $('#todo-create-due_date').val('')
        menuHome()
    })
    .fail((err)=>{
        console.log(err);
        $('#create-err').text(err.responseJSON.errors)
    })
}
function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googlelogin',
        headers: {google_access_token}
    })
    .done ((response) => {
        localStorage.setItem('access_token', response.access_token)
        afterLogin()
    })
    .fail((err) => {
        console.log(err)
    })
}
function beforeLogin() {
    $('#box-register').hide()
    $('#box-login').show()
    $('#box-dashboard').hide()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').hide()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-home').hide()
    $('#nav-movie').hide()
    $('#nav-create-todo').hide()
    $('#nav-logout').hide()
}
function afterLogin() {
    $('#box-register').hide()
    $('#box-login').hide()
    $('#box-dashboard').show()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').hide()
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-home').show()
    $('#nav-movie').show()
    $('#nav-create-todo').show()
    $('#nav-logout').show()
    menuHome()
}
function menuLogout() {
    beforeLogin()
    localStorage.clear();
    localStorage.removeItem('access_token');
    signOut();
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

$(document).ready(()=>{
    if(localStorage.getItem('access_token')) {
        afterLogin();
    } else {
        beforeLogin();
    }
    $('#nav-register').click(menuRegister)
    $('#nav-login').click(menuLogin)
    $('#nav-home').click(menuHome)
    $('#nav-movie').click(menuMovie)
    $('#nav-logout').click(menuLogout)
    $('#nav-create-todo').click(createTodoForm)
    $('#update-link').click(updateTodoForm)

    $('#button-update').click((event)=> {
        $('#box-register').hide()
        $('#box-login').hide()
        $('#box-dashboard').show()
        $('#box-create').hide()
        $('#box-update').hide()
    })
    $('#button-create').click((event)=> {
        $('#box-register').hide()
        $('#box-login').hide()
        $('#box-dashboard').show()
        $('#box-create').hide()
        $('#box-update').hide()
    })
    
    $('#form-login').submit(loginForm)
    $('#form-register').submit(registerForm)
    $('#form-create-todo').submit(createTodoButton)
    // $('#update-link').click(updateTodoButton)
})
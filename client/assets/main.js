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
                <td id="get-title" value="${el.title}">${el.title}</td>
                <td id="get-description" value="${el.description}">${el.description}</td>
                <td id="get-status">${el.status}</td>
                <td id="get-due_date">${el.due_date}</td>
                <td>
                    <a id="update-link" onclick="getId(${el.id})" href="#">Update</a>
                    <a id="delete-link" onclick="deleteTodo(${el.id})" href="#">Delete</a>
                </td>
            </tr>${i++}
            `)
        })
    })
    .fail((err)=> {
        console.log(err)
    })
}
function getId(id, event) {
    $('#box-register').hide()
    $('#box-login').hide()
    $('#box-dashboard').hide()
    $('#box-movie').hide()
    $('#box-create').hide()
    $('#box-update').show()
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-home').hide()
    $('#nav-movie').hide()
    $('#nav-create-todo').hide()
    $('#nav-logout').hide()
    $('#update').empty('')
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response)=>{
        // console.log(response)
        $('#update').append(`
        <form id="update-form">
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input  id="todo-update-title"class="input" type="text" name="title" value="${response.title}">
            </div>
        </div>
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea  id="todo-update-description"class="textarea" name="description" value="${response.description}">${response.description}</textarea>
            </div>
        </div>

        <div class="field">
            <label class="label">Status</label>
            <div class="select">
              <select id="todo-update-status" selected="${response.status}">
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
        </div>
        <div class="field">
            <label class="label">Due Date</label>
            <div class="control">
                <input  id="todo-update-due_date"class="input" type="date" name="due_date" placeholder="Coding" value="${new Date(response.due_date).toISOString().split('T')[0]}">
            </div>
        </div>
        <button id="button-update" class="button is-info update-todo" onclick="update(${id})">Update</button>
    </form>
    `)
    })
    .fail((err)=>{
        console.log(err)
    })
}
function update(id) {
    const title = $('#todo-update-title').val()
    const description = $('#todo-update-description').val()
    const status = $('#todo-update-status').val()
    const due_date = $('#todo-update-due_date').val()
    
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(response => {
            afterLogin()
        })
        .fail(err => {console.log(err)})
}
function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        menuHome()
        afterLogin()
    })
    .fail(err => {
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
function loginForm(event) {
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
function registerForm(event) {
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
function createTodoButton(event){
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
    $('#todos').empty('')
    menuHome()
}
function menuLogout() {
    beforeLogin()
    localStorage.clear();
    localStorage.removeItem('access_token');
    $('#todos').empty('')
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
function beforeLogin(event) {
    $('#login-page').show();
    $('#register-page').hide();
    $('#navbar-logout').hide();
    $('#home-page').hide();
    $('#go-to-register').on('click', function(event) {
        $('#login-page').hide();
        $('#register-page').show();
        $('#navbar-logout').hide();
        $('#home-page').hide();
    })
}

function afterRegister(event) {
    $('#login-page').show();
    $('#register-page').hide();
    $('#navbar-logout').hide();
    $('#home-page').hide();
}

function afterLogin(event) {
    $('#login-page').hide();
    $('#register-page').hide();
    $('#navbar-logout').show();
    $('#home-page').show();
}

function addForm(event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data: {
            title: $('#title-add').val(),
            description: $('#description-add').val(),
            due_date: $('#due_date-add').val()
        },
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        event.preventDefault();
        console.log(response);
        todoList();
    })
    .fail((err) => {
        Swal.fire(
            {
                icon: 'error',
                titleText: 'Validation error',
                html: err.responseJSON.errors.join('<br/>')
            }
        );
    })
}


function todoList(event) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

    .done(response => {
        $('.container').empty()
        response.forEach(el => {
            $('.container').append(
                `
                <div class="row">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${el.due_date.split('T')[0]}</h6>
                    <p class="card-text">${el.description}</p>
                    <div class="pencetan">
                    <a href="#" class="card-link" data-id="${el.id}" onClick="getTodo(event)">Edit</a>
                    <a href="#" class="card-link" data-id="${el.id}" onClick="deleteTodo(event)">Delete</a>
                  </div>
                  </div>
                </div>
                </div>
                </div>
                
                `
            )
        });
        
    })

    .fail((err => {
        console.log(err);
    }))

}

function loginForm(event) {
    event.preventDefault();
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
    .done((response) => {
        event.preventDefault();
        $('email-login').val();
        $('password-login').val();
        localStorage.setItem('access_token', response.access_token);
        Swal.fire(
            'Success!',
            'success'
        )
        afterLogin();
    })
    .fail((err) => {
        Swal.fire(
            'Invalid email or password!',
            'please check again',
            'error'
        )
        $('#login-page').show();
    })
}

function registerForm(event) {
    event.preventDefault();
    const email = $('#email-register').val();
    const password = $('#pass-register').val();

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
    .done((response) => {
        event.preventDefault();
        $('email-register').val();
        $('pass-register').val();
        Swal.fire(
            'Success!',
            'success'
        )
        afterRegister();
    })
    .fail((err) => {
        console.log(err);
        Swal.fire(
            {
                icon: 'error',
                titleText: 'Validation error',
                html: err.responseJSON.errors.join('<br/>')
            }
        );
        $('#register-page').show();
    })
}

function getTodo(event){
    event.preventDefault();
    localStorage.setItem('id', event.srcElement.dataset.id)
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response) => {
        console.log(response);
        let date = response.due_date.split('T')[0]
        $('#edit-form').empty()
        $('#edit-form').append(
            `
            <h1>Edit ToDo</h1>
            <hr>
                <label>Title :</label>
                <input type="text"   id="title-edit" value="${response.title}">
                <br>
                <label>Desc :</label>
                <input type="text"  id="description-edit" value="${response.description}">
                <br>
                <label>Due Date :</label>
                <input type="date"  id="due_date-edit" value="${date}">
                <br>
                <button class="btn btn-dark" data-id="${response.id}" onClick="updateTodo(event)" type="submit">Add</button>
            `
        )
    })
    .fail((err) => {
        console.log(err);
    })
} 

function updateTodo(event) {
    event.preventDefault();

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${localStorage.getItem('id')}`,
        data: {
            title: $('#title-edit').val(),
            description: $('#description-edit').val(),
            due_date: $('#due_date-edit').val()
        },
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

    .done((response) => {
        event.preventDefault();
        todoList();
    })
    .fail((err) => {
        Swal.fire(
            {
                icon: 'error',
                titleText: 'Validation error',
                html: err.responseJSON.errors.join('<br/>')
            }
        );
    })
}

function deleteTodo(event) {
    event.preventDefault();
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

    .done((response) => {
        console.log(response);
        todoList();
    })
    .fail((err) => {
        console.log(err);
    })
}

function onSignIn(googleUser) {
    let google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token, '>>>');

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        headers:{
            google_access_token
        }
    })
    .done(response => {
        console.log(response);
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('email_user', response.email)
        $('#email-user').text('welcome' + localStorage.email_user)
        afterLogin();
        todoList();
    })
    .fail(err => {
        console.log(err);
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log(`user signed out`);
    })
}

function weatherpost(){

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/weather',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

    .done(response => {

        $('#post-container').empty();
        console.log(response);
            $('#post-container').append(`
            <div class="card">
            <div class="card-content">
                <div class="content" text-align="center">
                <h5>${response.location.name}</h5>
                <img src="${response.current.weather_icons[0]}">
                <h5>${response.current.temperature} °C</h5>
                </div>
            </div>
        </div>
    </div>
            `)
    })
    .fail(err => {
        console.log(err);
    })
}


function menuLogout(event) {
    event.preventDefault();
    $('#login-page').show();
    $('#register-page').hide();
    beforeLogin();
    signOut()
    localStorage.clear();
}


$(document).ready(function() {
    if (localStorage.getItem('access_token')) {
        afterLogin();
        todoList();
        weatherpost();
    } else {
        beforeLogin();
    }
    $('#add-form').submit(addForm)
    $('#login-page').submit(loginForm);
    $('#register-page').submit(registerForm);
    $('#navbar-logout').click(menuLogout)
    

})
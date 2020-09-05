function loginMenu(event) {
    $('#signin-form').show();
    $('#register-form').hide();

}

function registerMenu(event) {
    $('#signin-form').hide();
    $('#register-form').show();
}

function beforeLogin() {
    $('#nav-signin').show();
    $('#nav-register').show();
    $('#nav-add').hide();
    $('#nav-signout').hide();
    $('#todo-list').hide();
    $('#addForm').hide();

}

function afterRegister() {
    $('#nav-signin').show();
    $('#nav-register').show();
    $('#nav-signout').hide()
    $('#signin-form').hide();
}

function afterLogin() {
    $('#nav-signin').hide();
    $('#nav-register').hide();
    $('#nav-signout').show()
    $('#signin-form').hide();
}

function addForm(event) {
    $('#nav-signout').show();
    $('#nav-signin').hide();
    $('#nav-register').hide();
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
    .done((response) => {
        console.log(response);
    })
    .fail((err) => {
        console.log(err);
    })
}

function todoList() {

    $('#signin-form').hide();
    $('#register-form').hide();
    $('#todo-list').show();
    // $('#add-form').hide();
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

    .done((response) => {
        // console.log(response[0]);
        response.forEach(el => {
            $('#list').append(
                `
                <td scope="row">${el.title}</td>
                <td>${el.description}</td>
                <td>${el.due_date}</td>
                <td>
                <a href="#" data-id="${el.id}" onClick="getTodo(event)">Edit</a>
                <a href="#" data-id="${el.id}" onClick="deleteTodo(event)">Delete</a>
                </td>
                
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
    const email = $('#signInEmail').val()
    const password = $('#signInPassword').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
    .done((response) => {
        $('signInEmail').val();
        $('signInPassword').val();
        localStorage.setItem('access_token', response.access_token);
        afterLogin();
    })
    .fail((err) => {
        Swal.fire(
            'Invalid email or password!',
            'please check again',
            'error'
        )
        $('#signin-form').show();
    })
}

function registerForm(event) {
    event.preventDefault();
    const email = $('#registerEmail').val();
    const password = $('#registerPassword').val();

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
    .done((response) => {
        $('registerEmail').val();
        $('registerPassword').val();
        Swal.fire(
            'Success!',
            'success'
        )
        $('#signin-form').show();
        $('#register-form').hide();
    })
    .fail((err) => {
        console.log(err);
    })
}

function getTodo(event){
    event.preventDefault();
    $('#addForm').hide();
    
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response) => {
        console.log(response);
        localStorage.setItem('id', response.id)
        let date = response.due_date.split('T')[0]
        $('#tampungEdit').append(
            `
            <form id="edit-form">
      <div class="form-group">
        <label for="title-edit">Title</label>
        <input type="text" class="form-control" id="title-edit" value="${response.title}">
      </div>
      <div class="form-group">
        <label for="description-edit">Description</label>
        <input type="text" class="form-control" id="description-edit" value="${response.description}">
      </div>
      <div class="form-group">
        <label for="due_date-edit">Due Date</label>
        <input type="date" class="form-control" id="due_date-edit" value="${date}">
      </div>
      <button type="submit" class="btn btn-primary" id="editSubmit" onClick="updateTodo(event)">Submit</button>
    </form>
            `
        )
    })
    .fail((err) => {
        console.log(err);
    })
} 

function updateTodo(event) {
    event.preventDefault();
    console.log(event.srcElement.dataset.id);
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${localStorage.getItem(`id`)}`,
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
        console.log(err);
    })
}

function deleteTodo(event) {
    console.log(event.srcElement.dataset.id);
    // const todoId = event.target.id
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

    .done((response) => {
        console.log(response);
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



function menuLogout(event) {
    event.preventDefault();
    $('#signin-form').show();
    $('#register-form').hide();
    beforeLogin();
    signOut()
    localStorage.clear();
}


$(document).ready(function() {
    if (localStorage.getItem('access_token')) {
        afterLogin();
        todoList();
    } else {
        afterRegister();
        beforeLogin();
        loginMenu();
    }
    $('#nav-signin').click(loginMenu);
    $('#nav-register').click(registerMenu);
    $('#signin-form').submit(loginForm);
    $('#register-form').submit(registerForm);
    $('#add-form').submit(addForm)
    $('#nav-signout').click(menuLogout)

})
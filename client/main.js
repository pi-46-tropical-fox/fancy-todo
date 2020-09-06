function formLogin(event) {
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#todoList').hide()
    $('#addForm').hide()
    $('#editForm').hide()
}

function formRegister(event) {
    $('#loginForm').hide()
    $('#registerForm').show()
    $('#todoList').hide()
    $('#addForm').hide()
    $('#editForm').hide()
}

function todoList(event) {
    $('#loginForm').hide()
    $('#registerForm').hide()
    $('#todoList').show()
    $('#addForm').hide()
    $('#editForm').hide()
    $('#tableTodo').empty()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((res) => {
        console.log(res);
        res.forEach((element, i) => {
            $('#tableTodo').append(`
            <tr>
                <td>${i + 1}</td>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.status}</td>
                <td>${element.due_date}</td>
                <td>
                    <button type="button" onclick="editTodoForm(${element.id})" class="btn btn-success btn-sm">Edit</button>
                    <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
            `)
        });
    })
    .fail((err) => {
        console.log(err);
    })
}

function addTodoForm(event) {
    $('#loginForm').hide()
    $('#registerForm').hide()
    $('#todoList').hide()
    $('#addForm').show()
    $('#editForm').hide()
}

function addTodoList(event) {
    event.preventDefault()
    const title = $('#inputTitle').val()
    const description = $('#inputDesc').val()
    const due_date = $('#inputDate').val()

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
    .done((res) => {
        $('#inputTitle').val('')
        $('#inputDesc').val('')
        $('#inputDate').val('')
        todoList()
    })
    .fail((err) => {
        console.log(err);
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(res => {
        console.log(res)
        todoList()
    })
    .fail(err => {
        console.log(err)
    })
}

function menuLogout(event) {
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#todoList').hide()
    $('#addForm').hide()
    $('#editForm').hide()
    localStorage.clear()
    signOut()
    beforeLogin()
}

function initContent(event) {
    $('#loginForm').hide()
    $('#registerForm').hide()
    $('#todoList').hide()
    $('#addForm').hide()
    $('#editForm').hide()
}

function beforeLogin(event) {
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-todo').show()
    $('#nav-add').hide()
    $('#nav-logout').hide()
}

function afterLogin(event) {
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-todo').hide()
    $('#nav-add').show()
    $('#nav-logout').show()
}

function loginForm(event) {
    event.preventDefault()
    const email = $('#emailLogin').val()
    const password = $('#passwordLogin').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
    .done((res) => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
        localStorage.setItem('access_token', res.access_token)
        todoList()
        afterLogin()
    })
    .fail((err) => {
        console.log(err);
    })
}

function registerForm(event) {
    event.preventDefault()
    const username = $('#usernameRegister').val()
    const email = $('#emailRegister').val()
    const password = $('#passwordRegister').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            username,
            email,
            password
        }
    })
    .done((res) => {
        console.log(res);
        $('#usernameRegister').val('')
        $('#emailRegister').val('')
        $('#passwordRegister').val('')
        formLogin()
    })
    .fail((err) => {
        console.log(err);
    })
}

function onSignIn(googleUser) {
    //google signin
    var google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/google-login',
        headers: {
            google_access_token
        }
    })
    .done((res) => {
        console.log(res, '<<< response')
        localStorage.setItem('access_token', res.access_token)
        todoList()
        afterLogin()
    })
    .fail((err) => {
        console.log(err)
    })
}

function signOut() {
    //google signout
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


$(document).ready(function() {
    initContent()

    if (localStorage.getItem('access_token')) {
        afterLogin()
        todoList()
    } else {
        beforeLogin()
        formLogin()
    }

    $('#nav-login').click(formLogin)
    $('#nav-register').click(formRegister)
    $('#nav-todo').click(todoList)
    $('#nav-add').click(addTodoForm)
    $('#nav-logout').click(menuLogout)

    $('#loginForm').submit(loginForm)
    $('#registerForm').submit(registerForm)
    $('#addForm').submit(addTodoList)
    
    editTodoForm = (id) => {
        $('#loginForm').hide()
        $('#registerForm').hide()
        $('#todoList').hide()
        $('#addForm').hide()
        $('#editForm').show()
    
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done((res) => {
            let dataEdit = `
            <div class="form-group">
                <label for="editTitle" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="editTitle" value"${res.title}">
                </div>
            </div>
            <div class="form-group">
                <label for="editDesc" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="editDesc" value"${res.description}">
                </div>
            </div>
            <div class="form-group">
                <label for="editStatus" class="col-sm-2 col-form-label">Status</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="editStatus" value"${res.status}">
                </div>
            </div>
            <div class="form-group">
                <label for="editDate" class="col-sm-2 col-form-label">Due_date</label>
                <div class="col-sm-10">
                <input type="date" class="form-control" id="editDate" value"${res.due_date}">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Edit Todo</button>
            `
            $('#editForm').append(dataEdit)
    
            $('#editForm').submit(event => {
                event.preventDefault()
                const title = $('#editTitle').val()
                const description = $('#editDesc').val()
                const due_date = $('#editDate').val()
                const status = $('#editStatus').val()
            
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
                .done((res) => {
                    console.log(res);
                    todoList()
                })
                .fail((err) => {
                    console.log(err);
                })
            })
        })
        .fail((err) => {
            console.log(err);
        })
    }
})
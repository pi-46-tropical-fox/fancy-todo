function initial(event) {
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-dashboard').hide()
    $('#nav-myTask').hide()
    $('#nav-addTask').hide()
    $('#nav-logout').hide()

    $('#form-login').hide()
    $('#form-register').hide()
    $('#dashboard').hide()
    $('#myTask').hide()
    $('#form-addTask').hide()
    $('#form-editTask').hide()
}

function navbarAfterLogin(event) {
    $('#nav-dashboard').show()
    $('#nav-myTask').show()
    $('#nav-addTask').show()
    $('#nav-logout').show()
}

function menuRegister(event) {
    initial()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#form-register').show()
}

function menuLogin(event) {
    initial()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#form-login').show()
}

function submitRegister(event) {
    event.preventDefault()
    const email = $('#registerEmail').val()
    const password = $('#registerPassword').val()
    const name = $('#registerName').val()
    console.log(email, password, name)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password,
            name
        }
    })
    .done((response) => {
        $('#registerEmail').val('')
        $('#registerPassword').val('')
        $('#registerName').val('')
        console.log(response)
        menuLogin()
    })
    .fail((err) => {
        console.log(err)
    })

}

function submitLogin(event) {
    event.preventDefault()
    const email = $('#loginEmail').val()
    const password = $('#loginPassword').val()
    console.log(email, password)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
    .done((response) => {
        $('#loginEmail').val('')
        $('#loginPassword').val('')
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        menuTodo()
        // menuRegister()
    })
    .fail((err) => {
        console.log(err)
    })

}

function menuLogout(event) {
    localStorage.clear()
    signOut()
    menuLogin()
}

function menuTodo(event) {
    initial()
    navbarAfterLogin()
    $('#dashboard').show()

    const access_token =localStorage.getItem('access_token')

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token
        }
    })
    .done((response) => {
        console.log(response)
        $('#dashboardBody').empty()
        let counter = 1
        response.forEach(element => {
            let status = 'On Progress'
            if (element.status) {status = 'Completed'}
            
            $('#dashboardBody').append(`
                <tr>
                    <td>${counter++}</td>
                    <td>${element.title}</td>
                    <td>${element.description}</td>
                    <td>${status}</td>
                    <td>${element.due_date}</td>
                    <td>${element.User.name}</td>
                    <td>
                        <a href="#" data-id="${element.id}" onclick="deleteFunction(event)">Delete</a> | <a href="#" data-id="${element.id}" onclick="menuEditTask(event)">Edit</a>
                    </td>
                </tr>
            `)
        });
    })
    .fail((err) => {
        console.log(err)
    })
}

function menuAddTask(event) {
    initial()
    navbarAfterLogin()
    $('#form-addTask').show()
}

function submitAddTask(event) {
    event.preventDefault()
    const title = $('#addTitle').val()
    const description = $('#addDescription').val()
    const due_date = $('#addDue_date').val()
    console.log(title, description, due_date)

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
        $('#addTitle').val()
        $('#addDescription').val()
        $('#addDueDate').val()
        console.log(response)
        menuTodo()
    })
    .fail((err) => {
        console.log(err)
    })
}

function deleteFunction(event) {
    console.log(event.srcElement.dataset.id)
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        menuTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function menuEditTask(event) {
    console.log(event.srcElement.dataset.id)
    localStorage.setItem('todoId', event.srcElement.dataset.id)
    
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        console.log(data, '<<<< ini data')
        initial()
        navbarAfterLogin()
        $('#form-editTask').empty()

        $('#form-editTask').append(`
            <h2>Update Task</h2>
            <div class="form-row">
            <div class="form-group col-md-6">
                <label for="editTitle">Task</label>
                <input type="text" class="form-control" id="editTitle" value="${data.title}">
            </div>
            <div class="form-group col-md-6">
                <label for="editDue_date">Due Date</label>
                <input type="date" class="form-control" id="editDue_date" value="${data.due_date}">
            </div>
            </div>
            <div class="form-group">
                <label for="editDescription">Description</label>
                <textarea class="form-control" id="editDescription" rows="3">${data.description}</textarea>
            </div>
            <div class="form-row">
            <div class="form-group col-md-6">
                <label for="editStatus">Status</label>
                <select id="editStatus" class="form-control">
                <option value="false">On Progress</option>
                <option value="true">Completed</option>
                </select>
            </div>
            </div>
            <div class="form-row">
            <div class="form-group col-md-6">
                <label for="editUserId">PIC</label>
                <select id="editUserId" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
                </select>
            </div>
            </div>
            <button type="submit" class="btn btn-primary">Update Task</button>
        `)
        $('#form-editTask').show()
    })
    .fail(err => {
        console.log(err)
    })
}

function submitEditTask(event) {
    // console.log(event.srcElement.dataset.id)

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${localStorage.getItem('todoId')}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title: $('#editTitle').val(),
            description: $('#editDescription').val(),
            status: $('#editStatus').val(),
            due_date: $('#editDue_date').val(),
        }
    })
    .done(response => {
        console.log(response)
        menuTodo()
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    //google signin
    var google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        headers: {
            google_access_token
        }
    })
    .done((response) => {
        console.log('response >>', response, '<<< response')
        localStorage.setItem('access_token', response.token)
        menuTodo()
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
    menuLogin()
    
    $('#nav-login').click(menuLogin)
    $('#nav-register').click(menuRegister)
    $('#nav-logout').click(menuLogout)

    $('#form-login').submit(submitLogin)
    $('#form-register').submit(submitRegister)

    $('#nav-dashboard').click(menuTodo)

    $('#nav-addTask').click(menuAddTask)
    $('#form-addTask').submit(submitAddTask)

    $('#nav-editTask').click(menuEditTask)
    $('#form-editTask').submit(submitEditTask)
    
    
})
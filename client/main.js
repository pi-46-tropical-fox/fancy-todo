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
    getWeather()

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
        
        $('#todoTable').empty()
        res.forEach(todo => {
            $('#todoTable').append(`
            <tr>
                <td>${todo.title}</th>
                <td>${todo.description}</td>
                <td>${todo.status}</td>
                <td>${todo.due_date}</td>
                <td><a href="#" data-id="${todo.id}" onclick="showEdit(event)">Edit</a></td>
                <td><a href="#" data-id="${todo.id}" onclick="deleteTodo(event)">Delete</a></td>
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


    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todo/${event.srcElement.dataset.id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        // data: {email,password}
    })
    .done(res => {
        let date = res.due_date.split('T')[0]
        $('#EditTitle').val(res.title)
        $('#EditDesc').val(res.description)
        $('#EditStatus').val(res.status)
        $('#EditDate').val(date)
        $('#EditId').val(res.id)
    })
    .fail(err => console.log(err))
    
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

function addForm(event) {
    event.preventDefault()
    const title = $('#InputTitle').val()
    const description = $('#InputDesc').val()
    const status = $('#InputStatus').val()
    const due_date = $('#InputDate').val()
    console.log(title,description,status,due_date);
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todo',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {title,description,status,due_date}
    })
    .done(res => {
        console.log(res)
        $('#InputTitle').val('')
        $('#InputDesc').val('')
        $('#InputStatus').val('')
        $('#InputDate').val('')
        showTodo()
    })
    .fail(err => console.log(err))
}

function editForm(event) {
    console.log('send edit');
    event.preventDefault()
    const title = $('#EditTitle').val()
    const description = $('#EditDesc').val()
    const status = $('#EditStatus').val()
    const due_date = $('#EditDate').val()
    const user_id = $('#EditId').val()
    console.log(title,description,status,due_date,user_id);
    
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todo/${user_id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {title,description,status,due_date}
    })
    .done(res => {
        console.log(res)
        $('#EditTitle').val('')
        $('#EditDesc').val('')
        $('#EditStatus').val('')
        $('#EditDate').val('')
        showTodo()
    })
    .fail(err => console.log(err))
}

function deleteTodo(event) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todo/${event.srcElement.dataset.id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        // data: {email,password}
    })
    .done(res => {
        showTodo()
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

function getWeather(event) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/weather`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        // data: {email,password}
    })
    .done(res => {
        console.log(res.current);
        // $("#weather-image").attr("src",res.current.weather_icons[0]);
        $('#weather-temp').html(res.current.temperature + `&#8451;`)
        $('#weather-desc').text(res.current.weather_descriptions)
        $('#weather-location').text(res.location.name)
        $('#weather-pressure').text('Air Pressure: '+res.current.pressure)
    })
    .fail(err => console.log(err))
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
    $('#addForm').submit(addForm)
    $('#editForm').submit(editForm)
    $('#editForm').submit(editForm)

})
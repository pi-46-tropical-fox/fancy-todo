
function initContent() {
    $('#form-login').show()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#form-edit-todo').hide()
    $('#list-todo').hide()
    $('#navbar-add').hide()
    $('#navbar-logout').hide()
}

function navRegister(event) {
    $('#form-login').hide()
    $('#form-register').show()
    $('#form-add-todo').hide()
    $('#form-edit-todo').hide()
    $('#list-todo').hide()
    $('#navbar-add').hide()
    $('#navbar-logout').hide()
}

function beforeLogin() {
    $('#form-login').show()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#form-edit-todo').hide()
    $('#list-todo').hide()
    $('#navbar-add').hide()
    $('#navbar-logout').hide()
}

function afterLogin() {
    $('#navbar-add').show()
    $('#navbar-logout').show()
    $('#navbar-login').hide()
    $('#navbar-register').hide()
    $('#form-login').hide()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#form-edit-todo').hide()
    $('#editTodo').show()
    $('#list-todo').show()
    todoList()
    weather()
}

function navbarAdd() {
    $('#navbar-add').hide()
    $('#navbar-logout').show()
    $('#navbar-login').hide()
    $('#navbar-register').hide()
    $('#form-login').hide()
    $('#form-register').hide()
    $('#form-add-todo').show()
    $('#form-edit-todo').hide()
    $('#list-todo').hide()
    $('#editTodo').hide()
}

function editTodo(idTodo) {
    $('#navbar-add').hide()
    $('#navbar-logout').show()
    $('#navbar-login').hide()
    $('#navbar-register').hide()
    $('#form-login').hide()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#form-edit-todo').show()
    $('#list-todo').hide()
    $('#editTodo').hide()

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/mytodos/${idTodo}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        $('#edittodoTitle').val(response.data.title)
        $('#edittodoDescription').val(response.data.description)
        $('#edittodoDueDate').val(response.data.due_date.split('T')[0])
        localStorage.setItem('idTodo', idTodo)
    })
    .fail(err => {
        console.log(err.responseJSON)
    })
}

function deleteOutstandingTodo(idTodo) {
    $.ajax({
        method: 'DELETE',
            url: `http://localhost:3000/mytodos/${idTodo}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
    })
    .done(response => {
        console.log(response)
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
    // event.preventDefault()
}

function deleteCompletedTodo(idTodo) {
    $.ajax({
        method: 'DELETE',
            url: `http://localhost:3000/mytodos/${idTodo}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
    })
    .done(response => {
        console.log(response)
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
    // event.preventDefault()
}

function completeTodo(idTodo) {
    $.ajax({
        method: 'PUT',
            url: `http://localhost:3000/mytodos/complete/${idTodo}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
    })
    .done(response => {
        console.log(response)
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
    // event.preventDefault()
}

function todoList() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/mytodos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            console.log(response)
            $('#completed-todos').empty()
            $('#outstanding-todos').empty()
            response.forEach(data => {
                if (data.status == 'complete') {
                    $('#completed-todos').append(`
                    <div class="card-header bg-primary" id="todoTitle">${data.title}
                        <button type="submit" class="btn btn-info float-right mr-2" onclick="deleteCompletedTodo(${data.id})">Delete</button>
                    </div>
                        <div class="card-body">
                            <h5 class="card-title" id="todoDueDate">${data.due_date}</h5>
                            <p class="card-text" id="todoDescription">${data.description}</p>
                        </div>`)
                }
                else {
                    $('#outstanding-todos').append(`
                    <div class="card-header bg-primary" id="todoTitle">${data.title}
                        <button class="btn btn-info float-right mr-2" onclick="completeTodo(${data.id})">Complete</button>
                        <button class="btn btn-info float-right mr-2" onclick="editTodo(${data.id})">Edit</button>
                        <button class="btn btn-info float-right mr-2" onclick="deleteOutstandingTodo(${data.id})">Delete</button>
                    </div>
                    <div class="card-body">
                            <h5 class="card-title" id="todoDueDate">${data.due_date}</h5>
                            <p class="card-text" id="todoDescription">${data.description}</p>
                    </div>`)
                }
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function onSignIn(googleUser) {
    // mengambil akses token google setiap kali sudah sign in
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token, '>>> google id token');
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/google-login',
        headers : {
            google_access_token
        }
    })
        .done((res) => {
            // console.log(res);
            localStorage.setItem('access_token', res.access_token)
            $('#search-result').empty()
            $('#restaurant-result').empty()
            afterLogin()
        })
        .fail((err) => {
            console.log(err);
        })
}

function weather() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/weather',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        $('#weather-card').empty()
        $('#weather-card').append(`
        <div class="card p-4 rounded-lg" style="width: 18rem;">
        <h3>Today's Weather</h3><br>
            <img src="${response.data.current.weather_icons[0]}" class="card-img-top" style="height:10em">
            <div class="card-body">
                <h5 class="card-title">${response.data.current.weather_descriptions[0]}</h5>
                <p class="card-text">${response.data.location.localtime}</p>
            </div>
        </div>`)
    })
    .fail((err) => {
        console.log(err);
    })
}

$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        afterLogin()

    }
    else {
        beforeLogin()
        initContent()
    }

    $('#navbar-login').click(event => {
        initContent()
    })

    $('#navbar-register').click(event => {
        navRegister(event)
    })

    $('#navbar-add').click(event => {
        navbarAdd()
    })

    $('#navbar-logout').click(event => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
    });
        localStorage.clear()
        beforeLogin()
    })


    $('#complete-outstanding-todo').click(event => {

    })

    $('#edit-outstanding-todo').click(event => {
        editTodo()
    })

    $('#form-login').submit(event => {
        event.preventDefault()
        const email = $('#loginEmail').val()
        const password = $('#loginPassword').val()
        console.log(email, password)

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/user/login',
            data: {
                email, password
            }
        })
            .done((response) => {
                $('#loginEmail').val('')
                $('#loginPassword').val('')
                localStorage.setItem('access_token', response.access_token)
                // console.log(response)
                afterLogin()
            })
            .fail((err) => {
                console.log(err.responseJSON)
            })
    })

    $('#form-register').submit(event => {
        event.preventDefault()
        const username = $('#registerUsername').val()
        const email = $('#registerEmail').val()
        const password = $('#registerPassword').val()
        const city = $('#registerCity').val()

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/user/register',
            data: {
                username, email, password, city
            }
        })
            .done((response) => {
                $('#registerUsername').val('')
                $('#registerEmail').val('')
                $('#registerPassword').val('')
                $('#registerCity').val('')
                localStorage.setItem('access_token', response.access_token)
                // console.log(response)
                initContent()
            })
            .fail((err) => {
                console.log(err)
            })
    })

    $('#form-add-todo').submit(event => {
        event.preventDefault()
        const title = $('#todoTitle').val()
        const description = $('#todoDescription').val()
        const status = 'incomplete'
        const due_date = $('#todoDueDate').val()

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/mytodos',
            data: {
                title, description, status, due_date
            },
            headers: {
                access_token: localStorage.access_token,
                
            }
        })
            .done(response => {
                $('#todoTitle').val('')
                $('#todoDescription').val('')
                $('#todoDueDate').val('')
                afterLogin()
            })
            .fail(err => {
                console.log(err)
            })
    })

    $('#form-edit-todo').submit(event => {
        event.preventDefault()
        const title = $('#edittodoTitle').val()
        const description = $('#edittodoDescription').val()
        const status = 'incomplete'
        const due_date = $('#edittodoDueDate').val()

        $.ajax({
            method: 'PUT',
            url: `http://localhost:3000/mytodos/${localStorage.idTodo}`,
            data: {
                title, description, status, due_date
            },
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .done(response => {
                // console.log(headers)
                $('#edittodoTitle').val('')
                $('#edittodoDescription').val('')
                $('#edittodoDueDate').val('')
                localStorage.removeItem('idTodo')
                afterLogin()
            })
            .fail(err => {
                console.log(err)
            })
    })

})
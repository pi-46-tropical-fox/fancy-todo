const showLoginForm = (event) => {
    $('#form-login').show()
    $('#form-register').hide()
    $('nav').hide()
    $('#edit-card').hide()
}

const showRegisterForm = (event) => {
    $('#form-register').show()
    $('#form-login').hide()
    $('nav').hide()
    $('#edit-card').hide()
}

const beforeLogin = (event) => {
    $('#form-register').hide()
    $('#form-login').show()
    $('nav').hide()
    $('#todo-card').hide()
    $('#edit-card').hide()
}

const afterLogin = (event) => {
    $('#form-register').hide()
    $('#form-login').hide()
    $('nav').show()
    $('#todo-card').show()
    $('#todos-card').empty()
    $('#edit-card').hide()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done((res) => {
            res.todoData.forEach(el => {
                $('#todos-card').append(`
                    <div class="card" style="width:100%;margin:1em 0 1em 0;">
                        <div class="card-body">
                            <div style="display: flex;justify-content: space-between;">
                                <h5 class="card-title">${el.title}</h5>
                                ${res.todosWithUserId.includes(el.id) ?
                                `<div style="display:flex;flex-direction:row;padding:1em">
                                    <a data-id=${el.id} data-title='${el.title}' data-description='${el.description}' data-status='${el.status}' data-date='${el.due_date}' href="#" onclick="updates(event)">Edit </a> 
                                    <a data-id=${el.id} href="#" onclick="deletes(event)" style="color:red;margin-left:1em;">Delete </a>
                                </div>` : ''}
                            </div>
                            <h6 class="card-subtitle mb-2 text-muted">${el.User.email}</h6>
                            <p class="card-text">${el.description}</p>
                        </div>
                    </div>
                `)
            })
        })
        .fail(err => {
            $('#todos-card').append(`
                <h1 style="margin-top:1em;">Failed To Get Todos Datas</h1>
            `)
        })
}

const logout = (event) => {
    $('#movie-card').hide()
    beforeLogin()
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
}

const loginPost = (event) => {
    event.preventDefault()
    const email = $('#loginEmail').val()
    const password = $('#loginPass').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        data: {
            email,
            password
        }
    })
        .done(res => {
            localStorage.setItem('access_token', res.access_token)
            afterLogin()
        })
        .fail(err => {
            err.responseJSON.errors.forEach(el => {
                $('#error-login').append(`
                    <p class="error-message">${el}</p
                `)
                setTimeout(function () {
                    $(".error-message").remove();
                }, 2000);
            })
        })
}

const postTodo = (event) => {
    event.preventDefault()

    const title = $('#title').val();
    const description = $('#description').val();
    const due_date = $('#due_date').val();

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
        .done(res => {
            $('#title').val('');
            $('#description').val('');
            $('#due_date').val('');
            afterLogin()
        })
        .fail(err => {
            err.responseJSON.errors.forEach(el => {
                $('#error-list').append(`
                    <p class="error-message">${el}</p
                `)
                setTimeout(function () {
                    $(".error-message").remove();
                }, 2000);
            })
        })
}

const registerPost = (event) => {
    event.preventDefault()
    const email = $('#registEmail').val()
    const password = $('#registPass').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/auth/register',
        data: {
            email,
            password
        }
    })
        .done(res => {
            $('#registEmail').val('')
            $('#registPass').val('')
            beforeLogin()
        })
        .fail(err => {
            err.responseJSON.errors.forEach(el => {
                $('#error-register').append(`
                    <p class="error-message">${el}</p
                `)
                setTimeout(function () {
                    $(".error-message").remove();
                }, 2000);
            })
        })
}

const deletes = (event) => {
    event.preventDefault()

    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_tken')
        }
    })
        .done(res => {
            afterLogin()
        })
        .fail(err => {
            $('#error-delete').append(`
                <h4 style="margin-top:1em;" class="delete-error">Failed To Delete Todos Datas</h4>
            `)
            setTimeout(function () {
                $(".delete-error").remove();
            }, 5000);
        })
}

const updatePage = (event) => {
    $('#form-register').hide()
    $('#form-login').hide()
    $('nav').show()
    $('#todo-card').hide()
    $('#edit-card').show()
}

var editId;

const updates = (event) => {
    event.preventDefault()
    updatePage()

    let now = new Date(event.srcElement.dataset.date)
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#title-edit').val(event.srcElement.dataset.title)
    $('#description-edit').val(event.srcElement.dataset.description)
    editId = event.srcElement.dataset.id

    if (event.srcElement.dataset.status == 'true') {
        $("#done-update").prop("checked", true);
    } else {
        $("#undone-update").prop("checked", true);
    }

    $('#title-edit').val()
    $('#date-edit').val(today)
}

const submitEdit = (event) => {
    event.preventDefault()

    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const status = !!$('input[name="status"]:checked').val()
    const due_date = $('#date-edit').val()

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${editId}`,
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
        .done(res => {
            afterLogin()
        })
        .fail(err => {
            err.responseJSON.errors.forEach(el => {
                $('#error-edit').append(`
                    <p class="error-message">${el}</p
                `)
                setTimeout(function () {
                    $(".error-message").remove();
                }, 2000);
            })
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/auth/googleLogin',
        headers: { id_token }
    })
        .done(res => {
            localStorage.setItem('access_token', res.access_token)
            afterLogin()
        })
        .fail(err => {
            $('#error-login').append(`
            <p class="error-message">Something Went Wrong</p
        `)        
    })
}

const getPopularMovie = (event) => {
    event.preventDefault()
    $('#movie-card').empty()
    $('#todo-card').hide()
    $('#todos-card').hide()
    $('#edit-card').hide()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(res => {
            res.forEach(data => {
                $('#movie-card').append(`
            <div class="card" style="width: 18rem;margin:0.4em;">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text" style="white-space:nowrap;overflow:hidden">${data.overview}</p>
                </div>
            </div>
            `)
            })
        })
        .fail(err => {
            $('#movie-card').append(`
                <h1 style="margin-top:1em;">Failed To Get Movies</h1>
            `)
        })
}

$(document).ready(() => {
    if (localStorage.getItem('access_token')) {
        afterLogin()
    } else {
        beforeLogin()
    }

    $('#sign-up').click(showRegisterForm)
    $('#log-in').click(showLoginForm)
    $('#logout').click(logout)
    $('#movie-list').click(getPopularMovie)

    $('#formLogin').submit(loginPost)
    $('#formRegister').submit(registerPost)

    $('#addTodos').submit(postTodo)
    $('#editTodos').submit(submitEdit)
})
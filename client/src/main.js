const init = () => {
    $('#home').hide()
    $('#login-form').hide()
    $('#register-form').hide()
    $('#all-todos').hide()
    $('#add-todo').hide()
    $('#edit-todo').hide()
}

const home = () => {
    init()
    $('#home').show()
}

const icon = () => {
    if (localStorage.getItem('access_token')) {
        allTodos()
    } else {
        home()
    }
}

const login = () => {
    init()
    $('#login-form').show()
}

const register = () => {
    init()
    $('#register-form').show()
}

const allTodos = () => {
    init()
    $('#all-todos').show()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done(res => {
        if (res.length > 0) {
            res.forEach(todo => {
                $('#everytodos')
                .append(
                    `<a href="#" id="todo"><li class="list-group-item">
                        <input class="form-check-input" type="checkbox" id="todo-${todo.id}" ${todo.status ? 'checked' : null}>
                        <label class="form-check-label" for="defaultCheck1">
                        ${todo.title} - created by ${todo.User.username}
                        </label>
                    </li></a>`)
            })
        }
    }).fail(err => {
        console.log(err);
    })
}

const addTodo = () => {
    init()
    $('#add-todo').show()
}

const newTodo = () => {
    const title = $('#addTitle').val()
    const description = $('#addDesc').val()
    const due_date = $('#addDueDate').val()
    const location = $('#addLocation').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            due_date,
            location
        }
    }).done(res => {
        $('#addTitle').val('')
        $('#addDesc').val('')
        $('#addDueDate').val('')
        $('#addLocation').val('')
        afterLoginNav()
        allTodos()
    }).fail(err => {
        console.log(err);
    })
}

const editTodo = () => {
    init()
    $('#edit-todo').show()
}

const deleteTodo = () => {
    
}

const beforeLoginNav = () => {
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-all-todos').hide()
    $('#nav-add-todo').hide()
    $('#nav-logout').hide()
}

const afterLoginNav = () => {
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-all-todos').show()
    $('#nav-add-todo').show()
    $('#nav-logout').show()
}

const loginForm = (event) => {
    event.preventDefault()
    const email = $('#LoginEmail').val()
    const password = $('#LoginPassword').val()
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    }).done(res => {
        localStorage.setItem('access_token', res.access_token)
        afterLoginNav()
        allTodos()
    }).fail(err => {
        console.log(err);
    })
}

const registerForm = (event) => {
    event.preventDefault()
    const username = $('#RegisterUsername').val()
    const email = $('#RegisterEmail').val()
    const password = $('#RegisterPassword').val()
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            username,
            email,
            password
        }
    }).done(res => {
        $('#RegisterUsername').val('')
        $('#RegisterEmail').val('')
        $('#RegisterPassword').val('')
        beforeLoginNav()
        login()
    }).fail(err => {
        console.log(err);
    })
}

const changeStatus = (event) => {
    event.preventDefault()
    console.log('ini dari changeStatus');
    // $.ajax({
    //     method: 'PUT',
    //     url: `http://localhost:3000/todos/${id}`,
    //     headers: {
    //         access_token: localStorage.getItem('access_token')
    //     }
    // })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googlelogin',
        headers: {
            google_access_token: id_token
        }
    }).done(res => {
        localStorage.setItem('access_token', res.access_token)
        afterLoginNav()
        allTodos()
    }).fail(err => {
        console.log(err);
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

const logout = () => {
    localStorage.clear()
    signOut()
    beforeLoginNav()
    login()
}

$(document).ready(() => {
    if (localStorage.getItem('access_token')) {
        afterLoginNav()
        allTodos()
    } else {
        beforeLoginNav()
        login()
    }

    $('#fancy-icon').click(icon)
    $('#nav-login').click(login)
    $('#nav-register').click(register)
    $('#nav-all-todos').click(allTodos)
    $('#nav-add-todo').click(addTodo)
    $('#nav-logout').click(logout)

    $('#loginForm').submit(loginForm)
    $('#registerForm').submit(registerForm)
    $('#addTodoForm').submit(newTodo)

    // $('#todo').click(changeStatus)
})
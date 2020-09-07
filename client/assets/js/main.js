const baseUrl = 'https://abdul-fancy-todo.herokuapp.com'

logout = () => {
    $('.msg').empty()
    signOut()
    beforeLogin()
    localStorage.clear()
    $('.msg').append(`<div class="alert alert-success" role="alert">You've logged out!</div>`)
}
allTodoList = () => {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-list').show()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#food-form').hide()
    $('#todo-list tbody').empty()
    $('#resto-container').empty()
    $('.msg').empty()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(res => {
        if(res.length === 0){
            $('#todo-list .container').empty()
            $('#todo-list .container').append(`<h2>You don't have any todo</h2>`)
        }else{
            let i = 1
            for(const el of res){                
                let data = `<tr>
                                <th scope="row">${i++}</th>
                                <td>${el.title}</td>
                                <td>${el.description}</td>
                                <td>${el.due_date}</td>
                                <td>${el.status}</td>
                                <td>
                                    <button type="button" onclick="editTodo(${el.id})" class="btn btn-success btn-sm">Edit</button>
                                    <button type="button" onclick="deleteTodo(${el.id})" class="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>`
                $('#todo-list tbody').append(data)
            }
        }
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
        }
    })
}
createTodo = () => {
    $('#todo-list').hide()
    $('#todo-create-form').show()
    $('#todo-edit-form').hide()
    $('#food-form').hide()
    $('#resto-container').empty()
}
beforeLogin = ()  =>{
    $('header').hide()
    $('#form-login').show()
    $('#form-register').hide()
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#food-form').hide()
    $('#resto-container').empty()
}
afterLogin = () => {
    $('header').show()
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#food-form').hide()
    $('#resto-container').empty()
    allTodoList()
}
loginForm = e => {
    e.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password
        }
    })
    .done(res => {
        $('#email-login').val('')
        $('#password-login').val('')
        localStorage.setItem('access_token', res.access_token)
        afterLogin()
        $('.msg').append(`<div class="alert alert-success" role="alert">Login success!</div>`)
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
        }
    })
}
registerForm = e => {
    e.preventDefault()
    const firstName = $('#firstName').val()
    const lastName = $('#lastName').val()
    const email = $('#email-register').val()
    const password = $('#password-register').val()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            firstName,
            lastName,
            email,
            password
        }
    })
    .done(res => {
        $('#firstName').val('')
        $('#lastName').val('')
        $('#email-register').val('')
        $('#password-register').val('')
        localStorage.setItem('access_token', res.access_token)
        afterLogin()
        $('.msg').append(`<div class="alert alert-success" role="alert">Account created successfully!</div>`)
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
        }
    })
}
todoCreateForm = e => {
    e.preventDefault()
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
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
        afterLogin()
        $('.msg').append(`<div class="alert alert-success" role="alert">Todo created successfully!</div>`)
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
        }
    })
}
foodForm = () => {
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#food-form').show()
    $('#resto-container').empty()
}
getResto = e => {
    e.preventDefault()
    $('#resto-container').empty()
    const name = $('#food-name').val()
    const location_id = $('#location_id').val()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/foods?name=${name}&location_id=${location_id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(res => {
        for(const el of res){
            let data = `<div class="col mb-4">
                            <div class="card text-center">
                                <div class="card-body">
                                    <div>
                                        <img src="${el.restaurant.thumb}" class="card-img-top" alt="...">
                                    </div>                                    
                                    <h3 class="card-title">${el.restaurant.name}</h3>
                                    <p class="card-text">${el.restaurant.location.address}.</p>
                                    <p class="card-text">Cuisines : ${el.restaurant.cuisines}.</p>
                                    <p class="card-text">Price for two : ${el.restaurant.average_cost_for_two.toLocaleString()}</p>
                                    <p class="card-text">Operational hour : ${el.restaurant.timings}</p>
                                    <a href="${el.restaurant.menu_url}" class="btn btn-primary">View All Menu</a>
                                </div>
                            </div>
                        </div>`
            $('#resto-container').append(data)
            
        }
        
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
        }
    })
}
function onSignIn(googleUser) {
    const google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/googleLogin`,
        headers: {
            google_access_token
        }
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token)
        afterLogin()
        $('.msg').append(`<div class="alert alert-success" role="alert">Succes get in with Google!</div>`)
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
        }
    })
}
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

$(document).ready(() => {

    if(localStorage.getItem('access_token')){
        afterLogin()
        allTodoList()
    }else{
        beforeLogin()
    }    

    $('#nav-logout').click(logout)
    $('#nav-all-todo').click(allTodoList)
    $('#nav-create-todo').click(createTodo)
    $('#nav-hungry').click(foodForm)
    $('#btn-get-resto').click(getResto)
    $('.register-link').click(() => {
        $('#form-login').hide()
        $('#form-register').show()
        $('.msg').empty()
    })
    $('.login-link').click(() => {
        $('#form-login').show()
        $('#form-register').hide()
        $('.msg').empty()
    })
    $('#formLogin').submit(loginForm)
    $('#formRegister').submit(registerForm)
    $('#formCreateTodo').submit(todoCreateForm)
    $('button, #logo, #nav-all-todo, #nav-create-todo, #nav-hungry, .register-link, login-link').click(e => {
        $('.msg').empty()
    })

    editTodo = (id) => {
        $('#form-login').hide()
        $('#form-register').hide()
        $('#todo-list').hide()
        $('#todo-create-form').hide()
        $('#todo-edit-form').show()
        $('.msg').empty()
        $.ajax({
            method: 'GET',
            url: `${baseUrl}/todos/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(res => {
            $('#todo-edit-form .container').empty()
            let data = `
            <form id="formEditTodo">
                <div class="form-group" style="width: 500px;">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" name="edit-title" id="edit-title" value="${res.title}">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" name="edit-description" id="edit-description" value="${res.description}">
                </div>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col">
                            <label for="due_date">Due Date</label>
                        <input type="date" class="form-control" name="edit-due_date" id="edit-due_date" value="${res.due_date}">
                        </div>
                        <div class="col">
                            <label for="edit-status">Status</label>
                            <input type="text" class="form-control" name="edit-status" id="edit-status" value="${res.status}">
                        </div>
                    </div>
                </div> 
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>`
            $('#todo-edit-form .container').append(data)
            $('#formEditTodo').submit(e => {
                e.preventDefault()
                const title = $('#edit-title').val()
                const description = $('#edit-description').val()
                const due_date = $('#edit-due_date').val()
                const status = $('#edit-status').val()
                $.ajax({
                    method: 'PUT',
                    url: `${baseUrl}/todos/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        title,
                        description,
                        due_date,
                        status                                                                                                                                                                                                                                                                                                                                                      
                    }
                })
                .done(res => {
                    allTodoList()
                    $('.msg').append(`<div class="alert alert-success" role="alert">Todo edited successfully!</div>`)
                })
                .fail(err => {
                    for(const el of err.responseJSON.errors){
                        $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
                    }
                })
            })
        })
        .fail(err => {
            for(const el of err.responseJSON.errors){
                $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
            }
        })
    }
    deleteTodo = (id) => {
        $.ajax({
            method: 'DELETE',
            url: `${baseUrl}/todos/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(res => {
            allTodoList()
            $('.msg').append(`<div class="alert alert-success" role="alert">Todo deleted successfully!</div>`)
        })
        .fail(err => {
            for(const el of err.responseJSON.errors){
                $('.msg').append(`<div class="alert alert-danger" role="alert">${el}</div>`)
            }
        })
    }
    
})
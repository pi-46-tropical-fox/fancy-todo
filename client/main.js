menuLogin = () => {
    $('#form-login').show()
    $('#form-register').hide()
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#todo-card').hide()
    $('.msg').empty()
}
menuRegister = () => {
    $('#form-login').hide()
    $('#form-register').show()
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#todo-card').hide()
    $('.msg').empty()
}
menuLogout = () => {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#todo-card').hide()
    $('.msg').empty()
    beforeLogin()
    menuLogin()
    localStorage.clear()
}
menuAllTodo = () => {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-list').show()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#todo-card').hide()
    $('#todo-list tbody').empty()
    $('.msg').empty()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
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
                                    <button type="button" onclick="detailTodo(${el.id})" class="btn btn-primary btn-sm">Detail</button>
                                </td>
                            </tr>`
                $('#todo-list tbody').append(data)
            }
        }
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<small class="text-danger">${el}</small><br>`)
        }
    })
}
menuCreateTodo = () => {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-list').hide()
    $('#todo-create-form').show()
    $('#todo-edit-form').hide()
    $('#todo-card').hide()
    $('.msg').empty()
}
menuEditTodo = () => {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').show()
    $('#todo-card').hide()
    $('.msg').empty()
}
initContent = () => {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todo-list').hide()
    $('#todo-create-form').hide()
    $('#todo-edit-form').hide()
    $('#todo-card').hide()
}
beforeLogin = ()  =>{
    $('#nav-all-todo').hide()
    $('#nav-create-todo').hide()
    $('#nav-logout').hide()
    $('#nav-login').show()
    $('#nav-register').show()
}
afterLogin = () => {
    $('#nav-all-todo').show()
    $('#nav-create-todo').show()
    $('#nav-logout').show()
    $('#nav-login').hide()
    $('#nav-register').hide()
}
loginForm = e => {
    e.preventDefault()
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
    .done(res => {
        $('#email-login').val('')
        $('#password-login').val('')
        localStorage.setItem('access_token', res.access_token)
        afterLogin()
        menuAllTodo()
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<small class="text-danger">${el}</small><br>`)
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
        url: 'http://localhost:3000/register',
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
        menuAllTodo()
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<small class="text-danger">${el}</small><br>`)
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
        menuAllTodo()
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<small class="text-danger">${el}</small><br>`)
        }
    })
}
deleteTodo = (id) => {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(res => {
        menuAllTodo()
    })
    .fail(err => {
        for(const el of err.responseJSON.errors){
            $('.msg').append(`<small class="text-danger">${el}</small><br>`)
        }
    })
}

$(document).ready(() => {
    initContent()

    if(localStorage.getItem('access_token')){
        afterLogin()
        menuAllTodo()
    }else{
        beforeLogin()
        menuLogin()
    }    

    $('#nav-login').click(menuLogin)
    $('#nav-register').click(menuRegister)
    $('#nav-logout').click(menuLogout)
    $('#nav-all-todo').click(menuAllTodo)
    $('#nav-create-todo').click(menuCreateTodo)
    $('#formLogin').submit(loginForm)
    $('#formRegister').submit(registerForm)
    $('#formCreateTodo').submit(todoCreateForm)
    editTodo = (id) => {
        $('#form-login').hide()
        $('#form-register').hide()
        $('#todo-list').hide()
        $('#todo-create-form').hide()
        $('#todo-edit-form').show()
        $('#todo-card').hide()
        $('.msg').empty()
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/todos/${id}`,
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
                    url: `http://localhost:3000/todos/${id}`,
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
                    menuAllTodo()
                })
                .fail(err => {
                    for(const el of err.responseJSON.errors){
                        $('.msg').append(`<small class="text-danger">${el}</small><br>`)
                    }
                })
            })
        })
        .fail(err => {
            for(const el of err.responseJSON.errors){
                $('.msg').append(`<small class="text-danger">${el}</small><br>`)
            }
        })
    }
    $('button[type=submit]').click(e => {
        $('.msg').empty()
    })
    
})
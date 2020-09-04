function menuLogin(event) {
    $('#form-login').show()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#todo-list').hide()
}

function menuRegister(event) {
    $('#form-login').hide()
    $('#form-register').show()
    $('#form-add-todo').hide()
    $('#todo-list').hide()
}

function menuAdd(event) {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#form-add-todo').show()
    $('#todo-list').hide()
}


function menuList(event) {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#todo-list').show()

    $('#tableTodo').empty()

    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/todos',
        headers: {
            acces_token: localStorage.getItem('acces_token')
        }
    })
    .done(response => {
        console.log(response)
        response.forEach(el => {

            $('#tableTodo').append(`
            <tr>
                <th>${el.title}</th>
                <th>${el.description}</th>
                <th>${el.status}</th>
                <th>${el.due_date}</th>
                <th><button onclick="deleteTodo(${el.id})" type="button" class="close" aria-label="Close">X</button></th>
            </tr>
`)
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function menuLogout(event) {
    $('#form-login').show()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#todo-list').hide()
    beforeLogin()
    localStorage.clear()
    // localStorage.removeItem('acces_token')
}

function initContent() {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#todo-list').hide()
}

function beforeLogin() {
    $('#nav-register').show()
    $('#nav-login').show()
    $('#nav-add').hide()
    $('#nav-home').hide()
    $('#nav-logout').hide()
}

function afterLogin() {
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-add').show()
    $('#nav-home').show()
    $('#nav-logout').show()
}

function loginForm(event) {
    event.preventDefault()
        
        const email = $('#loginEmail').val()
        const password = $('#loginPassword').val()

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: {
                email,password
            }
        })
        .done(response => {
            localStorage.setItem('acces_token', response.acces_token)
            menuList()
        })
        .fail(err => {
            console.log(err)
        })
}

function registerForm(event) {
    event.preventDefault();
    const email = $('#registerEmail').val()
    const password = $('#registerPassword').val()

    $.ajax({
        method:'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
    .done(response => {
        $('#registerEmail').val('')
        $('#registerPassword').val('')
           
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

function addTodo(even) {
    even.preventDefault();
    const title = $('#inputTitle').val()
    const description = $('#inputDescription').val()
    const status = $('#inputStatus').val()
    const due_date = $('#inputDueDate').val()
    

    $.ajax({
        method: 'POST',
        url :'http://localhost:3000/todos',
        data: {
            title,
            description,
            status,
            due_date
        },
        headers: {
            acces_token: localStorage.getItem('acces_token')
        }
    })
    .done(response =>{ 
        Swal.fire(
            'Good job!',
            `${response.title} telah ditambahkan`,
            'success'
          )
        menuList()
    })
    .fail(err => {
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
    })
}

function deleteTodo(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'delete',
        headers: {
            acces_token: localStorage.getItem('acces_token')
        }
    })
    .done(response => {
        
        menuList()
    })
    .fail(err => {
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
    })
}

$(document).ready(function() {
    initContent()
    if(localStorage.getItem('acces_token')) {
        afterLogin()
        menuList()
    } else {
        beforeLogin()
        menuLogin()
    }
    
    $('#nav-login').click(menuLogin)
    $('#nav-register').click(menuRegister)
    $('#nav-add').click(menuAdd)
    $('#nav-home').click(menuList)
    $('#nav-logout').click(menuLogout)
    $('#loginForm').submit(loginForm)
    $('#registerForm').submit(registerForm)
    $('#addTodo').submit(addTodo)
    // $('#buttonDelete').click(deleteTodo)
    
})
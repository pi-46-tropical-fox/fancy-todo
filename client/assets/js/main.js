const host = 'https://todoers-app.herokuapp.com'
// const host = 'http://localhost'
const port = null
const baseUrl = `${host}${ port ? `:${port}` : '' }`

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    timer: 3000,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const showToastSuccess = (message) => Toast.fire({ icon: 'success', title: message })

const showSwalError = (message) => Swal.fire('Oops!', message, 'error')

// Auth

const register = (e) => {
    e.preventDefault()

    let name = $('#reg-name').val()
    let username = $('#reg-username').val()
    let password = $('#reg-password').val()

    $.ajax({
        method: "POST",
        url: `${baseUrl}/u/register`,
        data: { name, username, password }
    })
    .done(() => {
        showToastSuccess(`Successfully registered as ${username}!`)
    
        init()
    })
    .fail((err) => {
        showSwalError(err.responseJSON.msg.join('<br>'))
    })
}

const signIn = (e) => {
    e.preventDefault()
    
    let username = $('#login-username').val()
    let password = $('#login-password').val()

    $.ajax({
        method: "POST",
        url: `${baseUrl}/u/login`,
        data: { username, password }
    })
    .done((data) => {
        for(const key in data){
            localStorage.setItem(key, data[key])
        }

        showToastSuccess(`Successfully signed in!`)
    
        init()
    })
    .fail((err) => {
        showSwalError(err.responseJSON.msg.join('<br>'))
    })
}

const signOut = (e) => {
    e.preventDefault()

    // Start: Google Sign-out
    var auth2 = gapi.auth2.getAuthInstance()

    if(auth2) auth2.signOut()
    // End: Google Sign-out

    localStorage.clear()

    showToastSuccess(`Signed out successfully.`)

    init()
}

function googleLogin (googleUser) {
    const google_access_token = googleUser.getAuthResponse().id_token;
    
    // send google token ke back end
    $.ajax ({
        method:'POST',
        url: `${baseUrl}/u/googleLogin`,
        headers: {google_access_token}
    })
    .done(response => {
        for(const key in response){
            localStorage.setItem(key, response[key])
        }

        showToastSuccess(`Successfully signed in with Google account: ${response.username}`)

        init()
    })
    .fail(err => {
        showSwalError(err.statusText)
    })
}

// Todos

const getTodos = () => {
    let { access_token, id } = getCurrentAuth()

    $('#todos').empty()

    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token
        },
        data: {
            id
        }
    })
    .done(data => {
        data.forEach(row => $('#todos').append(`
        <div class="list flex border-b-2 border-gray-200 p-4 ${ row.status === 'pending' ? '' : 'bg-green-200' }">
            <div class="checkbox">
                <input type="checkbox" id="statusCheck" data-id="${row.id}" ${ row.status === 'done' ? 'checked' : '' } onclick="changeStatus(event)" data-id="">
            </div>
            <div class="content flex-grow mx-4">
                <h3 id="todoTitle-${row.id}" class="title mb-2">${row.title}</h3>
                <span id="todoDueDate-${row.id}" class="due_date block">Due at: ${new Date(row.due_date).toString().split(' ').slice(0,3).join(' ')}</span>
                <span id="todoDesc-${row.id}" class="description block mb-2">Description: ${row.description}</span>
                ${row.PasteeId ? `
                <span class="code block">Attached code: <a target="_blank" href="https://paste.ee/p/${row.PasteeId}" class="url" id="pastee-${row.id}">https://paste.ee/p/${row.PasteeId}</span></span>
                ` : ''}
            </div>
            <div class="action flex flex-col align-middle items-end">
                <a href="#" class="m-1" onclick="editTodo(${row.id}, event)"><span class="btn info block">Edit</span></a>
                <a href="#" class="m-1" onclick="deleteTodo(${row.id})"><span class="btn danger block">Delete</span></a>
            </div>
        </div>
        `))
    })
}

const submitTodo = (event) => {
    if($('#todoId').val() != '') postTodo(event)
    else updateTodo(event)
}

const postTodo = (event) => {
    event.preventDefault()
    $('#submitTodo').attr('disabled',true)
    let { access_token, id } = getCurrentAuth()

    let data = {}
    
    $('.create form').serializeArray().forEach(formData => {
        data[formData.name] = formData.value
    })

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: { access_token },
        data
    })
    .done(() => {
        $('.create .title').val('')
        $('.create .description').val('')
        $('.create .due_date').val('')
        $('.create .code').val('')
        toggleModal(event, 'create')
        $('#submitTodo').removeAttr('disabled')
        init()

        showToastSuccess(`Yeay! Todo data was successfully made.`)
    })
    .fail(err => {
        showSwalError(err.responseJSON.msg.join('<br>'))
    })
}

const editTodo = (id, e) => {
    const { access_token } = getCurrentAuth()

    $.ajax({
        method: 'get',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token,
            id
        }
    })
    .done(todo => {
        $('.edit .todoId').val(todo.id)
        $('.edit .title').val(todo.title)
        $('.edit .description').val(todo.description)
        $('.edit .due_date').val(todo.due_date.split('T')[0])
    
        toggleModal(e, 'edit')
    })
    .fail(err => showSwalError(err.responseJSON.msg.join('<br>')))
}

const changeStatus = (e) => {
    console.log(e.target.checked);
    let { access_token } = getCurrentAuth()
    
    let id = e.target.dataset.id
    
    $.ajax({
        method: "put",
        headers: {
            access_token,
            id
        },
        url: `${baseUrl}/todos/${id}`,
        data: {
            status: e.target.checked ? 'done' : 'pending'
        }
    })
    .done(() => {
        showToastSuccess(`Yeay! You've successfully updated todo.`)
        getTodos()
    })
    .fail(err => {
        showSwalError(err.responseJSON.msg.join('<br>'))
    })
}

const updateTodo = (e) => {
    e.preventDefault()
    let { access_token } = getCurrentAuth()

    let data = {}
    
    $('.edit form').serializeArray().forEach(formData => {
        data[formData.name] = formData.value
    })

    let id = data.todoId

    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token,
            id
        },
        data
    })
    .done(() => {
        $('.edit .todoId').val('')
        $('.edit .title').val('')
        $('.edit .description').val('')
        $('.edit .due_date').val('')
        $('.edit .code').val('')

        toggleModal(e, 'edit')

        getTodos()

        Toast.fire('Yeay! Todo data was successfully updated.', 'success')
    })
    .fail(err => {
        showSwalError(err.responseJSON.msg.join('<br>'))
    })
}

const deleteTodo = (id) => {
    let { access_token } = getCurrentAuth()

    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    })
    .then(data => {
        if(data.isConfirmed) {
            $.ajax({
                method: 'DELETE',
                url: `${baseUrl}/todos/${id}`,
                headers: { access_token, id },
                data
            })
            .done(() => {
                getTodos()
                showToastSuccess(`Don't regret about this, your todo has been deleted.`)
            })
            .fail(err => {
                showSwalError(err.responseJSON.msg.join('<br>'))
            })
        }


    // let data = {
    //     id,
    //     title: $('#title').val(),
    //     description: $('#description').val(),
    //     due_date: $('#due_date').val(),
    //     code: $('#code').val()
    // }

    })
}

const getCurrentAuth = () => {
    let data = {
        access_token: localStorage.getItem('access_token'),
        id: localStorage.getItem('id')
    }

    return data
}

// 3rd Party APIs

const showQuote = () => {
    let { access_token } = getCurrentAuth()

    $.ajax({
        method: 'GET',
        url: `${baseUrl}/api/quote`,
        headers: { access_token },
    })
    .done((data) => {
        $('#quote').text(`"${data.en}"`)
        $('#quoteAuthor').text(`-- ${data.author}`)
    })
    .fail(err => {
        console.log(err);
        showSwalError(err.responseJSON.msg.join('<br>'))
    })
}

const getWallpaper = () => {
    // 
}

// jQuery functions

const toggleModal = (e, method) => {
    e.preventDefault()
    
    $(`.modal.${method}`).toggleClass('opacity-0')
    $(`.modal.${method}`).toggleClass('pointer-events-none')
    $('body').toggleClass('modal-active')
}

const checkAuth = () => {
    if(localStorage.getItem('access_token')){
        showMain()
    } else {
        showLogin()
    }
}

const showMain = () => {
    $('#auth').hide()
    $('nav').show()

    $('#name').text(localStorage.getItem('name'))
    $('#main').show()

    showAvatar(localStorage.getItem('picture'))

    showQuote()
    getTodos()
}

const showAvatar = (avatar) => {
    if(avatar){
        $('#avatar').css('background-image', `url(${avatar})`)
        $('#avatar').css('background-size', 'cover')

        $('#section-avatar').css('background-image', `url(${avatar})`)
        $('#section-avatar').css('background-size', 'cover')
    } else {
        $('#avatar').css('background-color', '#777')

        $('#section-avatar').css('background-color', '#777')
    }
}

const hideAvatar = () => {
    $('#avatar').removeAttr('style')
    $('#home-avatar').removeAttr('style')
}

const showLogin = () => {
    $('nav').hide()
    $('#main').hide()
    $('#register-')
    $('#auth').show()
}

const showLoginForm = (e) => {
    e.preventDefault()

    $('#register').hide()
    $('#login').show()
    
    $('#register-tab').removeClass('active')
    $('#login-tab').addClass('active')
}

const showRegisterForm = (e) => {
    e.preventDefault()
    
    $('#login').hide()
    $('#register').show()

    $('#login-tab').removeClass('active')
    $('#register-tab').addClass('active')
}

const toggleMenu = (e) => {
    e.preventDefault()

    $('#nav-menu-active').toggleClass('hidden')
    $('#menu-contents').toggleClass('shadow-lg')
    $('#menu-contents').toggleClass('hidden')
}

const init = () => {
    hideAvatar()
    $('nav').hide()
    $('#main').hide()
    $('#auth').hide()
    checkAuth()
}

// main function

$(document).ready(() => {
    init()
    $('#sign-out').click(signOut)

    $('.modal-close').click(() => {})

    $('.modal').bind('keypress', (e) => {
        if((e.keycode || e.which) === 27){
            toggleModal()
        }
    })
})
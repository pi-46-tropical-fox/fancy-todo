const host = 'localhost'
const port = 3457
const baseUrl = `http://${host}:${port}`

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

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
        Toast.fire({
            icon: 'success',
            title: `Successfully registered as ${username}!`
        })
    
        init()
    })
    .fail((err) => {
        Swal.fire('Oops!', err.responseJSON.msg.join('<br>'), 'error')
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

        Toast.fire({
            icon: 'success',
            title: `Successfully signed in!`
        })
    
        init()
    })
    .fail((err) => {
        Swal.fire('Oops!', err.responseJSON.msg.join('<br>'), 'error')
    })
}

const signOut = (e) => {
    e.preventDefault()

    var auth2 = gapi.auth2.getAuthInstance()

    if(auth2) auth2.signOut()

    localStorage.clear()

    Toast.fire({
        icon: 'success',
        title: 'Signed out successfully.'
    })

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

        Toast.fire({
            icon: 'success',
            title: `Successfully signed in with Google account: ${response.username}`
        })

        init()
    })
    .fail(err => {
        console.log(err)
    })
}

const toggleModal = () => {
    $('.modal').toggleClass('opacity-0')
    $('.modal').toggleClass('pointer-events-none')
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
    } else {
        $('#avatar').css('background-color', '#777')
    }
}

const hideAvatar = () => {
    $('#avatar').removeAttr('style')
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

const init = () => {
    hideAvatar()
    $('nav').hide()
    $('#main').hide()
    $('#auth').hide()
    checkAuth()
}

// Todos

const getTodos = () => {
    let { access_token, id } = getCurrentAuth()

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
        console.log(data)
    })
}

const postTodo = () => {
    let { access_token, id } = getCurrentAuth()

    let data = {
        id,
        title: $('#title').val(),
        description: $('#description').val(),
        due_date: $('#due_date').val(),
        status: 'pending',
        code: $('#code').val()
    }

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: { access_token },
        data
    })
    .done(() => {
        init()
        Toast.fire('Yeay! Todo data was successfully made.', 'success')
    })
    .fail(err => {
        Swal.fire('Oops!', err.responseJSON.msg.join('<br>'), 'error')
    })
}

const editTodo = (todo) => {
    $('#title').val(todo.title)
    $('#description').val(todo.description)
    $('#due_date').val(todo.date)

    toggleModal()
}

const markAsDone = () => {
    let { access_token, id } = getCurrentAuth()
}

const updateTodo = () => {
    let { access_token, id } = getCurrentAuth()

    let data = {
        id,
        title: $('#title').val(),
        description: $('#description').val(),
        due_date: $('#due_date').val(),
        code: $('#code').val()
    }

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: { access_token },
        data
    })
    .done(() => {
        init()
        Toast.fire('Yeay! Todo data was successfully made.', 'success')
    })
    .fail(err => {
        Swal.fire('Oops!', err.responseJSON.msg.join('<br>'), 'error')
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
        Swal.fire('Oops!', err.responseJSON.msg.join('<br>'), 'error')
    })
}

const getWallpaper = () => {
    // 
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

// jQuery-specific functions

// const showLogin
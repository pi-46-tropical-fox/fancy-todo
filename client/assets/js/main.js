const host = 'localhost'
const port = 3457

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
        url: `http://${host}:${port}/u/register`,
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
        url: `http://${host}:${port}/u/login`,
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
        url : `http://${host}:${port}/u/googleLogin`,
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

const googleLogout = () => {}

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
    $('#main').show()
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
}

const showRegisterForm = (e) => {
    e.preventDefault()
    
    $('#login').hide()
    $('#register').show()
}

const init = () => {
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

// jQuery-specific functions

// const showLogin
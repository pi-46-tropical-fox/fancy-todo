const url = 'http://localhost:1223'

function beforeLogin(event){
    $('#nav-login').hide()
}

function login(){
    const username = $('#login-username').val()
    const password = $('#login-password').val()

    $('#error-text-login').hide()

    $.ajax({
        method : 'POST',
        url : `${url}/login`,
        data : {
            username, password
        }
    }).done(res => {
        localStorage.setItem('access_token', res.access_token)
        console.log(`Login berhasil! Token nya adalah ${res.access_token}`)
        initialize()
    }).fail(err => {
      $('#error-text-login').show()
        $('#error-text-login').html(err.responseJSON.errors.join(','))
    })
}

// Code untuk sign in dengan google
function onSignIn(googleUser){
    console.log(googleUser)
}

function register(){
    const username = $('#register-username').val()
    const password = $('#register-password').val()
    const email = $('#register-email').val()

    $('#error-text-register').hide()

    $.ajax({
        method : 'POST',
        url : `${url}/register`,
        data : {
            username, email, password
        }
    }).done(res => {
        console.log(res)
        initialize()
    }).fail(err => {
        $('#error-text-register').show()
        $('#error-text-register').html(err.responseJSON.errors.join(','))
    })
}

function logout(){
    localStorage.removeItem('access_token')
}

// function fetchTodos(){
//   $.ajax
// }


function initialize(){
  if(localStorage.getItem('access_token')){
    //Kalo access token sudah ada
    $('#credentials-form').hide()

    fetchTodos()

} else {
    $('#login-form').submit(e => {
        e.preventDefault();
        login();
    })

    $('#register-form').submit(e => {
        e.preventDefault();
        register();
    })
}
}

$(document).ready(() => {
    initialize()
})
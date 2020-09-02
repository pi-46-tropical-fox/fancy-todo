const baseUrl = `http://localhost:3000`

$(document).ready(function(){
    checkAuth()
})

function login (event){
    event.preventDefault()

    let email = $('login-email').val()
    let password = $('login-password').val()

    $.ajax(`${baseUrl}/users/login`,{
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(res => {
        console.log(res);
        localStorage.setItem('token', res.token)
        checkAuth()
    })
    .fail(err=>{
        console.log(err);
    })
    .always(_ =>{
        console.log('Done');
    })

    function checkAuth() {
        if(localStorage.token){
            $('#login-page').hide()
            $('#dashboard-page').show()
            console.log('Berhasil Login');
        } else {
            $('#login-page').show()
            $('#dashboard-page').hide()
            console.log('Verifikasi Gagal !!');
        }
    }

    function logout(){
        localStorage.clear()
        checkAuth()
    }
}
const baseUrl = `http://localhost:3000`

$(document).ready(function(){
    checkAuth()
    $('#dataLogin').on('submit', login) 
})

function login (event){
    console.log('test masuk');
    event.preventDefault()

    let email = $('#usernameLogin').val()
    let password = $('#passwordLogin').val()
    console.log('testing');
    $.ajax({
        url: `${baseUrl}/login`,
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
}

function checkAuth() {
    if(localStorage.token){
        $('#form-login').hide()
        $('#todoList').show()
        console.log('Berhasil Login');
    } else {
        $('#form-login').show()
        $('#todoList').hide()
        $('#form_registration').hide()
        $('#addTodo').hide()

        console.log('Verifikasi Gagal !!');
    }
}

function logout(){
    localStorage.clear()
    checkAuth()
}
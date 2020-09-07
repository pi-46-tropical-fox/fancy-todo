const baseUrl = 'http://localhost:3000'
let todo = []
function tgl(date) {
    return new Date(date).toISOString().split("T")[0]
}
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
        url: `${baseUrl}/todos`,
        headers: {
            acces_token: localStorage.getItem('acces_token')
        }
    })
    .done(response => {
        console.log(response)
        todo = response
        response.forEach(el => {

            $('#tableTodo').append(`
            <tr>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</th>
                <td>${tgl(el.due_date)}</td>
                <td><button onclick="deleteTodo(${el.id})" type="button" class="btn btn-danger">Delete</button> <button onclick="updateTodo(${el.id})" type="button" class="btn btn-primary">Update</button></td>
            </tr>
`)
        })
    })
    .fail(err => {
        showErr(err)
    })
}

function menuLogout(event) {
    $('#form-login').show()
    $('#form-register').hide()
    $('#form-add-todo').hide()
    $('#todo-list').hide()
    localStorage.clear()
    signOut()
    beforeLogin()
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
            url: `${baseUrl}/login`,
            data: {
                email,password
            }
        })
        .done(response => {
            localStorage.setItem('acces_token', response.acces_token)
            menuList()
            afterLogin()
        })
        .fail(err => {
            showErr(err)
        })
        .always(_ => {
            $('#loginEmail').val("")
            $('#loginPassword').val("")

        })
}

function registerForm(event) {
    event.preventDefault();
    const email = $('#registerEmail').val()
    const password = $('#registerPassword').val()

    $.ajax({
        method:'POST',
        url: `${baseUrl}/register`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        Swal.fire(
            'Good job!',
            `${response.email} telah ditambahkan`,
            'success'
            )
            menuLogin()
    })
    .fail(err => {
        showErr(err)
    })
    .always(_ => {
        $('#registerEmail').val("")
        $('#loginPassword').val("")
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
        url :`${baseUrl}/todos`,
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
        showErr(err)
    })
    .always(_ => {
        $('#inputTitle').val('')
        $('#inputDescription').val('')
        $('#inputStatus').val('')
        $('#inputDueDate').val('')
    })
}

function deleteTodo(id) {

    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: 'delete',
        headers: {
            acces_token: localStorage.getItem('acces_token')
        }
    })
    .done(response => {
        
        menuList()
    })
    .fail(err => {
        showErr(err)
    })
}

// function updateTodo(id) {
//     $('#updateTodos').submit(even =>{
//         even.preventDefault()
//         const UserId = todo[0].UserId
//         const title = $('#updateTitle').val(todo[0].title)
//         const description =  $('#updateDescription').val(todo[0].description)
//         const status = $('#updateStatus').val(todo[0].status)
//         const due_date = $('#updateDueDate').val(todo[0].due_date)

//         $.ajax({
//             url: `${baseUrl}/todos/${id}`,
//             method: "put",
//             data: {
//                 title,description,status,due_date,UserId
//             },
//             headers: {
//                 acces_token: localStorage.getItem('acces_token')
//             }
//         })
//         .done(response => {
    
//             Swal.fire(
//                 'Good job!',
//                 `${response.title} telah diedit`,
//                 'success'
//               )
//             menuList()
//         })
//         .fail(err =>{
//             console.log(err)
//         })
//     }) 
// }

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token)

    $.ajax({
        method: 'POST',
        url:`${baseUrl}/googleLogin`,
        headers:{google_access_token}
    })
    .done(response => {
        Swal.fire(
            'Good job!',
            `${response.email} telah login`,
            'success'
            )

        localStorage.setItem('acces_token',response.acces_token)
        localStorage.setItem('email_user',response.email)
        // localStorage.setItem('avatar',response.avatar)
        $('#email_user').text('Welcome' + localStorage.email_user)
        // $('#avatar_user').text('Welcome' + localStorage.avatar)

        initContent()
        menuList()
        afterLogin()
    })
    .fail(err => {
        showErr(err)
    })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
        console.log("User Signed Out")
    })
}

function weathers (e) {
    e.preventDefault()
    const kota = $('#searchCity').val()
    
    $.ajax({
        url: `${baseUrl}/weathers?city=${kota}`,
        method: "get"

    })
    .done(response => {
        console.log(response, "<<<<<<<<<<<< hasil weathers")

        $('#weather').text(`Welcome ${kota}, Observasi Pukul: ${response.current.observation_time}, Suhu: ${response.current.temperature} derajat, result: ${response.current.weather_descriptions[0]}`)
    })
    .fail(err => {
        showErr(err)
    })

    $('#searchCity').val('')
}

function showErr(err) {
    // console.log(err.responseJSON.errors)
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors.join(',')                
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
    // weathers()
    $('#submitWeather').submit(weathers)
})
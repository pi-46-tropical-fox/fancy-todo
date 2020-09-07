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
        // console.log(response)
        todo = response
        response.forEach(el => {

            $('#tableTodo').append(`
            <tr>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</th>
                <td>${tgl(el.due_date)}</td>
                <td><button onclick="deleteTodo(${el.id})" type="button" class="btn btn-danger">Delete</button> <button onclick="showIdTodo(${el.id})" type="button" class="btn btn-primary">Update</button></td>
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
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${baseUrl}/todos/${id}`,
                method: 'DELETE',
                headers: {
                    acces_token: localStorage.getItem('acces_token')
                }
            })
            .done(response => {
                // console.log(response)
                Swal.fire(
                    'Deleted!',
                    `${response.message}`,
                    'success'
                  )
                menuList()
            })
            .fail(err => {
                showErr(err)
            })
              
        }
      })
    
}

function showIdTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: 'GET',
        headers: {
            acces_token: localStorage.getItem('acces_token')
        }
    })
    .done(data => {
        // console.log(data)
        $('#form-update-todo').empty()
        $('#form-update-todo').append(`
        <div class="row">
          <div class="col-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">Update Todo</h5>
                <form id="updateTodos" onsubmit="updateTodo(event,${data.id})">
                  <div class="form-group row">
                    <label for="updateTitle" class="col-sm-3 col-form-label">Title</label>
                    <div class="col-sm-9">
                      <input type="text" name="" id="updateTitle" class="form-control" value="${data.title}">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="updateDescription" class="col-sm-3 col-form-label">Description</label>
                    <div class="col-sm-9">
                      <input type="text" name="" id="updateDescription" class="form-control" value="${data.description}">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="updateStatus" class="col-sm-3 col-form-label">Status</label>
                    <div class="col-sm-9">
                    <select class="form-control" id="updateStatus" value="${data.status}">
                      <option>True</option>
                      <option>False</option>
                      </select>
                      </div>
                  </div>
                  <div class="form-group row">
                    <label for="updateDueDate" class="col-sm-3 col-form-label">Due Date</label>
                    <div class="col-sm-9">
                      <input type="date" name="" id="updateDueDate" class="form-control" value="${tgl(data.due_date)}">
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        
        
        `)
    })
    .fail(err => {
        // console.log(err)
        showErr(err)
    })
}
function updateTodo(event,id) {
    event.preventDefault();
    const title = $('#updateTitle').val()
    const description = $('#updateDescription').val()
    const status = $('#updateStatus').val()
    const due_date = $('#updateDueDate').val()
    

    $.ajax({
        method: 'PUT',
        url :`${baseUrl}/todos/${id}`,
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
        // console.log(response)
        Swal.fire(
            'Good job!',
            `${response.message}`,
            'success'
          )
        menuList()
        $('#form-update-todo').hide()
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

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token)

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
        Swal.fire(
            'You Sign Out!',
            'success'
          )
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
        // console.log(response, "<<<<<<<<<<<< hasil weathers")

        $('#weather').text(`Welcome ${kota.toUpperCase()}, Observasi Pukul: ${response.current.observation_time}, Suhu: ${response.current.temperature} derajat, result: ${response.current.weather_descriptions[0]}`)
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
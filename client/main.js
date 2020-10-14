// const {OAuth2Client} = require('google-auth-library')
const port = 3000

// function google sign in
function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    
    // send google token ke back end
    $.ajax ({
        method:'POST',
        url : 'http://localhost:3000/users/googleLogin',
        headers: {google_token}
    })
    .done( response => {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('username', response.username)
        mainMenu()        
    })
    .fail( err => {
        console.log(err)
    })
    
}

// function google sign out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


function registerMenu(event){
    $('#home').hide()
    $('#login').hide()
    $('#register').show()
    $('#main').hide()
    $('#edit').hide()
    $('#add').hide()
}

function editMenu (event){
    $('#home').hide()
    $('#register').hide()
    $('#main').hide()
    $('#edit').show()
    $('#add').hide()
    
}

function addMenu (event){
    $('#home').hide()
    $('#register').hide()
    $('#main').hide()
    $('#edit').hide()
    $('#add').show()
    
}

function mainMenu (event){
    $('#home').hide()
    $('#login').hide()
    $('#register').hide()
    $('#main').show()
    $('#edit').hide()
    $('#add').hide()
    $('#logedEmail').empty()
    $('#todos').empty()
    
    if(localStorage.getItem('username')){
        $('#logedEmail').append(`
        <h5 class="card-text">Welcome : ${localStorage.getItem('username')}</h5>
        `)
    }

    $.ajax({
        method: "GET",
        url: `http://localhost:${port}/quotes`,
        
    })

        .done(response => {
            $('#quotes2').empty()

            $('#quotes2').append(`
                <h5 class="card-title">Quote of the day</h5>
                <p class="card-text">${response.quoteText}</p>
                <p class="card-text"><small class="text-dark">--${response.quoteAuthor}--</small></p>
            `)

        })

        .fail(err => {
            console.log(err)
        })
    


    $.ajax({
        method: "GET",
        url: `http://localhost:${port}/todos`,
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })

        .done(response => {
            console.log(response, '<<<<<---------- ini response')
            

            response.forEach( (element,index) => {
                $('#todos').append(`
                    <tr>
                        <th scope="row">${++index}</th>
                        <td>${element.title}</td>
                        <td>${element.description}</td>
                        <td>${element.due_date.split('T')[0]}</td>
                        <td><p class="badge badge-secondary">${element.status}</p></td>
                        <td><a href='#' data-id= ${element.id} class="badge badge-info" onclick="editClick(event)">Edit</a> <a href='#' data-id= ${element.id} class="badge badge-danger" onclick="deleteClick(event)" id="delete">Delete</a></td>
                    </tr>
                `)
            })
        })

        .fail(err => {
            let errors = err.responseJSON.errors
            console.log(errors)
            $('#errorMessageShowTodo').empty()

            errors.forEach(error => {
                $('#errorMessageShowTodo').append(`
                    <h5 class="text-danger">${error}</h5>
                `)
            })
        })
    
}

function editClick(event) {
    event.preventDefault()
    console.log(event.srcElement.dataset.id)
    localStorage.setItem('todoId', event.srcElement.dataset.id)
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })

        .done( response => {
            console.log(response)
            editMenu()
            $('#editForm').empty()

            $('#editForm').append(`
                <div class="errorMessageEdit" id="errorMessageEdit">
                    <!-- <p>message</p> -->
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control" id="editTitle" value="${response.title}">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" name="description" class="form-control" id="editDescription" value="${response.description}">
                </div>
                <div class="form-group">
                    <label for="due_date">Due_date</label>
                    <input type="date" name="due_date" class="form-control" id="editDue_date" value="${response.due_date.split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                    <select class="form-control" id="editStatus">
                        <option name="false">False</option>
                        <option name="true">True</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary"  >Edit</button>
            
            `)
            
        })

        .fail( err => {
            console.log(err)
        })
}

function deleteClick(event) {
    event.preventDefault()

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
                method: 'DELETE',
                url: `http://localhost:3000/todos/${event.srcElement.dataset.id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .done(response => {
                console.log(response)
                mainMenu()
            })
            .fail(err => {
                console.log(err)
            })
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
  })
}

function logoutMenu (event){
    $('#home').show()
    $('#register').hide()
    $('#main').hide()
    $('#edit').hide()
    $('#add').hide()
    localStorage.clear()
    

    $.ajax({
        method: "GET",
        url: `http://localhost:${port}/quotes`,
        
    })

        .done(response => {
            $('#quotes').empty()

            $('#quotes').append(`
                <h5 class="card-title">Quote of the day</h5>
                <p class="card-text">${response.quoteText}</p>
                <p class="card-text"><small class="text-dark">--${response.quoteAuthor}--</small></p>
            `)

        })

        .fail(err => {
            console.log(err)
        })
    
    signOut()


}


$(document).ready( ()=> {
    if(localStorage.getItem('access_token')) {
        mainMenu()
    } else {
        logoutMenu()
    }

    $('#loginButton').click(logoutMenu)
    $('#registerButton').click(registerMenu)
    $('#logoutButton').click(logoutMenu)
    $('#addButton').click(addMenu)

    $('#loginForm').submit(function (event) {
        event.preventDefault()
        const email = $('#email').val()
        const password = $('#password').val()

        $.ajax({
            method: 'POST',
            url: `http://localhost:${port}/login`,
            data: { email, password }
        })
            .done((response)=> {
                $('#email').val('')
                $('#password').val('')
                localStorage.setItem('access_token', response.access_token)
                localStorage.setItem('username', response.username)
                mainMenu()
            })
            .fail((err) => {
                
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Username or Password!',
                
                })

                let errors = err.responseJSON.errors
                console.log(errors)
                $('#errorMessageLogin').empty()

                errors.forEach(error => {
                    $('#errorMessageLogin').append(`
                        <h5 class="text-danger">${error}</h5>
                    `)
                })
            })

    })

    $('#registerForm').submit(function (event) {
        event.preventDefault()
        const username = $('#registerName').val()
        const email = $('#registerEmail').val()
        const password = $('#registerPassword').val()

        $.ajax({
            method: 'POST',
            url: `http://localhost:${port}/register`,
            data: { username, email, password }
        })
            .done((response)=> {
                $('#registerName').val('')
                $('#email').val('')
                $('#password').val('')
                logoutMenu()
                Swal.fire(
                    'Congratulation!',
                    'You have already registered!',
                    'success'
                  )
            })
            .fail((err) => {
                let errors = err.responseJSON.errors
                console.log(errors)
                $('#errorMessageRegister').empty()

                errors.forEach(error => {
                    $('#errorMessageRegister').append(`
                        <h5 class="text-danger">${error}</h5>
                    `)
                })
            })
    })

    $('#addForm').submit(function (event) {
        event.preventDefault()
        const title = $('#title').val()
        const description = $('#description').val()
        const due_date = $('#due_date').val()

        $.ajax({
            method: 'POST',
            url: `http://localhost:${port}/todos`,
            data: { title, description, due_date },
            headers: { access_token : localStorage.getItem('access_token')}
        })
            .done((response)=> {
                $('#title').val('')
                $('#description').val('')
                $('#due_date').val('')
                mainMenu()
            })
            .fail((err) => {
                let errors = err.responseJSON.errors
                console.log(errors)
                $('#errorMessageAdd').empty()

                errors.forEach(error => {
                    $('#errorMessageAdd').append(`
                        <h5 class="text-danger">${error}</h5>
                    `)
                })
            })


    })

    $('#editForm').submit(function (event) {
        event.preventDefault()
        const title = $('#editTitle').val()
        const description = $('#editDescription').val()
        const due_date = $('#editDue_date').val()
        const status = $('#editStatus').val()
        $.ajax({
            method: 'PUT',
            url: `http://localhost:${port}/todos/${localStorage.getItem('todoId')}`,
            data: { title, description, due_date, status },
            headers: { access_token : localStorage.getItem('access_token')}
        })
            .done((response)=> {
                mainMenu()
            })
            .fail((err) => {
                let errors = err.responseJSON.errors
                console.log(errors)
                $('#errorMessageEdit').empty()

                errors.forEach(error => {
                    $('#errorMessageEdit').append(`
                        <h5 class="text-danger">${error}</h5>
                    `)
                })
            })


    })

    
})
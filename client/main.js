const baseURL = `https://fancytodo-porto.herokuapp.com`

function hideAll() {
    $('#home').hide()
    $('#login-form, .login-form').hide();
    $('#register-form, .register-form').hide();
    $('#todo-card').hide();
    $('#logout').hide();
    $('#add-new').hide();
    $('.username-viewer').hide();
    $('#nothing').hide()
}

function before() {
    hideAll()

    $('#home').show()
}

function after() {
    hideAll()
    $('#add-new').show();
    $('#todo-card').show();
    $('#logout').show();
    $('.username-viewer').show();
    logged_in()
}

function logged_in() {
    $('#username').text(`${localStorage.email}`)
    $.ajax({
        method: 'GET',
        url: `${baseURL}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        $('#todo-card').empty()
            if (response.length != 0) {
                $('#nothing').hide();
                response.forEach(element => {
                    $('#todo-card').append(`
                    <div class="card col-sm-3 mx-3 my-4" style="width: 18rem;">
                         <div class="card-body">
                               <h5 class="card-title">${element.title}</h5>
                               <p class="card-text">${element.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Initialized: ${element.createdAt.split('T')[0]}</li>
                            <li class="list-group-item">Due Date: ${element.due_date}</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" onclick="deleteCard(event)" class="card-link finish" data-id='${element.id}'>Finish Task</a> <br> <hr>
                            <a href="#" data-toggle="modal" data-target="#exampleModal" class="card-link edit" data-id='${element.id}'>Edit Task</a> <br> <hr>
                            <a href="#" onclick="seeRelatedArticles(event)" class="card-link" data-id='${element.id}' data-toggle="modal" data-target="#exampleModalLong">See Related Articles</a>
                        </div>
                    </div>`)
                });
            } else {
                $('#nothing').show()
            }

        })
        .fail(err => {
            console.log(err)
        })
}

function register(event) {
    event.preventDefault();
    const email = $('#register-email').val(),
        password = $('#register-password').val(),
        username = $('#register-username').val()
    $.ajax({
            method: 'POST',
            url: `${baseURL}/register`,
            data: {
                email,
                password,
                username
            }
        })
        .done(response => {
            Swal.fire(
                'Good job!',
                'Your account is now registered!\n Please login.',
                'success'
            );
            hideAll();
            $('#login-form, .login-form').show();
        })
        .fail(err => {
            let parsedError = JSON.parse(err.responseText)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${parsedError.errors[0]}`
            })
        }).always(() => {
            $('#register-email').val('');
            $('#register-password').val('');
            $('#register-username').val('');
        })

}

function login(event) {
    event.preventDefault();
    const email = $('#login-email').val(),
        password = $('#login-password').val();
    $.ajax({
            method: 'POST',
            url: `${baseURL}/login`,
            data: {
                email,
                password
            }
        })
        .done(response => {
            console.log(response)
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('email', response.user.email);

            after();
        })
        .fail(err => {
            let parsedError = JSON.parse(err.responseText)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${parsedError.errors[0]}`
            })
        })
        .always(() => {
            $('#login-email').val('');
            $('#login-password').val('');
        })
};
//==========================================
//GOOGLE SIGN IN
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());
    // The ID token you need to pass to your backend:
    var google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${baseURL}/googleLogin`,
        headers: { google_access_token }
    }).done(response => {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('email', response.googleData.email);
        after()
    }).fail(err => {
        console.log(err)
    })
}
//GOOGLE SIGN OUT
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}
//==========================================

function deleteCard(event) {
    Swal.fire({
        title: 'Have you finished?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, i have!'
    }).then((result) => {
        if (result.value) {
            const id = event.srcElement.dataset.id
            $.ajax({
                    method: 'DELETE',
                    url: `${baseURL}/todos/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .done(response => {
                    after()
                })
                .fail(err => {
                    console.log(err)
                })
            Swal.fire(
                'Done!',
                'Thank you for doing such a great work!',
                'success'
            )
        }

    })

}
// EDIT
$('#exampleModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget)
    targetId = button.data('id')
});
let targetId;
$('#updateData').click((event) => {
    editCard(event, targetId)
})
// EDIT

function editCard(event, id) {
    $('#exampleModal').modal('toggle');
    event.preventDefault()
    const message = {
        title: $('.modal-body #title').val(),
        description: $('.modal-body #description').val(),
        due_date: $('.modal-body #due_date').val(),
        status: $('.modal-body #status').val()
    }
    console.log(id)
    $.ajax({
            method: 'PUT',
            url: `${baseURL}/todos/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            contentType: 'application/json',
            data: JSON.stringify(message)
        })
        .done(response => {
            console.log(response, '<<berhasil edit di main.js')
            after()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Date is invalid`
            })
        })
        .always(() => {
            $('.modal-body #title').val('')
            $('.modal-body #description').val('')
            $('.modal-body #due_date').val('')
            $('.modal-body #status').val('')
        })
}

function addCard() {
    const message = {
        title: $('.modal-body #title-add').val(),
        description: $('.modal-body #description-add').val(),
        due_date: $('.modal-body #due_date-add').val(),
        status: $('.modal-body #status-add').val()
    }
    $.ajax({
            method: 'POST',
            url: `${baseURL}/todos`,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            contentType: 'application/json',
            data: JSON.stringify(message)
        })
        .done(response => {
            console.log(response)
            after()
        })
        .fail(err => {
            let parsedError = JSON.parse(err.responseText)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${parsedError.errors[0]}`
            })
        })
        .always(() => {
            $('.modal-body #title-add').val('')
            $('.modal-body #description-add').val('')
            $('.modal-body #due_date-add').val('')
            $('.modal-body #status-add').val('')
        })
}

function seeRelatedArticles(event) {
    const id = event.srcElement.dataset.id
    $.ajax({
            method: 'GET',
            url: `${baseURL}/todos/articles/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response)

            response.data.forEach(article => {
                $('#modal-articles').append(
                    `<h4>Title: ${article.Title}</h4>
                    <hr>
                    <p>
                    ${article.snippet}
                     </p>
                    <hr>
                    <a href="${article.link}">
                        Go here
                    </a>
                    <hr></hr>`)
            })
            after()
        })
        .fail(err => {
            console.log(err)
        })
};

//=============================================
$(document).ready(() => {
    if (localStorage.getItem('access_token')) {
        after()
    } else {
        before();
    }
    //=====================
    $('#nav-home').click(() => {
        hideAll();
        $('#home').show()
    });
    $('#login').click(() => {
        hideAll();
        $('#login-form, .login-form').show();
    })
    $('#register, #click-register-button').click(() => {
        hideAll();
        $('#register-form, .register-form').show();
    });
    $('#logout').click(() => {
        $('#username').text(``)
        localStorage.clear()
        signOut()
        before()
    });
    //===================================
    $('#login-form').submit(login);
    $('#register-form').submit(register);
    //===================================
    //CRUD
    //CREAD DONE
    //READ DONE
    //DELETE DONE
   
    
})
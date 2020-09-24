const localHost = `https://fancy-todo-app-juan.herokuapp.com`

const showLogin = (event) => {
    $(`#show-login`).show()
    $(`#show-register`).hide()
    $(`#show-home`).hide()
}
const showRegister = (event) => {
    $(`#show-login`).hide()
    $(`#show-register`).show()
    $(`#show-home`).hide()
}
const showHome = (event) => {
    $(`#show-login`).hide()
    $(`#show-register`).hide()
    $(`#show-home`).show()

    $(`#profile-username`).empty()
    $(`#profile-username`).append(`<p>${localStorage.username}</p>`)

    $(`#show-home-list`).empty()
    if(localStorage.isGoogle){
        $(`#google-logout-btn`).show()
        $(`#app-logout-btn`).hide()
    } else {
        $(`#google-logout-btn`).hide()
        $(`#app-logout-btn`).show()
    }

    $.ajax({
        method: `GET`,
        url: `${localHost}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        response.data.forEach(datum => {
            let date
            if(datum.due_date !== null){
                date = datum.due_date.split("T")[0]
            }
            let isFinish;
            datum.status === "true" && (isFinish = `Done`)
            datum.status === "false" && (isFinish = `On Progress`)
            $("#show-home-list").append(`
                <div class="table-list" id="show-home-list">
                <div class="list-head">
                    <span>${datum.title}</span>
                </div>
                <div class="list-head">
                    ${datum.description}
                </div>
                <div class="list-head">
                    ${isFinish}
                </div>
                <div class="list-head">
                    ${date}
                </div>
                <div class="list-head">
                <a href="#" data-id="${datum.id}" onClick="editTodo(event)">Edit</a> | <a href="#" data-id="${datum.id}" onClick="deleteTodo(event)">Del</a> 
                </div>
                </div>
            `)
        });
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const validateLogin = (event) => {
    // $(`#app-logout-btn`).show()
    const username = $(`#login-username`).val()
    const password = $(`#login-password`).val()
    $(`#login-username`).val(``)
    $(`#login-password`).val(``)
    $.ajax({
        method: `POST`,
        url: `${localHost}/users/login`,
        data: {
            username,
            password
        }
    })
    .done(response => {
        localStorage.setItem(`access_token`, response.token)
        localStorage.setItem(`username`, username)
        if(localStorage.access_token){
            showHome()
        }
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const validateRegister = (event) => {
    const username = $(`#register-username`).val()
    const email = $(`#register-email`).val()
    const password = $(`#register-password`).val()
    $.ajax({
        method: `POST`,
        url: `${localHost}/users/register`,
        data: {
            username,
            email,
            password
        }
    })
    .done(response => {
        showLogin()
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const addTodo = () => {
    const title = $(`#add-title`).val()
    const description = $(`#add-description`).val()
    const due_date = $(`#add-due-date`).val()
    $(`#add-title`).val(``)
    $(`#add-description`).val(``)
    $(`#add-due-date`).val(``)
    $.ajax({
        method: `POST`,
        url: `${localHost}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(response => {
        let date
            if(response.data.due_date !== null){
                date = response.data.due_date.split("T")[0]
            }
        let isFinish;
        response.data.status === "true" && (isFinish = `Done`)
        response.data.status === "false" && (isFinish = `On Progress`)
        showHome()
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const editTodo = (event) => {
    event.preventDefault()
    $(`#edit-form`).empty()
    $.ajax({
        method: `GET`,
        url: `${localHost}/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        let date = response.data.due_date.split("T")[0]
        localStorage.setItem(`todoId`, response.data.id)
        $(`#edit-form`).append(`
            <form id="edit-todo">
                <input type="text" name="title" value="${response.data.title}" class="add-review-input" id="edit-title"><br>
                <input type="text" name="description" value="${response.data.description}" class="add-review-input" id="edit-description"><br>
                <input type="date" name="due_date" value="${date}" class="add-review-textarea" id="edit-due-date"></textarea><br>
                <button class="btn" onClick="saveEditTodo(event)">Edit Todo</button>
            </form>
        `)
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const deleteTodo = (event) => {
    $.ajax({
        method: `DELETE`,
        url: `${localHost}/todos/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        showHome()
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const saveEditTodo = (event) => {
    const title = $(`#edit-title`).val()
    const description = $(`#edit-description`).val()
    const due_date = $(`#edit-due-date`).val()
    $(`#edit-title`).val(``)
    $(`#edit-description`).val(``)
    $(`#edit-due-date`).val(``)

    $.ajax({
        method: `PUT`,
        url: `${localHost}/todos/${localStorage.getItem(`todoId`)}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title, description, due_date
        }
    })
    .done(response => {
        console.log(`response`)
        showHome()
    })
    .catch(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

const showApi = () => {
    $.ajax({
        method: "GET",
        url: `${localHost}/movies`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        console.log(response.data.Search)
        response.data.Search.forEach(datum => {
            $(`#cards-movie`).append(`
                <img src="${datum.Poster}" alt="ini gambar">
                <p>Title: ${datum.Title}</p>
                <p>Year: ${datum.Year}</p>
            `)    
        })
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

function onSignIn(googleUser) {
    // $(`#google-logout-btn`).show()
    // $(`#app-logout-btn`).hide()
    const google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: `${localHost}/users/google/login`,
        headers: {
            google_access_token
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem(`access_token`, response.access_token)
        localStorage.setItem(`username`, response.username)
        localStorage.setItem(`isGoogle`, true)
        showHome()
    })
    .fail(err => {
        Swal.fire({
            icon: "error",
            titleText: "Validation error",
            html: err.responseJSON.errors.join("<br/>"),
        });
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    showLogin()
}

$(document).ready(() => {
    // $(`#google-logout-btn`).hide()
    // $(`#app-logout-btn`).hide()
    if(!localStorage.access_token){
        showLogin()
    } else {
        showHome()
    }

    //Login
    $(`#login-form`).submit(event => {
        event.preventDefault()
        validateLogin()
    })
    $(`#login-to-register`).click(event => {
        event.preventDefault()
        showRegister()
    })

    //Register
    $(`#register-to-login`).click(event => {
        event.preventDefault()
        showLogin()
    })
    $(`#login-form`).submit(event => {
        event.preventDefault()
        validateLogin()
    })
    $(`#register-form`).submit(event => {
        event.preventDefault()
        validateRegister()
    })

    //Home
    //Logout
    $(`#logout-button`).submit(event => {
        event.preventDefault()
        localStorage.clear()
        
        showLogin()
    })

    //Show todo
    $(`#add-todo`).hide()
    $(`#show-add-todo`).click(event => {
        event.preventDefault()
        $(`#add-todo`).show()
        $(`#show-add-todo`).hide()
    })

    //Add todo
    $(`#add-todo`).submit(event => {
        event.preventDefault()
        addTodo()
        $(`#add-todo`).hide()
        $(`#show-add-todo`).show()
    })

    //Show Api
    $(`#movie-api`).click(event => {
        event.preventDefault()
        showApi()
    })
})
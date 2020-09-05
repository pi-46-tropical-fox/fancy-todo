function home (event) {
    $('#home').show();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
}

function login (event) {
    $('#home').hide();
    $('#form-login').show();
    // $('#form-login').empty();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
}

function logout (event) {
    $('#home').hide();
    $('#form-login').show();
    $('#form-register').show();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').show();
}

function register (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').show();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
}

function todoList (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').show();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#todo-task').empty()

    $.ajax ({
        method : "GET",
        url : "http://localhost:3000/todos",
        headers : {
            token : localStorage.getItem ("token")
        }
    })
        .done ((res) => {
            // console.log (res)
            res.forEach (el =>{
                $("#todo-task").append (`
                <div class="col-3">
          <div class="card">
            <img src="./assets/img/todo1.png" class="card-img-top" alt="Todo Task">
            <div class="card-body">
              <h5 class="card-title">Task : ${el.title}</h5>
              <p class="card-text">Description : ${el.description}</p>
              <p class="card-text">Status : ${el.status}</p>
              <p class="card-text">Due Date : ${el.due_date.split ("T")[0]}</p>
            </div>
          </div>           
              `)
            })
            
        })
        .fail ((err) => {
            console.log (err)
        })
}

function todoAdd (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').show();
    $('#logout-page').hide();
}

function logout (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').show();
    beforeLogin ()
    localStorage.clear ()
    localStorage.removeItem ('token')
}

function beforeLogin () {
    $('#nav-home').show ()
    $('#nav-login').show ()
    $('#nav-register').show ()
    $('#nav-todo').hide ()
    $('#nav-addTodo').hide ()
    $('#nav-logout').hide ()
}

function afterLogin () {
    $('#nav-home').show ()
    $('#nav-login').hide ()
    $('#nav-register').hide ()
    $('#nav-todo').show ()
    $('#nav-addTodo').show ()
    $('#nav-logout').show ()
}

function loginForm (event) {
    event.preventDefault ()

        const email = $("#email-login").val ();
        const password = $("#password-login").val ();
        // console.log (email, password)

        $.ajax ({
            method : "POST",
            url : "http://localhost:3000/users/login",
            data : {
                email,
                password
            }
        })
    
        .done ((res) => {
            $("#email-login").val ()
            $("#password-login").val ()

            localStorage.setItem("token", res.token)
            // console.log (res)
            home ()
            afterLogin ()
        })
    
        .fail ((err) => {
            console.log (err)
        })

}

function registerForm (event) {
    event.preventDefault ()

        const username = $("#username").val ();
        const email = $("#email-register").val ();
        const password = $("#password-register").val ();
        // console.log (email, password)

        $.ajax ({
            method : "POST",
            url : "http://localhost:3000/users/register",
            data : {
                username,
                email,
                password
            }
        })
    
        .done ((res) => {
            $("#username").val ()
            $("#email-register").val ()
            $("#password-register").val ()

            // localStorage.setItem("token", res.token)
            // console.log (res)
            home ()
        })
    
        .fail ((err) => {
            console.log (err)
        })

}


$(document).ready(() => {
    if (localStorage.getItem ("token")) {
        afterLogin ()
        home ()

    } else {
        beforeLogin ()
        home ()
    }  

    // beforeLogin ()
    // home ()

    $('#nav-home').click (home)
    $('#nav-login').click (login)
    $('#nav-register').click (register)
    $('#nav-todo').click (todoList)
    $('#nav-addTodo').click (todoAdd)
    $('#nav-logout').click (logout)
    $('#loginForm').submit (loginForm)
    $('#registerForm').submit (registerForm)

})
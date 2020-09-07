function home (event) {
    $('#home').show();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#publicHoliday_list').hide();
    // $('#publicHoliday_list').empty()
    $('#longWeekend_list').hide();
    // $('#longWeekend_list').empty();
}

function login (event) {
    $('#home').hide();
    $('#form-login').show();
    // $('#form-login').empty();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#publicHoliday_list').hide();
    $('#longWeekend_list').hide();
}

function logout (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').show();
    $('#publicHoliday_list').hide();
    $('#longWeekend_list').hide();
    beforeLogin ()
    localStorage.clear ()
    localStorage.removeItem ('token')
    signOut()
}

function register (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').show();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#publicHoliday_list').hide();
    $('#longWeekend_list').hide();
}

function todoList (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').show();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#todo-task').empty()
    $('#publicHoliday_list').hide();
    $('#longWeekend_list').hide();

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
            <img src="./assets/img/training_1.svg" class="card-img-top" alt="Todo Task">
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
    $('#publicHoliday_list').hide();
    $('#longWeekend_list').hide();

}

function beforeLogin () {
    $('#nav-home').show ()
    $('#nav-calendar').show ()
    $('#nav-long-weekends').show ()
    $('#nav-login').show ()
    $('#nav-register').show ()
    $('#nav-todo').hide ()
    $('#nav-addTodo').hide ()
    $('#nav-logout').hide ()
}

function afterLogin () {
    $('#nav-home').show ()
    $('#nav-calendar').show ()
    $('#nav-long-weekends').show ()
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

function onSignIn(googleUser) {
    var google_id_token = googleUser.getAuthResponse().id_token;
    // console.log (google_id_token)

    $.ajax ({
        method : "POST",
        url : "http://localhost:3000/users/googleLogin",
        headers : {google_id_token}
    })

    .done (res => {
        // console.log (res)
        localStorage.setItem ("token", res.token)
        // localStorage.setItem ("usernameAccount", res.given_name)
        // console.log (localStorage.token)

        // $("#username_account").text (localStorage.usernameAccount)
        home ()
        afterLogin ()
        home ()
    })

    .fail (err => {
        console.log (err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function addTask (event) {
    event.preventDefault ()

    const title = $("#title").val ()
    const description = $("#description").val ()
    const status = $("#status").val ()
    const due_date = $("#due_date").val ()

    $.ajax ({
        method : "POST",
        url : "http://localhost:3000/todos",
        headers : {
            token : localStorage.getItem ("token")
        },
        data : {
            title,
            description,
            status,
            due_date
        }
    })

    .done ((res) => {
        $("#title").val ()
        $("#title").val ()
        $("#title").val ()
        $("#title").val ()

        todoList ()
    })

    .fail ((err) => {
        console.log (err)
    })



}

function publicHoliday_list (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#publicHoliday_list').show();
    $('#publicHoliday').empty()
    $('#longWeekend_list').hide();

    $.ajax ({
        method : "GET",
        url : "http://localhost:3000/calendars/holidays2020",
        
    })
        .done ((res) => {
            console.log (res)
            res.forEach (el =>{
                $("#publicHoliday").append (`
                <div class="col-3">
          <div class="card">
            <img src="./assets/img/holiday_2.svg" class="card-img-top" alt="Public Holiday>
            <div class="card-body">
              <h5 class="card-title">Hari : ${el.localName}</h5>
              <p class="card-text">Tanggal: ${el.date}</p>
            </div>
          </div>
          <br><br>           
              `)
            })
            
        })
        .fail ((err) => {
            console.log (err)
        })
}

function longWeekend_list (event) {
    $('#home').hide();
    $('#form-login').hide();
    $('#form-register').hide();
    $('#todo-list').hide();
    $('#todo-add').hide();
    $('#logout-page').hide();
    $('#publicHoliday_list').hide();
    $('#longWeekend_list').show();
    $('#longWeekend').empty();

    $.ajax ({
        method : "GET",
        url : "http://localhost:3000/calendars/longweekends2020",
        
    })
        .done ((res) => {
            // console.log (res)
            res.forEach (el =>{
                $("#longWeekend").append (`
                <div class="col-3">
          <div class="card">
            <img src="./assets/img/holiday_1.svg" class="card-img-top" alt="Long Weekend>
            <div class="card-body">
              <p class="card-text">Tanggal Mulai: ${el.startDate}</p>
              <p class="card-text">Tanggal Akhir: ${el.endDate}</p>
              <p class="card-text">Jumlah Hari: ${el.dayCount}</p>
            </div>
          </div>
          <br><br>           
              `)
            })
            
        })
        .fail ((err) => {
            console.log (err)
        })
}



$(document).ready(() => {
    if (localStorage.getItem ("token")) {
        afterLogin ()
        // $("#username_account").text (localStorage.username-account)
        home ()

    } else {
        beforeLogin ()
        home ()
    }  

    // beforeLogin ()
    // home ()

    $('#nav-home').click (home)
    $('#nav-calendar').click (publicHoliday_list)
    $('#nav-long-weekends').click (longWeekend_list)
    $('#nav-login').click (login)
    $('#nav-register').click (register)
    $('#nav-todo').click (todoList)
    $('#nav-addTodo').click (todoAdd)
    $('#nav-logout').click (logout)
    $('#loginForm').submit (loginForm)
    $('#registerForm').submit (registerForm)
    $("#addTask").submit (addTask)

})
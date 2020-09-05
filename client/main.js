const menuLogin = (event) =>{
    $('.login').show();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

const menuRegister = (event) =>{
    $('.login').hide();
    $('.register').show();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

const menuAdd = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').show();
    $('.edit').hide();
    $('.todo').hide();
}

const menuEdit = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').hide();
    $('.edit').show();
    $('.todo').hide();
}

const menuHome = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').show();

    $.ajax({
        method:"GET",
        url:'http://localhost:3000/todos',
        headers:{
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response) =>{
        console.log(response)
        response.data.forEach(element => {
            $('#todo-list').append(` 
                <div class="card-body" id="todo-list">
                  <h5 class="card-title"> Title:${element.title}</h5>
                  <p class="card-text" >
                    ${element.description}
                  </p>
                  <p class="card-text" >
                    ${element.due_date}
                  </p>
                  <a href="#" class="btn btn-primary" id="edit-todo">Edit</a>
                  <a href="#" class="btn btn-primary" id="delete-todo">Delete</a>
                </div>
            `)
        });
    })
    .fail((err) =>{
        console.log(err)
    })
}

const menuLogout = (event) =>{
    $('.login').show();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
    beforeLogin();
    localStorage.clear();
}

const beforeLogin = (event) =>{
    $('#nav-login').show()
    $('#nav-register').show()
    $('#logout').hide()
    $('#edit-todo').hide()
    $('#add-todo').hide()
}

const afterLogin = (event) =>{
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#logout').show()
    $('#edit-todo').show()
    $('#add-todo').show()
}

const initContent = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

const loginForm = (event) =>{
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    console.log(email,password);
    
    $.ajax({
        method: 'POST',
        url:'http://localhost:3000/users/login',
        data:{
            email,
            password
        }
    })
    .done((response) =>{
        $('#email').val();
        $('#password').val();
        localStorage.setItem('access_token',response.access_token)
        menuHome();
        afterLogin()
        console.log(response)
    })
    .fail((err) =>{
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
      method: "POST",
      url:'http://localhost:3000/users/googleLogin',
      headers:{google_access_token}
  })
  .done((response) =>{
      console.log(response)
      localStorage.setItem('access_token',response.access_token)
      initContent()
      afterLogin()
      menuHome()
  })
  .fail((err) =>{
      console.log(err)
  })

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
const registerForm = (event) =>{
    event.preventDefault()
    const username = $('#username').val()
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    console.log(username, email, password)

    $.ajax({
        method: "POST",
        url:'http://localhost:3000/users/register',
        data:{
            email,
            password,
            username
        }
    })
    .done(response =>{
        menuLogin()
        console.log('test')
        console.log(response)
    })
    .fail( err =>{
        console.log(err)
    })
}

const addList = (event) =>{
    // event.preventDefault()
    const title  = $('#Todo').val()
    const description = $('#description').val()
    const status = false
    const due_date = $('#date').val()

    console.log(title,description,status, due_date)

    $.ajax({
        method : "POST",
        url : "http://localhost:3000/todos/add",
        headers:{
            access_token : localStorage.getItem('access_token')
        },
        data:{
            title,
            description,
            status,
            due_date
        }
    })
    .done(response =>{
        console.log(response);
        afterLogin()
        menuHome()
        
    })
    .fail(err =>{
        console.log(err);
    })
}

$(document).ready(function(){
    initContent()
    if(localStorage.getItem('acces_token')){
        afterLogin()
        menuHome()
    }else{
        beforeLogin()
        menuLogin()
    }

    $('#nav-login').click(menuLogin)
    $('#nav-register').click(menuRegister)
    $('#logout').click(menuLogout)
    $('#edit-todo').click(menuEdit)
    $('#add-todo').click(menuAdd)
    
    // login 
    $('#formLogin').submit(loginForm)

    //register
    $('#formRegister').submit(registerForm)

    //add Todo List
    $('#formAdd').submit(addList)

})
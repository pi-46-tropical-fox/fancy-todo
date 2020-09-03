function loginMenu(event) {
  $("#form-login").show();
  $("#form-register").hide();
  $("#form-add-todo").hide();
  $("#todo-list").hide();
  $("#form-todo-list").hide();
  $("#form-edit-todo").hide();
}

function registerMenu(event) {
  $("#form-login").hide();
  $("#form-register").show();
  $("#form-add-todo").hide();
  $("#todo-list").hide();
  $("#form-todo-list").hide();
  $("#form-edit-todo").hide();
}

function addMenu(event) {
  $("#form-login").hide();
  $("#form-register").hide();
  $("#form-add-todo").show();
  $("#todo-list").hide();
  $("#form-todo-list").hide();
  $("#form-edit-todo").hide();
}

function listMenu(event) {
  $("#form-login").hide();
  $("#form-register").hide();
  $("#form-add-todo").hide();
  $("#todo-list").show();
  $("#form-todo-list").hide();
  $("#form-edit-todo").hide();
  
  $("#your-todo").empty();

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log(response);

      response.forEach((element) => {
        $("#your-todo").append(`
        <div class="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <h6 class="card-text">Due Date: ${element.due_date.split("T")[0]}</h6>
                <p class="card-text">${element.description}</p>
                <p class="card-text">Status: ${element.status ? "Finished" : "Not Yet"}</p>
                <a class="btn btn-dark" href="#" id="card-edit">Edit</a>
                <a class="btn btn-dark" href="#" id="card-delete">Delete</a>
              </div>
            </div>
          </div>
        `)
      });
    })
    .fail((err) => {
      console.log(err);
    })
}

function logoutMenu(event) {
  $("#form-login").show();
  $("#form-register").hide();
  $("#form-add-todo").hide();
  $("#todo-list").hide();
  $("#form-todo-list").hide();
  $("#form-edit-todo").hide();
  localStorage.clear();
  signOut();
  beforeLogin();
}

function initContent(event) {
  $("#form-login").hide();
  $("#form-register").hide();
  $("#form-add-todo").hide();
  $("#todo-list").hide();
  $("#form-todo-list").hide();
  $("#form-edit-todo").hide();
}

function beforeLogin() {
  $("#nav-login").show();
  $("#nav-register").show();
  $("#nav-home").hide();
  $("#nav-add").hide();
  $("#nav-logout").hide();
  $("#email-user").text("");
}

function afterLogin() {
  $("#nav-login").hide();
  $("#nav-register").hide();
  $("#nav-home").show();
  $("#nav-add").show();
  $("#nav-logout").show();
}

function loginForm(event) {
  event.preventDefault();
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/user/login",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      $("#loginEmail").val("");
      $("#loginPassword").val("");
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("email_user", response.email);
      $("#email-user").text("welcome " + localStorage.email_user);
      listMenu();
      afterLogin();
    })
    .fail((err) => {
      console.log(err);
    })
}

function registerForm(event) {
  event.preventDefault();
  const username = $("#registerUsername").val();
  const email = $("#registerEmail").val();
  const password = $("#registerPassword").val();

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/user/register",
    data: {
      username,
      email,
      password
    }
  })
    .done((response) => {
      $("#registerUsername").val("");
      $("#registerEmail").val("");
      $("#registerPassword").val("");
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("email_user", response.email);
      $("#email-user").text("welcome " + localStorage.email_user);
      listMenu();
      afterLogin();
    })
    .fail((err) => {
      console.log(err);
    })
}

function onSignIn(googleUser) {
  // take access_token_google when sign in
  const google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token, "<<<< from onSignIn");

  // verify token in backend
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/user/googleLogin",
    headers: { google_access_token }
  })
    .done((response) => {
      console.log(response);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("email_user", response.email);
      $("#email-user").text("welcome " + localStorage.email_user);
      initContent();
      listMenu();
      afterLogin();
    })
    .fail((err) => {
      console.log(err);
    })
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  // sign out google
  auth2.signOut().then(() => {
    console.log("User sign out");
  });
}

$(document).ready(() => {
  initContent();
  if (localStorage.getItem("access_token")) {
    afterLogin();
    listMenu();
  } else {
    beforeLogin();
    loginMenu();
  }


  $("#nav-login").click(loginMenu);
  $("#nav-register").click(registerMenu);
  $("#nav-home").click(listMenu);
  $("#nav-add").click(addMenu);
  $("#nav-logout").click(logoutMenu);

  $("#loginForm").submit(loginForm);

  $("#registerForm").submit(registerForm);

});
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

let editId = 0; 
function editMenu(event) {
  editId = event.srcElement.dataset.id;
  $("#form-login").hide();
  $("#form-register").hide();
  $("#form-add-todo").hide();
  $("#todo-list").hide();
  $("#form-todo-list").hide();
  $("#form-edit-todo").show();
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
                <a class="btn btn-dark " href="#" id="card-edit" onclick="editMenu(event)" data-id = "${element.id}">Edit</a>
                <a class="btn btn-dark" href="#" onclick="deleteTodo(event)" data-id = "${element.id}">Delete</a>
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

  $("#weather-forecast").empty();
  getWeather();
}

function beforeLogin() {
  $("#errorAlert").hide();
  $("#nav-login").show();
  $("#nav-register").show();
  $("#nav-home").hide();
  $("#nav-add").hide();
  $("#nav-logout").hide();
  $("#email-user").text("");
}

function afterLogin() {
  $("#errorAlert").hide();
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
      console.log(err, "<<<< error in loginForm");
      $("#errorAlert").show()
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
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
      console.log(err, "<<<< errror in registerForm main");
      $("#errorAlert").show();
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
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
      console.log(err, "<<<< error in onSignIn");
      $("#errorAlert").show();
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
    })
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  // sign out google
  auth2.signOut().then(() => {
    console.log("User sign out");
  });
}

function getWeather() {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/thirdparty/weather",
  })
    .done((response) => {
      console.log(response);
      $("#weather-forecast").append(`
        <h5 class="card-title">Today's Weather</h5>
        <h6 class="card-text">${response.location.localtime}<h6>
        <h6 class="card-text">${response.request.query}<h6>
        <h6 class="card-text">Temp: ${response.current.temperature}&#8451; ${response.current.weather_descriptions[0]}</h6>
      `);
    })
    .fail((err) => {
      console.log(err, "<<<< error in getWeather");
      $("#errorAlert").show();
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
    })
}

function addTodo() {
  event.preventDefault();
  const title = $("#addTitle").val();
  const description = $("#addDescription").val();
  const due_date = $("#addDueDate").val();

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/todos",
    data: {
      title,
      description,
      due_date
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log(response);

      $("#addTitle").val("");
      $("#addDescription").val("");
      $("#addDueDate").val("");
      listMenu();
      afterLogin();
    })
    .fail((err) => {
      console.log(err, "<<<< error in addTodo");
      $("#errorAlert").show();
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
    })
}

function editTodo() {
  const id = editId;
  event.preventDefault();
  const title = $("#editTitle").val();
  const description = $("#editDescription").val();
  const status = $("input[name=inlineRadioOptions]").value;
  const due_date = $("#editDueDate").val();

  $.ajax({
    method: "PUT",
    url: `http://localhost:3000/todos/${id}`,
    data: {
      title,
      description,
      status,
      due_date
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log(response);

      $("#editTitle").val("");
      $("#editDescription").val("");
      $("#editDueDate").val("");
      listMenu();
      afterLogin();
    })
    .fail((err) => {
      console.log(err, "<<<< error in editTodo");
      $("#errorAlert").show();
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
    })
}

function deleteTodo(event) {
  console.log(event.srcElement.dataset.id);
  const id = event.srcElement.dataset.id;
  event.preventDefault();

  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log(response);

      listMenu();
      afterLogin();
    })
    .fail((err) => {
      console.log(err, "<<<< error in deleteTodo");
      $("#errorAlert").show();
      err.responseJSON.errors.forEach((error) => {
        $("#errorAlert").append(`
        <p>${error}</p>
        `);
      });
    })
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

  $("#card-edit").click(editMenu);

  $("#loginForm").submit(loginForm);

  $("#registerForm").submit(registerForm);

  $("#addForm").submit(addTodo);

  $("#editForm").submit(editTodo);

});
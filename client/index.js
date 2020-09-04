const url = "http://localhost:1223";

function login() {
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  $("#error-text-login").hide();

  $.ajax({
    method: "POST",
    url: `${url}/login`,
    data: {
      username,
      password,
    },
  })
    .done((res) => {
      localStorage.setItem("access_token", res.access_token);
      console.log(`Login berhasil! Token nya adalah ${res.access_token}`);
      initialize();
    })
    .fail((err) => {
      $("#error-text-login").show();
      $("#error-text-login").html(err.responseJSON.errors.join(","));
    });
}

// Code untuk sign in dengan google
function onSignIn(googleUser) {
  console.log(googleUser);
}

function register() {
  const username = $("#register-username").val();
  const password = $("#register-password").val();
  const email = $("#register-email").val();

  $("#error-text-register").hide();

  $.ajax({
    method: "POST",
    url: `${url}/register`,
    data: {
      username,
      email,
      password,
    },
  })
    .done((res) => {
      console.log(res);
      initialize();
    })
    .fail((err) => {
      $("#error-text-register").show();
      $("#error-text-register").html(err.responseJSON.errors.join(","));
    });
}

function logout() {
  localStorage.removeItem("access_token");
}

function fetchTodos() {
  $.ajax({
    method: "GET",
    url: `${url}/todos`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((res) => {
      console.log(res);
      res.forEach((e) => {
		console.log(e.title);
		
		$('#todo-container').append(`<h1>${e.title}</h1>`)

      });
    })
    .fail((err) => {
      console.log(err);
    });
}

function addTodo() {
  const title = $("#form-todo-title").val();
  const description = $("#form-todo-description").val();
  const due_date = $("#form-todo-due-date").val();

  $.ajax({
    method: "POST",
    url: `${url}/todos`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: {
      title,
      description,
      due_date,
    },
  })
    .done((data) => {
      $("#add-todo-modal").modal("toggle");
      $("#add-todo-form").trigger("reset");
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
    });
}

function initialize() {
  if (localStorage.getItem("access_token")) {
    // Kalo access token sudah ada
    $("#credentials-form").hide();
    $("#main").show();

    fetchTodos();
  } else {
    $("#main").hide();
    $("#credentials-form").show();
  }
}

$(document).ready(() => {
  initialize();

  // Sets the minimal date to today
  $("#form-todo-due-date").attr("min", new Date().toISOString().split("T")[0]);

  $("#add-todo-form").submit((e) => {
    e.preventDefault();
    addTodo();
  });

  $("#login-form").submit((e) => {
    e.preventDefault();
    login();
  });

  $("#register-form").submit((e) => {
    e.preventDefault();
    register();
  });
});

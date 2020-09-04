const url = "http://localhost:1223";

function login() {
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    $("#error-text-login").hide();

    $.ajax({
        method: "POST",
        url: `${url}/login`,
        data: {
            email,
            password,
        },
    })
        .done((res) => {
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("email", res.email);
            localStorage.setItem("username", res.username);

            console.log(`Login berhasil! Token nya adalah ${res.access_token}`);
            initialize();
        })
        .fail((err) => {
            $("#error-text-login").show();
            $("#error-text-login").html(err.responseJSON.errors.join(" ,"));
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
        .done(() => {
            $("#success-text-register").show();

            initialize();
        })
        .fail((err) => {
            $("#error-text-register").show();
            $("#error-text-register").html(err.responseJSON.errors.join(" ,"));
        });
}

function logout() {
    localStorage.removeItem("access_token");
}

function deleteTodo(el) {
    const id = el.attr("data-id");

    $.ajax({
        method: "DELETE",
        url: `${url}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token"),
        },
    })
        .done(() => {
            el.remove();
        })
        .fail((err) => {
            console.error(err);
        });
}

function showUpdateModal(id){
  console.log(`Hello from show update modal ${id}`)
}

function addTodoToView(todo){
  const el = $("<li>")
  .addClass("list-group-item")
  .attr("data-id", todo.id)
  .append(todo.title)

  const delBtn = $("<button>").html("Delete").addClass(["btn", "btn-danger"])
  const updateBtn = $("<button>").html("Update").addClass(["btn", "btn-info"]);

  updateBtn.click(() => showUpdateModal(el))
  delBtn.click(() => deleteTodo(el))

  el.append(delBtn)
  el.append(updateBtn)

  $("#todo-container").append(el);
}

function fetchTodos() {
    $("#todo-container").html("");

    $.ajax({
        method: "GET",
        url: `${url}/todos`,
        headers: {
            access_token: localStorage.getItem("access_token"),
        },
    })
        .done((res) => {
            res.forEach((e) => addTodoToView(e));
        })
        .fail((err) => {
            console.log(err);
        });
}

function logout() {
    localStorage.clear();
    initialize();
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

            addTodoToView(data)
        })
        .fail((err) => {
            console.log(err);
        });
}

function initialize() {
    if (localStorage.getItem("access_token")) {
        // Kalo access token sudah ada
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");

        $("#credentials-form").hide();
        $("#main").show();
        $("#user-dropdown").show();
        $("#user-dropdown-text").html(`${username} (${email})`);

        fetchTodos();
    } else {
        $("#main").hide();
        $("#user-dropdown").hide();
        $("#credentials-form").show();
    }
}

$(document).ready(() => {
    initialize();

    $("#logout-btn").click((e) => {
        e.preventDefault();
        logout();
    });

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

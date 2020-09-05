const url = "http://localhost:3000";

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
            setLoginLocalStorage(res);
            initialize();
        })
        .fail((err) => {
            $("#error-text-login").show();
            $("#error-text-login").html(err.responseJSON.errors.join(" ,"));
        });
}

function setLoginLocalStorage(res) {
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("email", res.email);
    localStorage.setItem("username", res.username);
}

// Code untuk sign in dengan google
function onSignIn(googleUser) {
    const google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: `${url}/googlelogin`,
        headers: { google_access_token },
    })
        .done((res) => {
            setLoginLocalStorage(res);
            initialize();
        })
        .fail(() => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error while signing in with google account!",
            });
        });
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
            fetchTodos();
        })
        .fail(() => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error while deleting todo item!",
            });
        });
}

function updateTodo(el, id) {
    const title = $("#update-form-todo-title").val();
    const description = $("#update-form-todo-description").val();
    const due_date = $("#update-form-todo-due-date").val();
    const status = $("#update-form-todo-status").val();

    $("#error-text-update-todo").hide();

    $.ajax({
        method: "PUT",
        url: `${url}/todos/${id}`,
        data: {
            title,
            description,
            due_date,
            status,
        },
        headers: {
            access_token: localStorage.getItem("access_token"),
        },
    }).done((e) => {
        $("#update-todo-modal").modal("toggle");
        addOrUpdateTodoToView(e, el);
    }).fail(err => {
        $("#error-text-update-todo").show();
        $("#error-text-update-todo").html(err.responseJSON.errors.join(" ,"));
    });
}

function showUpdateModal(el) {
    const id = el.attr("data-id");

    $.ajax({
        method: "GET",
        url: `${url}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token"),
        },
    })
        .done((e) => {
            // Prefill the values
            $("#update-todo-modal").modal("toggle");
            $("#update-form-todo-title").val(e.title);
            $("#update-form-todo-description").val(e.description);
            $("#update-form-todo-due-date").val(new Date(e.due_date).toISOString().substring(0, 10));

            $("#submit-update-todo").unbind();

            $("#submit-update-todo").click((a) => {
                a.preventDefault();
                updateTodo(el, id);
            });
        })
        .fail(() => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error while fetching this todo item!",
            });
        });
}

function addOrUpdateTodoToView(todo, old) {
    let count = $("#todo-container > *").length + 1;

    const el = $("<tr>")
        .attr("data-id", todo.id)
        .append($("<td>").append(count))
        .append($("<td>").append(todo.title))
        .append($("<td>").append(todo.description))
        .append($("<td>").append(new Date(todo.due_date).toDateString()))
        .append($("<td>").append(todo.status));

    const delBtn = $("<button>").html("Delete").addClass(["btn", "btn-danger", "mx-1"]);
    const updateBtn = $("<button>").html("Update").addClass(["btn", "btn-info", "mx-1"]);

    updateBtn.click(() => showUpdateModal(el));
    delBtn.click(() => deleteTodo(el));

    el.append($("<td>").append(delBtn).append(updateBtn));

    if (old) {
        old.replaceWith(el);
    } else {
        $("#todo-container").append(el);
    }
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
            res.forEach((e) => addOrUpdateTodoToView(e));
        })
        .fail((err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error while fetching todos",
            });
        });
}

function shorten(text, len = 50) {
    let splitted = text.split(" ");

    if (splitted.length > len) {
        return splitted.splice(0, len).join(" ") + "...";
    } else {
        return text;
    }
}

function watchMovie(movie) {
    $("#search-movie-modal").modal("toggle");
    $("#movie-container").html("");
    $("#form-movie-title").val("");

    $("#form-todo-title").val(`Watch ${movie.title}`);
    $("#form-todo-description").val(`Watch the movie ${movie.title}\n\n ${movie.infoUrl}`);
}

function findMovie() {
    const query = $("#form-movie-title").val();

    $.ajax({
        method: "GET",
        url: `${url}/movies`,
        headers: {
            access_token: localStorage.getItem("access_token"),
        },
        data: {
            q: query,
        },
    })
        .done((res) => {
            $("#movie-container").html("");

            res.forEach((e) => {
                $("#movie-container").append(
                    $("<tr>")
                        .append($("<td>").append(e.title))
                        .append($("<td>").append($("<img>").attr("src", e.poster_path || "assets/film-poster-placeholder.png")))
                        .append($("<td>").append(shorten(e.overview)))
                        .append($("<td>").append(e.release_date))
                        .append(
                            $("<td>").append(
                                $("<button>")
                                    .append("Watch this")
                                    .addClass(["btn", "btn-primary"])
                                    .click((ev) => {
                                        watchMovie(e);
                                        ev.preventDefault();
                                    })
                            )
                        )
                        .append(
                            $("<td>").append(
                                $("<a>").attr("target", "_blank").attr("href", e.infoUrl).append("More info").addClass(["btn", "btn-outline-info"])
                            )
                        )
                );
            });
        })
        .fail((err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error while fetching movies!",
            });
        });
}

function logout() {
    localStorage.clear();
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
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

            addOrUpdateTodoToView(data);
        })
        .fail((err) => {
            $("#error-text-add-todo").show();
            $("#error-text-add-todo").html(err.responseJSON.errors.join(" ,"));
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

    $("#search-movie").submit((e) => {
        e.preventDefault();
        findMovie();
    });

    $("#popcorn-check").click((e) => {
        e.preventDefault();
        e.stopPropagation();
        $("#search-movie-modal").modal("toggle");
        $("#popcorn-check");
    });

    // Sets the minimal date to today
    $("input[type=date]").attr("min", new Date().toISOString().split("T")[0]);

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

// Enable modal stacking
$(document).on("show.bs.modal", ".modal", function () {
    var zIndex = 1040 + 10 * $(".modal:visible").length;
    $(this).css("z-index", zIndex);
    setTimeout(function () {
        $(".modal-backdrop")
            .not(".modal-stack")
            .css("z-index", zIndex - 1)
            .addClass("modal-stack");
    }, 0);
});

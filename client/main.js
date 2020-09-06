// main
$(document).ready(() => {
	// initialization
	initialization();

	// click "Home" (before login)
	$("#nav-home").click(home);

	// click "Login" :
	$("#home-login").click(login);
	$("#nav-login").click(login);

	// submit "Login" form :
	$("#form-login").submit(login_form);

	// click "Register"
	$("#home-register").click(register);
	$("#nav-register").click(register);

	// submit "Register" form
	$("#form-register").submit(register_form);

	// click "Home" (after login)
	$("#nav-all-todos").click(all_todos);

	// click "My Todos"
	$("#nav-my-todos").click(my_todos);

	// submit "Edit" form
	$("#form-edit-todo").submit(edit_todo_form);

	// click "Add Todo"
	$("#nav-add-todo").click(add_todo);

	// submit "Add Todo" form
	$("#form-add-todo").submit(add_todo_form);

	// click "Logout"
	$("#nav-logout").click(logout);
});

// functions
const initialization = () => {
	if (localStorage.getItem("access_token")) {
		all_todos();
	} else {
		home();
	}
};
const nav_before_login = event => {
	$("#nav-home").show();
	$("#nav-login").show();
	$("#nav-register").show();
	$("#nav-all-todos").hide();
	$("#nav-my-todos").hide();
	$("#nav-add-todo").hide();
	$("#nav-logout").hide();
};
const nav_after_login = event => {
	$("#nav-home").hide();
	$("#nav-login").hide();
	$("#nav-register").hide();
	$("#nav-all-todos").show();
	$("#nav-my-todos").show();
	$("#nav-add-todo").show();
	$("#nav-logout").show();
};
const home = event => {
	$("#home").show();
	$("#menu-login").hide();
	$("#menu-register").hide();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").hide();
	nav_before_login();
};
const login = event => {
	$("#home").hide();
	$("#menu-login").show();
	$("#menu-register").hide();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").hide();
	nav_before_login();
};
const login_form = event => {
	event.preventDefault();
	const email = $("#login-email").val();
	const password = $("#login-password").val();
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/login",
		data: { email, password }
	})
		.done(response => {
			$("#login-email").val("");
			$("#login-password").val("");
			localStorage.setItem("access_token", response.access_token);
			localStorage.setItem("UserId", response.UserId);
			all_todos();
		})
		.fail(err => console.log(err.responseJSON));
};
const register = event => {
	$("#home").hide();
	$("#menu-login").hide();
	$("#menu-register").show();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").hide();
	nav_before_login();
};
const register_form = event => {
	event.preventDefault();
	const username = $("#register-username").val();
	const email = $("#register-email").val();
	const password = $("#register-password").val();
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/register",
		data: { username, email, password }
	})
		.done(response => {
			$("#register-username").val("");
			$("#register-email").val("");
			$("#register-password").val("");
			login();
		})
		.fail(err => console.log(err.responseJSON));
};
const all_todos = event => {
	$("#home").hide();
	$("#menu-login").hide();
	$("#menu-register").hide();
	$("#menu-all-todos").show();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").hide();
	nav_after_login();
	const access_token = localStorage.getItem("access_token");
	$.ajax({
		method: "GET",
		url: "http://localhost:3000/todos",
		headers: { access_token }
	})
		.done(response => {
			$("#get-all-todos").empty();
			response.forEach(todo => {
				$("#get-all-todos").append(`
					<div class="col-6 mb-4">
				    	<div class="card">
				      		<div class="card-body">
				        		<h3 class="card-title">${todo.title}</h3>
				        		<p class="card-text">Owner : <small>${todo.User ? todo.User.username : "unknown"}</small></p>
				        		<p class="card-text">Description : <small>${todo.description}</small></p>
				        		<p class="card-text">Status : <small>${todo.status}</small></p>
				        		<p class="card-text">Due Date : <small>${todo.due_date.split("T")[0]}</small></p>
				      		</div>
				    	</div>
				  	</div>
				`);
			});
		})
		.fail(err => console.log(err.responseJSON));
};
const my_todos = event => {
	$("#home").hide();
	$("#menu-login").hide();
	$("#menu-register").hide();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").show();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").hide();
	nav_after_login();
	const UserId = localStorage.getItem("UserId");
	const access_token = localStorage.getItem("access_token");
	$.ajax({
		method: "GET",
		url: `http://localhost:3000/todos/${UserId}`,
		headers: { access_token }
	})
		.done(response => {
			$("#get-my-todos").empty();
			response.forEach(todo => {
				$("#get-my-todos").append(`
					<div class="col-6 mb-4">
				    	<div class="card">
				      		<div class="card-body">
				        		<h3 class="card-title">${todo.title}</h3>
				        		<p class="card-text">Description : <small>${todo.description}</small></p>
				        		<p class="card-text">Status : <small>${todo.status}</small></p>
				        		<p class="card-text">Due Date : <small>${todo.due_date.split("T")[0]}</small></p>
				        		<div class="col-sm-4 ml-auto">
				        			<button type="button" class="btn btn-secondary" id="edit-todo-${todo.id}">Edit</button>
				        			<button type="button" class="btn btn-danger" id="delete-todo-${todo.id}">Delete</button>
				        		</div>
				      		</div>
				    	</div>
				  	</div>
				`);
				$(`#edit-todo-${todo.id}`).click(event => {
					localStorage.setItem("todo_id", todo.id);
					localStorage.setItem("todo_title", todo.title);
					localStorage.setItem("todo_description", todo.description);
					localStorage.setItem("todo_status", todo.status);
					localStorage.setItem("todo_due_date", todo.due_date.split("T")[0]);
					edit_todo();
				});
				$(`#delete-todo-${todo.id}`).click(event => {
					localStorage.setItem("todo_id", todo.id);
					delete_todo();
				});
			});
		})
		.fail(err => console.log(err.responseJSON));
};
const edit_todo = event => {
	$("#edit-todo-title").val(localStorage.getItem("todo_title"));
	$("#edit-todo-description").val(localStorage.getItem("todo_description"));
	$("#edit-todo-status").val(localStorage.getItem("todo_status"));
	$("#edit-todo-due-date").val(localStorage.getItem("todo_due_date"));
	$("#home").hide();
	$("#menu-login").hide();
	$("#menu-register").hide();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").show();
	nav_after_login();
};
const edit_todo_form = event => {
	event.preventDefault();
	const todo_id = localStorage.getItem("todo_id");
	const title = $("#edit-todo-title").val();
	const description = $("#edit-todo-description").val();
	const due_date = $("#edit-todo-due-date").val();
	const status = $("#edit-todo-status").val();
	$.ajax({
		method: "PUT",
		url: `http://localhost:3000/todos/${todo_id}`,
		data: { title, description, due_date, status },
		headers: {
			access_token: localStorage.getItem("access_token")
		}
	})
		.done(response => {
			$("#edit-todo-title").val("");
			$("#edit-todo-description").val("");
			$("#edit-todo-status").val("");
			$("#edit-todo-due-date").val("");
			localStorage.setItem("todo_id", "");
			localStorage.setItem("todo_title", "");
			localStorage.setItem("todo_description", "");
			localStorage.setItem("todo_status", "");
			localStorage.setItem("todo_due_date", "");
			my_todos();
		})
		.fail(err => console.log(err.responseJSON));
};
const delete_todo = event => {
	const todo_id = localStorage.getItem("todo_id");
	const access_token = localStorage.getItem("access_token");
	$.ajax({
		method: "DELETE",
		url: `http://localhost:3000/todos/${todo_id}`,
		headers: { access_token }
	})
		.done(response => {
			my_todos();
		})
		.fail(err => console.log(err.responseJSON));
};
const add_todo = event => {
	$("#home").hide();
	$("#menu-login").hide();
	$("#menu-register").hide();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").show();
	$("#menu-edit-todo").hide();
	nav_after_login();
};
const add_todo_form = event => {
	event.preventDefault();
	const access_token = localStorage.getItem("access_token");
	const title = $("#add-todo-title").val();
	const description = $("#add-todo-description").val();
	const due_date = $("#add-todo-due-date").val();
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/todos",
		data: { title, description, due_date },
		headers: { access_token }
	})
		.done(response => {
			$("#add-todo-title").val("");
			$("#add-todo-description").val("");
			$("#add-todo-due-date").val("");
			my_todos();
		})
		.fail(err => console.log(err.responseJSON));
};
const logout = event => {
	$("#home").show();
	$("#menu-login").hide();
	$("#menu-register").hide();
	$("#menu-all-todos").hide();
	$("#menu-my-todos").hide();
	$("#menu-add-todo").hide();
	$("#menu-edit-todo").hide();
	nav_before_login();
	localStorage.clear(); // or localStorage.removeItem("access_token") to remove access_token only
	signOut(); // Google account sign out
};

// Google account sign in
function onSignIn(googleUser) {
	const profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

	// get google access token (id token) after sign in
	const google_access_token = googleUser.getAuthResponse().id_token;
	console.log('Google Access Token (ID Token): ' + google_access_token);

	// verify token in server-side
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/googleLogin",
		headers: { google_access_token }
	})
		.done(response => {
			localStorage.setItem("access_token", response.access_token);
			localStorage.setItem("UserId", response.UserId);
			all_todos();
		})
		.fail(err => console.log(err));
}

// Google account sign out
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    	console.log('User signed out.');
    });
}
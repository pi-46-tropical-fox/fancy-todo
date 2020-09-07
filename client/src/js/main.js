function navBurgerToggle() {
	// Check for click events on the navbar burger icon
	$('.navbar-burger').click(function () {
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$('.navbar-burger').toggleClass('is-active');
		$('.navbar-menu').toggleClass('is-active');
	});
}

/* SECTION: Pages */

function hideAllPage() {
	$('section').hide();
}

function showPage(pageId) {
	$('body section').hide();
	$(`#${pageId}`).show();
}

function showPageOnClick(event) {
	showPage(event.data.page);
}

function showTodoList() {
	$.ajax({
		method: "get",
		url: "http://localhost:3000/todos",
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(response => {
			console.log(response);
			response.forEach(todo => {
				if (todo.status === 'todo') {
					$('#todo-container').append(`
			<div class="card todo-card todo" id="${todo.id}">
						<header class="card-header">
							<p class="card-header-title">
								${todo.title}
							</p>
							<a class="card-header-icon">
								<span class="icon">
									<i class="fas fa-calendar"></i>
								</span>
								<time datetime="${new Date(todo.due_date).toISOString().split('T')[0]}">${new Date(todo.due_date).toDateString()}</time>
							</a>
							<a class="card-header-icon" onclick="updateFormTodo(${todo.id})">
								<span class="icon has-text-info">
									<i class="fas fa-edit"></i>
								</span>
							</a>
							<a class="card-header-icon" onclick="deleteTodo(${todo.id})">
								<span class="icon has-text-danger">
									<i class="fas fa-trash"></i>
								</span>
							</a>
							<a class="card-header-icon" onclick="doneTodo(${todo.id})">
								<span class="icon has-text-success">
									<i class="fas fa-check-circle"></i>
								</span>
							</a>
						</header>
						<div class="card-content">
							<div class="content">
								${todo.description}
								<br>
							</div>
						</div>
					</div>
			`);
				} else {
					$('#todo-container').append(`
			<div class="card todo-card todo" id="${todo.id}">
						<header class="card-header">
							<p class="card-header-title">
								${todo.title}
							</p>
							<a class="card-header-icon">
								<span class="icon">
									<i class="fas fa-calendar"></i>
								</span>
								<time datetime="${new Date(todo.due_date).toISOString().split('T')[0]}">${new Date(todo.due_date).toDateString()}</time>
							</a>
							<a class="card-header-icon mr-4">
									<span class="icon has-text-danger">
										<span class="tag is-success is-small">Done</span>
									</span>
								</a>
							<a class="card-header-icon" onclick="deleteTodo(${todo.id})">
								<span class="icon has-text-danger">
									<i class="fas fa-trash"></i>
								</span>
							</a>
						</header>
						<div class="card-content">
							<div class="content">
								${todo.description}
								<br>
							</div>
						</div>
					</div>
			`);
				}
			});
		})
		.fail(err => {
			errHandler(err.responseJSON.errors[0]);
		});
}

/* !SECTION: End of Pages */

/* SECTION: Components */

function refreshTodoList() {
	$('#todo-container > .todo').remove();
	showTodoList();
}

function updateFormTodo(id) {
	$.ajax({
		method: "get",
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(todo => {
			$(`#${id}`).replaceWith(`
			<div class="card todo-card" id="form-update-todo-wrapper">
				<form id="form-update-todo" onsubmit="updateTodo(${id})">
					<header class="card-header">
						<p class="card-header-title">
							<input name="title" type="text" class="input" value="${todo.title}">
						</p>
						<a href="#" class="card-header-icon">
							<input name="due-date" type="date" class="input" value="${new Date(todo.due_date).toISOString().split('T')[0]}">
						</a>
						<a class="card-header-icon mr-4" onclick="cancelUpdate(${id})">
							<span class="icon has-text-danger">
								<span class="tag is-danger is-medium">Cancel</span>
							</span>
						</a>
						<div class="card-header-icon mr-4">
							<button class="button is-primary" type="submit">Save</button>
						</div>
					</header>
					<div class="card-content">
						<div class="content">
							<textarea name="description" class="textarea">${todo.description}</textarea>
							<br>
						</div>
					</div>
				</form>
			</div>
		`);
		})
}

function cancelUpdate() {
	$(`#form-update-todo-wrapper`).remove();
	refreshTodoList();
}

/* !SECTION: End of Components */

/* SECTION: CUD */

function createTodo(event) {
	event.preventDefault();
	$.ajax({
		method: "post",
		url: "http://localhost:3000/todos",
		data: {
			title: $('#form-add-todo input[name=title]').val(),
			due_date: $('#form-add-todo input[name=due-date]').val(),
			description: $('#form-add-todo textarea[name=description]').val(),
			status: 'todo'
		},
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(response => {
			$('#card-form-add-todo').fadeOut();
			$('#card-form-add-todo').hide();
			$('#button-add').show();
			refreshTodoList();

			$('#form-add-todo input[name=title]').val('');
			$('#form-add-todo input[name=due-date]').val('');
			$('#form-add-todo textarea[name=description]').val('');
		})
		.fail(err => {
			errHandler({ name: 'validation', errors: err.responseJSON.errors });
		})
}

function updateTodo(id) {
	event.preventDefault();
	$.ajax({
		method: "put",
		url: `http://localhost:3000/todos/${id}`,
		data: {
			title: $('#form-update-todo input[name=title]').val(),
			due_date: $('#form-update-todo input[name=due-date]').val(),
			description: $('#form-update-todo textarea[name=description]').val(),
			status: 'todo'
		},
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(response => {
			$(`#form-update-todo-wrapper`).remove();
			refreshTodoList();
		})
		.fail(err => {
			errHandler({ name: 'validation', errors: err.responseJSON.errors });
		})
}

function deleteTodo(id) {
	$.ajax({
		method: "delete",
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(response => {
			refreshTodoList();
		})
		.fail(err => {
			errHandler(err.responseJSON.errors[0]);
		});
}

function doneTodo(id) {
	$.ajax({
		method: "get",
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(todo => {
			$.ajax({
				method: "put",
				url: `http://localhost:3000/todos/${todo.id}`,
				data: {
					title: todo.title,
					due_date: todo.due_date,
					description: todo.description,
					status: 'done'
				},
				headers: {
					access_token: localStorage.getItem('access_token')
				}
			})
				.done(response => {
					$(`#${id}`).hide();
					refreshTodoList();
				})
				.fail(err => {
					errHandler({ name: 'validation', errors: err.responseJSON.errors });
				})
		})
		.fail(err => {
			errHandler(err.responseJSON.errors[0]);
		});
}

/* !SECTION: End of CUD */

/* SECTION: Authentication */

function beforeLogin() {
	showPage('page-home');
	$('#todo-container > .todo').remove();

	// hide nav
	$('#nav-item-user').hide();
	$('#nav-item-logout').hide();
	$('#nav-item-todo').hide();
	$('#nav-item-holidays').hide();
	$('#nav-item-login').show();
	$('#nav-item-register').show();
}

function afterLogin() {
	showPage('page-dashboard');
	refreshTodoList();

	//hide nav
	$('#nav-item-login').hide();
	$('#nav-item-register').hide();
	$('#nav-item-logout').show();
	$('#nav-item-holidays').show();
}

function checkAccessToken() {
	const access_token = localStorage.getItem('access_token');

	if (access_token) {
		afterLogin();
	} else {
		beforeLogin();
	}
}

function formLogin(event) {
	event.preventDefault();
	const email = $('#form-login input[name=email]').val();
	const password = $('#form-login input[name=password]').val();
	$.ajax({
		url: 'http://localhost:3000/login',
		method: 'POST',
		data: { email, password },
	})
		.done(result => {
			localStorage.setItem('access_token', result.access_token);
			afterLogin();
		})
		.fail(err => {
			showPage('page-login');
			Swal.fire({
				icon: 'error',
				title: 'Invalid email or password!',
			});
		})
		.always(() => {
			$('#form-login input[name=email]').val('');
			$('#form-login input[name=password]').val('');
		});
}

function formRegister(event) {
	event.preventDefault();
	const email = $('#form-register input[name=email]').val();
	const password = $('#form-register input[name=password]').val();
	$.ajax({
		url: 'http://localhost:3000/register',
		method: 'POST',
		data: { email, password },
	})
		.done(result => {
			localStorage.setItem('access_token', result.access_token);
			showPage('page-home');
		})
		.fail(err => {
			showPage('page-register');
			errHandler({ name: 'validation', errors: err.responseJSON.errors });
		})
		.always(() => {
			$('#form-register input[name=email]').val('');
			$('#form-register input[name=password]').val('');
		});
}

function googleSign(googleUser) {
	const id_token = googleUser.getAuthResponse().id_token;
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/googleSign',
		headers: { google_access_token: id_token }
	})
		.done(result => {
			localStorage.setItem('access_token', result.access_token);
			afterLogin();
		})
		.fail(err => {
			showPage('page-login');
			Swal.fire({
				icon: 'error',
				title: 'Invalid email or password!',
			});
		})
}

function logout() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then();
	localStorage.clear();

	beforeLogin();
}

/* !SECTION: End of Authentication */

/* SECTION: Error Handler */

function errHandler({ name, message, errors }) {
	switch (name) {
		case 'notAuthenticated':
			Swal.fire({
				icon: 'error',
				title: message
			});
			break;
		case 'validation':
			Swal.fire(
				{
					icon: 'error',
					titleText: 'Validation error',
					html: errors.map(err => err.message).join('<br />')
				}
			);
			break;

		default:
			Swal.fire({
				icon: 'error',
				title: message
			});
			break;
	}
}

/* !SECTION: End of Error Handler */

function fetchHolidays() {
	$.ajax({
		method: "get",
		url: "http://localhost:3000/holidays",
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(response => {
			Swal.fire({
				title: 'Holidays',
				html: response.map(holiday => `${holiday.date} ${holiday.localName}`).join('<br />')
			});
		})
		.fail(err => {
			errHandler(err.responseJSON.errors[0]);
		});
}

$(document).ready(function () {
	navBurgerToggle();
	hideAllPage();

	checkAccessToken();

	// nav item handler
	$('#nav-item-register').on('click', { page: 'page-register' }, showPageOnClick);
	$('#nav-item-login').on('click', { page: 'page-login' }, showPageOnClick);
	$('#nav-item-logout').on('click', logout);
	$('#nav-item-holidays').on('click', fetchHolidays);

	// form handler
	$('#form-login').on('submit', formLogin);
	$('#form-register').on('submit', formRegister);

	// form hider
	$('#card-form-add-todo').hide();

	// button listener
	$('#button-add').click(function () {
		$('#card-form-add-todo').fadeIn();
		$('#card-form-add-todo').show();
		$('#button-add').hide();
	});
	$('#form-add-todo-cancel').click(function () {
		$('#card-form-add-todo').fadeOut();
		$('#card-form-add-todo').hide();
		$('#button-add').show();
	});
	$('#get-started').on('click', { page: 'page-register' }, showPageOnClick);

	//form listener
	$('#form-add-todo').submit(createTodo);
});

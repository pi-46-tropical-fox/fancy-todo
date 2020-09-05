const menuLogin = (event) => {
	$('#login').show()
	$('#register').hide()
	$('#add-todo').hide()
	$('#todo-list').hide()
	$('#edit-todo').hide()
}
const menuRegister = (event) => {
	$('#login').hide()
	$('#register').show()
	$('#add-todo').hide()
	$('#todo-list').hide()
	$('#edit-todo').hide()
}
const menuAdd = (event) => {
	$('#login').hide()
	$('#register').hide()
	$('#add-todo').show()
	$('#todo-list').hide()
	$('#edit-todo').hide()
}
const addForm = (event) => {
	console.log(event, '<<<<<< add todo event');
	event.preventDefault()
	const title = $('#input-title').val()	
	const description = $('#input-description').val()
	const due_date = $('#input-date').val()

	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/todos',
		headers: {
			access_token: localStorage.getItem('access_token')
		},
		
		data: {
			title,
			description,
			due_date
		}
	})
	.done(response => {
		console.log(response,'<<<< ini response');
		$('#input-title').val('')
		$('#input-description').val('')
		$('#input-date').val('')
		menuList()
	})
	.fail(err => {
		console.log(err);
	})
}
const deleteTodo = (id) => {
	console.log(id, '<<<<< delete id');
	$.ajax({
		method: 'DELETE',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done(response => {
		console.log(response, '<<<< ni response');
		menuList();
	})
	.fail(err => {
		console.log(err);
	})
}
const menuEdit = (event) => {

	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		},
	})
	.done(response => {
		$('#edit-title').val(response.title)
		$('#edit-description').val(response.description)
		$('#edit-status').val(response.status)
		$('#edit-date').val(response.due_date)

		$('edit-todo').click()
	})
	.fail(err => {
		console.log(err);
	})
}
const editTodoForm = (id) => {
	const title = $('edit-title').val()
	const description = $('edit-description').val()
	const status = $('edit-status').val()
	const due_date = $('edit-date').val()

	$.ajax({
		method: "PUT",
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem("access_token")
		},
		data: {
			title,
			description,
			status,
			due_date
		}
	})
	.done(response => {
		$('#login').hide()
		$('#register').hide()
		$('#todo-list').hide()
		$('#add-todo').hide()
		$('#edit-todo').show()	
	})
}
const menuList = (event) => {
	$('#login').hide()
	$('#register').hide()
	$('#add-todo').hide()
	$('#edit-todo').hide()
	$('#todo-list').show()

	$('#table-todo').empty()	

	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/todos',
		headers: {
			access_token: localStorage.getItem('access_token')
		},
	})
	.done(response => {
		response.forEach((data, i) => {
			$('#table-todo').append(`
				<tr>
					<td>${i+1}</td>
					<td>${data.title}</td>
					<td>${data.description}</td>
					<td>${data.status}</td>
					<td>${data.due_date}</td>
					<td>
						<a onClick="editTodoForm"(${data.id})" href="#">edit </a>
						<a onClick="deleteTodo(${data.id})" href="#">delete</a>
					</td>
				</tr>
			`)
		})
	})
	.fail(err => {
		console.log(err)
	})
}
const menuLogout = (event) => {
	$('#login').show()
	$('#register').hide()
	$('#add-todo').hide()
	$('#todo-list').hide()
	$('#edit-todo').hide()	

	beforeLogin();
	localStorage.clear();
}

const initContent = () => {
	$('#login').hide()
	$('#register').hide()
	$('#add-todo').hide()
	$('#todo-list').hide()	
	$('#edit-todo').hide()
}

const beforeLogin = () => {
	$('#nav-login').show()
	$('#nav-register').show()
	$('#nav-home').hide()
	$('#nav-add-todo').hide()	
	$('#nav-logout').hide()
}
const afterLogin = () => {
	$('#nav-login').hide()
	$('#nav-register').hide()
	$('#nav-home').show()
	$('#nav-add-todo').show()	
	$('#nav-logout').show()
}
const loginForm = () => {
	event.preventDefault();
	const email = $('#loginEmail').val()
	const password = $('#loginPassword').val()
	
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/login',
		data: {
			email,
			password
		}
	})
	.done((response) => {
		$('#loginEmail').val('');
		$('#loginPassword').val('');
		localStorage.setItem('access_token', response.access_token);
		menuList();
		afterLogin()
	})
	.fail((err) => {
		console.log(err);
	})
}
const registerForm = () => {
	event.preventDefault();
	const name = $('#name-register').val()
	const email = $('#email-register').val()
	const password = $('#password-register').val()
	
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/register',
		data: {
			name,
			email,
			password
		}
	})
	.done((response) => {
		$('#email-register').val('');
		$('#password-register').val('');
		menuLogin();
	})
	.fail((err) => {
		console.log(err);
	})
}
// function onSignIn(googleUser) {
// 	const google_access_token = googleUser.getAuthResponse().id_token
// 	console.log(google_access_token, '<<<< from google signin');
// 	$.ajax({
// 		method: "POST",
// 		url:"http://localhost:3000/googleLogin"
// 	})
// }
// const googleSignIn = () => {
// 	$.ajax({
// 		method:"POST",
// 		url: "http://localhost:8080/googleLogin",
// 		headers: { google_access_token }
// 	})
// 	.done((response) => {
// 		console.log(response);
// 		localStorage.setItem("access_token", resonse.access_token)
// 		afterLogin();
// 	})
// 	.fail(err => {
// 		console.log(err);
// 	})
// }
const googleSignOut = () => {
	const GoogleAuth = gapi.auth2.getAuthInstance();
	GoogleAuth
		.signOut()
		.then(() => {
			console.log('Signed Out');
		})
		.catch(err => {
			console.log(err);
		})
	localStorage.clear();	
}



$(document).ready(() => {
	initContent()
	if(localStorage.getItem('access_token')) {
		afterLogin();
		menuList();
	} else {
		beforeLogin();
		menuLogin();
	}
	$('#nav-login').click(menuLogin)
	$('#nav-register').click(menuRegister)
	$('#nav-home').click(menuList)
	$('#nav-add-todo').click(menuAdd)
	$('#nav-logout').click(menuLogout)
	$('#nav-logout').click(googleSignOut)

	$('#loginForm').submit(loginForm)
	$('#registerForm').submit(registerForm)
	
	$('#add-form').submit(addForm)
})

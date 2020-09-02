function menuLogin(event) {
		$('#form-login').show()
		$('#form-register').hide()
		$('#todo-list').hide()
}

function menuRegister(event) {
	$('#form-login').hide()
	$('#form-register').show()
	$('#todo-list').hide()
}

function menuMyTodo(event) {
	$('#form-login').hide()
	$('#form-register').hide()
	$('#todo-list').show()
	$('#nav-home').show()
	$('#nav-mytodos').show()
	$('#nav-create').show()
	$('#nav-logout').show()
	$('#nav-login').hide()
	$('#nav-register').hide()
}

function startPage(event) {
	$('#nav-home').hide()
	$('#nav-login').show()
	$('#nav-register').show()
	$('#nav-mytodos').hide()
	$('#nav-create').hide()
	$('#nav-logout').hide()
	$('#form-login').show()
	$('#form-register').hide()
	$('#todo-list').hide()
}

function submitLogin(event) {
	event.preventDefault()
	const username = $('#loginUsername').val()
	const password = $('#loginPassword').val()
	console.log(username,password);
	
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/login',
		data: {username, password}
	})
	.done((response)=> {
		$('#loginUsername').val('')
		$('#loginPassword').val('')
		localStorage.setItem('access_token',response.access_token)
		menuMyTodo()
	})
	.fail((err)=> {
		console.log(err);
	})
}

$(document).ready(()=> {
	startPage()
	$('#nav-login').click(menuLogin)
	$('#nav-register').click(menuRegister)
	$('#nav-mytodos').click(menuMyTodo)

	$('#loginForm').submit(submitLogin)
	


  })
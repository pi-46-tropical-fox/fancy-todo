function menuLogin(event) {
	 $('#create-todo').hide()
		$('#form-login').show()
		$('#form-register').hide()
		$('#todo-list').hide()
}

function menuRegister(event) {
	$('#create-todo').hide()
	$('#form-login').hide()
	$('#form-register').show()
	$('#todo-list').hide()
}

function menuMyTodo(event) {
	$('#create-todo').hide()
	$('#form-login').hide()
	$('#form-register').hide()
	$('#todo-list').show()
	$('#nav-home').show()
	$('#nav-mytodos').show()
	$('#nav-create').show()
	$('#nav-logout').show()
	$('#nav-login').hide()
	$('#nav-register').hide()

	myTodoList()
}

function menuCreateTodo(event) {
	$('#create-todo').show()
	$('#editTodo').hide()
	$('#form-login').hide()
	$('#form-register').hide()
	$('#todo-list').hide()
	$('#nav-home').show()
	$('#nav-mytodos').show()
	$('#nav-create').show()
	$('#nav-logout').show()
	$('#nav-login').hide()
	$('#nav-register').hide()

	$('#createTodoForm').submit(createTodo)	
}

function menuEditTodo(event) {
	$('#create-todo').show()
	$('#createTodoForm').hide()
	$('#form-login').hide()
	$('#form-register').hide()
	$('#todo-list').hide()
	$('#nav-home').show()
	$('#nav-mytodos').show()
	$('#nav-create').show()
	$('#nav-logout').show()
	$('#nav-login').hide()
	$('#nav-register').hide()
}


function menuLogout(event) {
	$('#create-todo').hide()
	$('#form-login').show()
	$('#form-register').hide()
	$('#todo-list').hide()
	localStorage.clear()
}

function startPage(event) {
	$('#create-todo').hide()
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
	$('#create-todo').hide()
	event.preventDefault()
	const username = $('#loginUsername').val()
	const password = $('#loginPassword').val()
	
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

function submitRegister(event) {
	event.preventDefault()
	const username = $('#registerUsername').val()
	const email = $('#registerEmail').val()
	const password = $('#registerPassword').val()
	
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/register',
		data: {username,email,password}
	})
	.done((response)=> {
		$('#registerUsername').val('')
		$('#registerEmail').val('')
		$('#registerPassword').val('')
		startPage()
	})
	.fail((err)=> {
		console.log(err);
	})
}

function myTodoList(event) {
	$('#create-todo').hide()
	$('#showAllTodos').show()
	$('#todoList').empty()
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/todos',
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		let number = 1
		response.forEach(todo => {
			$('#todoList').append(`
			<tr scope="row">
				<td> ${number++} </td>
				<td> ${todo.title} </td>
				<td> ${todo.description} </td>
				<td> ${todo.status} </td>
				<td> ${todo.due_date} </td>
				<td> 
				<button type="button" onclick="edit(${todo.id})" class="btn btn-success">Edit</button>
				<button type="button" onclick="delete(${todo.id})" class="btn btn-danger">Delete</button> 
				</td>
			</tr>`
			)
		});
	})
	.fail((err)=> {
		console.log(err);
	})
}

function edit(id) {
	console.log('masuk');
	console.log(id);
	// $.ajax({
	// 	method: 'PUT',
	// 	url: `http://localhost:3000/todos/${id}`,
	// 	headers: {
	// 		access_token: localStorage.getItem('access_token')
	// 	}
	// })
	// .done((response)=> {

	// 	console.log(response);
	// })
	// .fail((err)=> {
	// 	console.log(err);
	// })
}



function createTodo(event) {
	// console.log('masuk');
	// event.preventDefault()
	// const title = $('#titleCreate').val()
	// const description = $('#descriptionCreate').val()
	// let due_dateTemp = $('#due_dateCreate')
	// const status = 'not finish'
	// let due_date = due_dateTemp.toISOString()
	// // console.log(due_dateTemp);
	
	// $.ajax({
	// 	method: 'POST',
	// 	url: 'http://localhost:3000/todos',
	// 	data: {title,description,status,due_date}
	// })
	// .done((response)=> {
	// 	$('#titleCreate').val('')
	// 	$('#descriptionCreate').val('')
	// 	$('#due_dateCreate').val('')
	// 	menuMyTodo()
	// })
	// .fail((err)=> {
	// 	console.log(err);
	// })
}



$(document).ready(()=> {
	if (localStorage.getItem('access_token')) {
		menuMyTodo()
	} else {
		startPage()
	}

	$('#nav-login').click(menuLogin)
	$('#nav-register').click(menuRegister)
	$('#nav-mytodos').click(menuMyTodo)
	$('#nav-create').click(menuCreateTodo)
	

	$('#loginForm').submit(submitLogin)
	$('#registerForm').submit(submitRegister)	

  })
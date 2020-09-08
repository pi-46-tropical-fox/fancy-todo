function hideNavbar() {
	$('#nav-home').hide()
	$('#nav-mytodos').hide()
	$('#nav-create').hide()
	$('#nav-logout').hide()
	$('#nav-login').hide()
	$('#nav-register').hide()
}

function hideAllFeature() {
	$('#loginMenu').hide()
	$('#registerMenu').hide()
	$('#tableAllTodos').hide()
	$('#tablemyTodos').hide()
	$('#createTodoForm').hide()
	$('#editTodo').hide()
}

function navbarMainPage() {
	hideNavbar()
	$('#nav-home').show()
	$('#nav-mytodos').show()
	$('#nav-create').show()
	$('#nav-logout').show()
}

function navbarLoginPage() {
	hideNavbar()
	$('#nav-login').show()
	$('#nav-register').show()
}

function loginPage() {
	hideAllFeature()
	navbarLoginPage()
	$('#loginMenu').show()
}

function homePage() {
	navbarMainPage()
	hideAllFeature()
	$('#tableAllTodos').show()
	allTodos()
}

function menuRegister() {
	loginPage()
	$('#registerMenu').show()
	$('#loginMenu').hide()
}

function menuMyTodos() {
	navbarMainPage()
	hideAllFeature()
	$('#tablemyTodos').show()
	myTodos()
}

function menuCreateTodo() {
	navbarMainPage()
	hideAllFeature()
	$('#createTodoForm').show()
}

function menuEditTodo() {
	navbarMainPage()
	hideAllFeature()
	$('#editTodo').show()
}

function submitLogin(event) {
	event.preventDefault()
	const username = $('#loginUsername').val()
	const password = $('#loginPassword').val()
	
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/login',
		data: {username, password},
	})
	.done((response)=> {
		$('#loginUsername').val('')
		$('#loginPassword').val('')
		localStorage.setItem('access_token',response.access_token)
		localStorage.setItem('username', username)
		$('#username_login').text(localStorage.username)
		homePage()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function onSignIn(googleUser) {
	var google_id_token = googleUser.getAuthResponse().id_token;  
	
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/googleLogin',
		headers: {google_id_token}
	})
	.done((response)=> {
		localStorage.setItem('access_token',response.access_token)
		localStorage.setItem('username',response.username)
		$('#username_login').text(localStorage.username)
		homePage()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
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
		loginPage()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
	  showErrors(['User signed out'])
	});
}

function allTodos() {
	$('#AllTodoList').empty()
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
			let due_date = todo.due_date.split('T')
			$('#AllTodoList').append(`
			<tr scope="row">
				<td> ${number++} </td>
				<td> ${todo.User.username} </td>
				<td> ${todo.title} </td>
				<td> ${todo.description} </td>
				<td> ${todo.status} </td>
				<td> ${due_date[0]} </td>
			</tr>`
			)
		});
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}
{/* <td> 
<button type="button" onclick="join(${todo.id})" class="btn btn-success">Join!</button>
 </td> */}

function myTodos() {
	$('#myTodoList').empty()
	let username = localStorage.username

	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/myTodos?q=${username}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		let number = 1
		response.forEach(todo => {
			let due_date = todo.due_date.split('T')
			$('#myTodoList').append(`
			<tr scope="row">
				<td> ${number++} </td>
				<td> ${todo.title} </td>
				<td> ${todo.description} </td>
				<td> ${todo.status} </td>
				<td> ${due_date[0]} </td>
				<td> 
				<button type="button" onclick="edit(event,${todo.id})" class="btn btn-success">Edit</button>
				<button type="button" onclick="deleteTodo(event,${todo.id})" class="btn btn-danger">Delete</button> 
				</td>
			</tr>`
			)
		});
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}


function createTodo(event) {
	event.preventDefault()
	const title = $('#titleCreate').val()
	const description = $('#descriptionCreate').val()
	let due_date_Temp = new Date($('#due_dateCreate').val()) //new Date() // $('#due_dateCreate')
	const due_date = due_date_Temp.toISOString()
	const status = 'not finish'
	// let username = localStorage.getItem("username")
		
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/todos',
		data: {title,description,status,due_date},
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		$('#titleCreate').val('')
		$('#descriptionCreate').val('')
		$('#due_dateCreate').val('')
		menuMyTodos()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function edit(event,id) {
	event.preventDefault()
	$.ajax({
		method: "GET",
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token : localStorage.getItem("access_token")
		}
	})
	.done((response)=> {
		menuEditTodo()
		let due_date = response.due_date.split('T')
		$('#editForm').append(`
			<div class="form-group">
			<label for="exampleInputEmail1">Title</label>
			<input type="text" class="form-control" value="${response.title}" id="title" aria-describedby="emailHelp">
			</div>
			<div class="form-group">
			<label for="exampleInputPassword1">Description</label>
			<input type="text" class="form-control" value="${response.description}" id="description">
			</div>
			<div class="form-group">
			<label for="exampleInputPassword1">Due Date</label>
			<input type="date" class="form-control"  value="${due_date[0]}" id="due_date">
			</div>
			<button type="submit"  onclick="submitEdit(event,${response.id})" class="btn btn-primary">Submit</button>
		`)
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function submitEdit(event,id) {
	event.preventDefault()
	const title = $('#title').val()
	const due_date = $('#due_date').val()
	const description = $('#description').val()
	const status = 'not finished'
	$.ajax({
		method: 'PUT',
		url: `http://localhost:3000/todos/${id}`,
		data: {title,description,due_date,status},
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		menuMyTodos()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function deleteTodo(event,id) {
	event.preventDefault()
	$.ajax({
		method: 'DELETE',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		menuMyTodos()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}
	
function searchForm(categories){
	console.log(categories);
	$("#searchKeyWord").text(categories)
	$("#resultSearching").hide()
	$('#keyWord').val('')
	if(categories == 'Anime') {
		$('#submitSearchForm').submit(animeSearch)
	} else if(categories == 'Movie') {
		$('#submitSearchForm').submit(movieSearch)
	} else if(categories == 'Music') {
		$('#submitSearchForm').submit(musicSearch)
	} 
}

function animeSearch(event) {
	console.log('masuk anime');
	$("#resultSearching").empty()
	event.preventDefault()
	$("#resultSearching").show()
	const keyWord = $('#keyWord').val()

	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/search/anime?q=${keyWord}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done(response => {
		response.results.forEach(e => {
			$("#resultSearching").append(`
				<li class="media" onclick="return inputSearchToBoard(event,'${e.title}','anime')">
				<img src="${e.image_url}" class="mr-3" style="width:250px;">
				<div class="media-body">
				<h5 class="mt-0 mb-1">${e.title}</h5>   
				${e.synopsis}
				</div>
				</li>
				<br>
			`)
		});
	})
	.fail((err) => {
		showErrors(err.responseJSON.errors)
	})
}

function movieSearch(event) {
	console.log('masuk movie');
	$("#resultSearching").empty()
	event.preventDefault()
	$("#resultSearching").show()
	const keyWord = $('#keyWord').val()

	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/search/movie?q=${keyWord}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done(response => {
		response.results.forEach(e => {
			$("#resultSearching").append(`
			<li class="media" onclick="return inputSearchToBoard(event,'${e.title}','music')">
			<img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" class="mr-3" style="width:250px;">
			<div class="media-body"> 
			<h5 class="mt-0 mb-1">${e.title}</h5> 
			Rating : ${e.vote_average}  
			${e.overview}
			</div>
			</li>
			<br>
			`)
		});
	})
	.fail((err) => {
		showErrors(err.responseJSON.errors)
	})
}

function musicSearch(event) {
	console.log('masuk musik');
	$("#resultSearching").empty()
	event.preventDefault()
	$("#resultSearching").show()
	const keyWord = $('#keyWord').val()

	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/search/music?q=${keyWord}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done(response => {
		response.tracks.items.forEach(e => {
			$("#resultSearching").append(`
			<li class="media" onclick="return inputSearchToBoard(event,'${e.album.name}','music')">
			<img src="${e.album.images[1].url}" class="mr-3" style="width:55px;height:55px;">
			<div class="media-body"> 
			<h5 class="mt-0 mb-1">${e.album.name}</h5>   
			</div>
			</li>
			<br>
			`)
	        });
	    })
	.fail((err) => {
		showErrors(err.responseJSON.errors)
	})		
}

function randomActivities() {
	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/random`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		inputSearchToBoard(event,response.result.activity,'activity')
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function inputSearchToBoard(event,title,key) {
	$("#titleCreate").val('')
	$("#descriptionCreate").val('')

	event.preventDefault()
	$("#staticBackdrop").modal("hide")
	if (key == 'anime') {
		$("#titleCreate").val(`Watching "${title}"!`)
		$("#descriptionCreate").val(`Anyone wants to join?`)
	} else if (key == 'music') {
		$("#titleCreate").val(`Listening ${title}~`)
		$("#descriptionCreate").val(`Enjoy my playlist. don't disturb me ~`)
	} else if (key == 'activity') {
		$("#titleCreate").val(`Lets do ${title}`)
		$("#descriptionCreate").val(`It must be fun!`)
	}
}

function menuLogout(event) {
	localStorage.clear()
	$('#username_login').empty()
	signOut()
	loginPage()
}


function showErrors(err){
	$("#errorsModal").modal("show")
	
	$("#listErrors").empty()
	err.forEach(e => {
		$("#listErrors").append(`
		<li class="list-group-item">${e}</li>
		`)
	})
}

$(document).ready(()=> {
	if (localStorage.getItem('access_token')) {
		homePage()
	} else {
		loginPage()
	}
	$('#nav-login').click(loginPage)
	$('#nav-home').click(homePage)
	$('#nav-register').click(menuRegister)
	$('#nav-mytodos').click(menuMyTodos)
	$('#nav-create').click(menuCreateTodo)
	$('#nav-logout').click(menuLogout)
	
	$('#loginForm').submit(submitLogin)
	$('#registerForm').submit(submitRegister)	
	$('#createTodoForm').submit(createTodo)	
	$('#editTodo').submit(submitEdit)	
})



// function join(id) {

// 	let username = localStorage.getItem("username")

	// $.ajax({
	// 	method: 'POST',
	// 	url: `http://localhost:3000/todos/join/${id}`,
	// 	data: {username},
	// 	headers: {
	// 		access_token: localStorage.getItem('access_token')
	// 	}
	// })
// 	.done((response)=> {
// 		console.log(response);
// 	})
// 	.fail((err)=> {
// 		showErrors(err.responseJSON.errors)
// 	})
// }
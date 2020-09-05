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

function menuHome(event) {
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

	allTodos()
}

function menuMyTodos(event) {
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

	myTodos()
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

	// $('#createTodoForm').submit(createTodo)	
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
	$('#editForm').empty()
}


function menuLogout(event) {
	localStorage.clear()
	$('#username_login').empty()
	signOut()
	startPage()
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
		data: {username, password},
	})
	.done((response)=> {
		$('#loginUsername').val('')
		$('#loginPassword').val('')
		localStorage.setItem('access_token',response.access_token)
		localStorage.setItem('username', username)
		$('#username_login').text(localStorage.username)
		menuHome()
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
		console.log(response);
		localStorage.setItem('access_token',response.access_token)
		localStorage.setItem('username',response.username)
		$('#username_login').text(localStorage.username)
		menuHome()
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



function allTodos(event) {
	$('#tablemyTodos').hide()
	$('#tableAllTodos').show()
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
			// console.log(due_date[0]);
			$('#AllTodoList').append(`
			<tr scope="row">
				<td> ${number++} </td>
				<td> ${todo.User.username} </td>
				<td> ${todo.title} </td>
				<td> ${todo.description} </td>
				<td> ${todo.status} </td>
				<td> ${due_date[0]} </td>
				<td> 
				<button type="button" onclick="join(${todo.id})" class="btn btn-success">Join!</button>
				 </td>
			</tr>`
			)
		});
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function join(id) {

	let username = localStorage.getItem("username")

	$.ajax({
		method: 'POST',
		url: `http://localhost:3000/todos/join/${id}`,
		data: {username},
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		console.log(response);
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}

function myTodos(event) {
	$('#tablemyTodos').show()
	$('#tableAllTodos').hide()
	$('#myTodoList').empty()
	let username = localStorage.username
	console.log(username);
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
				<button type="button" onclick="edit(${todo.id})" class="btn btn-success">Edit</button>
				<button type="button" onclick="deleteTodo(${todo.id})" class="btn btn-danger">Delete</button> 
				</td>
			</tr>`
			)
		});
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}


function edit(id) {
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
	const description = $('#description').val()
	const due_date = $('#due_date').val()
	const status = 'not finish'
	$.ajax({
		method: 'PUT',
		url: `http://localhost:3000/todos/${id}`,
		data: {title,description,due_date,status},
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		// console.log(response);
		// $('#registerUsername').val('')
		// $('#registerEmail').val('')
		// $('#registerPassword').val('')
		menuHome()
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
		startPage()
	})
	.fail((err)=> {
		showErrors(err.responseJSON.errors)
	})
}


function deleteTodo(id) {
	console.log(id)
	$.ajax({
		method: 'DELETE',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
	.done((response)=> {
		menuHome()
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
		menuHome()
	})
	.fail((err)=> {
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


function searchForm(categories){
    $("#searchKeyWord").text(categories)
    $("#resultSearching").hide()
    if(categories == 'Anime') {
        $('#submitSearchForm').submit(animeSearch)
    } else if(categories == 'Movie') {
        $('#submitSearchForm').submit(movieSearch)
    } else if(categories == 'Music') {
        $('#submitSearchForm').submit(musicSearch)
    } 
    
}

function animeSearch(event) {
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
		console.log('masuk');
		console.log(response.results);
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
		console.log('masuk');
		console.log(response.tracks.items);
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
	// initContent()
	if (localStorage.getItem('access_token')) {
		menuHome()
	} else {
		startPage()
	}

	$('#nav-login').click(menuLogin)
	$('#nav-register').click(menuRegister)
	$('#nav-home').click(menuHome)
	$('#nav-mytodos').click(menuMyTodos)
	$('#nav-create').click(menuCreateTodo)
	$('#nav-logout').click(menuLogout)
	

	$('#loginForm').submit(submitLogin)
	$('#registerForm').submit(submitRegister)	
	$('#createTodoForm').submit(createTodo)	
	$('#editTodo').submit(submitEdit)	


  })


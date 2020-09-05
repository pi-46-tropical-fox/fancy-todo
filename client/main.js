const baseUrl = 'http://localhost:3000'



function beforeLogin (event) {
  $('#register-form').hide()
  $('#nav-logout').hide()
  $('#dashboard').hide()
  $('#nav-todo-list').hide()

  $('#nav-register').show()
  $('#nav-login').show()
  $('#login-form').show()
  
}

function loginForm(event) {
  $('#nav-logout').hide()
  $('#nav-todo-list').hide()
  $('#login-form').show()
  $('#login-option').show()
  $('#register-form').hide()
  $('#dashboard').hide()

}

function registerForm(event) {
  $('#register-form').show()
  $('#register-option').show()
  $('#login-form').hide()
  $('#nav-todo-list').hide()
  $('#nav-logout').hide()
  $('#dashboard').hide()
}

function menuList(event) {
  $('#nav-register').hide()
  $('#nav-login').hide()
  $('#nav-logout').show()
  
  $('#register-form').hide()
  $('#register-option').hide()
  $('#login-form').hide()
  $('#dashboard').show()

}

function logoutForm(event) {
  beforeLogin()
}

function login () {
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/login`,
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
  
  .done(function (response) {
    $('#login-email').val('')
    $('#login-password').val('')
    localStorage.setItem('access_token', response.access_token)
    menus()
    console.log(response);
    $('.msg').append(`<div class="alert alert-success" role="alert">Login success!</div>`)

  })
  .fail(err => {
    console.log(err)
  })
}

function register () {
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/register`,
    data: {
      username: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
  
  .done(function (response) {
    $('#register-name').val('')
    $('#register-email').val('')
    $('#register-password').val('')
    localStorage.setItem('access_token', response.access_token)
    console.log(response);
  })
  .fail(err => {
    console.log(err)
  })
}


function googleSignin(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/googleLogin',
      headers: {
          google_access_token
      }
  })
  .done((response) => {
      console.log('response >>', response, '<<< response')
      localStorage.setItem('access_token', response.token)
      menus()
  })
  .fail((err) => {
      console.log(err)
  })
}
function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.googleSignOut().then(function () {
    console.log('User signed out.');
  });
}

function optionLogout(event) {
  // event.preventDefault()
  localStorage.clear()
  // googleSignOut()
}

function menus(event) {
  // initial()
  // navbarAfterLogin()
  // $('#dashboard').show()
  menuList()
  getWeather()

  const access_token =localStorage.getItem('access_token')

  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token
    }
  })
  .done((response) => {
    console.log(response)
    $('#todo-list').empty()
    let counter = 1
    response.forEach(element => {
      const date = new Date(element.due_date).toISOString().slice(0, 10)
      let status = 'Non-Urgent'
      if (element.status) {status = 'Urgent'}

      $('#todo-list').append(`
        <tr>
          <td>${counter++}</td>
          <td>${element.title}</td>
          <td>${element.description}</td>
          <td>${status}</td>
          <td>${date}</td>
          <td>
            <a href="#" data-id="${element.id}" onclick="showDelete(${element.id})">Delete</a> | <a href="#" data-id="${element.id}" onclick="editTodoForm(event)">Edit</a>
          </td>
        </tr>
      `)
    });
  })
  .fail((err) => {
    console.log(err)
  })
}

function createTodo(event) {

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title: $('#add-title').val(),
      description: $('#add-description').val(),
      due_date: $('#add-due_date').val(),
      status: $('#add-status').is(':checked')
    }
  })
  .done((response) => {
    console.log(response)
    $('#add-title').val('')
    $('#add-description').val('')
    $('#add-due_date').val('')
    $('#add-status').val('')
    menus()
  })
  .fail((err) => {
    console.log(err)
  })
}


function editTodoForm(event) {
  console.log(event.srcElement.dataset.id)
  localStorage.setItem('todoId', event.srcElement.dataset.id)

  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${event.srcElement.dataset.id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(data => {
    $('#editModal').show()
    $('#editModalForm').empty().append(`
    <div class="form-group" style="color: #000000">
      <label for="titleEditModal">To-Do:</label>
      <input type="text" class="form-control" id="titleEditModal" value="${data.title}"
          name="title">
    </div>
    <div class="form-group" style="color: #000000">
      <label for="descriptionEditModal">Description:</label>
      <input type="text" class="form-control" id="descriptionEditModal" value="${data.description}"
          name="description">
    </div>
    <div class="form-group" style="color: #000000">
      <label for="dueDateEditModal">Date:</label>
      <input value="${new Date(data.due_date).toISOString().split('T')[0]}" type="date" class="form-control" id="dueDateEditModal" name="date">
    </div>
    <div class="form-check-inline">
      <label class="form-check-label" for="statusEditModal"
          style="color: #000000">Urgent:</label>
      <div class="container" style="color: #000000">
          <input type="checkbox" class="form-check-input" name="status" id="statusEditModal"
              style="color: #000000">Yes
      </div>
    </div>`
  )
  if (status) $('#statusEditModal').prop('checked', true)
  else $('#statusEditModal').prop('checked', false)
  $('#editModalFooter').empty().append(`
  <button type="button" class="btn btn-success" id="saveEditModal" onclick="submitEditTodo('${data.id}')" data-dismiss="modal">Save</button>
  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
  )
  })
  .fail(err => {
    console.log(err);
  })
}

function submitEditTodo(event) {

  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${localStorage.getItem('todoId')}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title: $('#titleEditModal').val(),
      description: $('#descriptionEditModal').val(),
      status: $('#statusEditModal').val(),
      due_date: $('#dueDateEditModal').val(),
    }
  })
  .done(response => {
    console.log(response)
    menus()
  })
  .fail(err => {
    console.log(err)
  })

}

function showDelete (id) {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#createModal').hide()
  $('#deleteModal').show()
  $('#deleteModalFooter').empty().append(`
    <button type="button" class="btn btn-success" id="yesDeleteModal" onclick="deleteTodo('${id}')" data-dismiss="modal">Yes</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
  )
}

function deleteTodo(id) {
  
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response => {
    console.log(response)
    menus()
  })
  .fail(err => {
    console.log(err)
  })
}

function getWeather(event) {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/weather`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  .done(res => {
    console.log(res.current);
    $('#weather-temp').html(res.current.temperature + `&#8451;`)
    $('#weather-desc').text(res.current.weather_descriptions)
    $('#weather-location').text(res.location.name)
    $('#weather-pressure').text('Air Pressure: '+res.current.pressure)
  })
  .fail(err => console.log(err))
}


$(document).ready(function () {
  
  beforeLogin()

  $('#nav-login').click(loginForm)
  $('#register-not-have-button').click(registerForm)
  
  $('#nav-register').click(registerForm)
  $('#login-have-button').click(loginForm)

  $('#nav-logout').click(function () {
    
    optionLogout()
    beforeLogin()
    // googleSignOut()
    // loginForm()
  })

  $('#nav-todo-list').click(function () {
    menus()
  })

  $('#created-save').click(function () {
    createTodo()
  })

  $('#login-submit').click(function () {
    event.preventDefault()
    login()
  })

  $('#register-submit').click(function () {
    event.preventDefault()
    register()
    loginForm()
  })

})



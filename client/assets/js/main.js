const BASE_URL = 'http://localhost:3000'
let myWindow = window
$(document).ready(function() {
  if(localStorage.getItem('access_token')){
    successLogin()
  }else{
    reset()
    failLogin()
  }
})

//TOMBOL - TOMBOL

$('#signupForm').on('click', function() {
  $('.todos').hide()
  $('#registerForm').show()
})
$('#signinForm').on('click', function() {
  failLogin()

})
$('#logout').on('click', function() {
  logout()
})
$('#addTodo').on('click', function() {
  $('.todos').hide()
  $('#home').hide()
  $('#addForm').show()
  $('#navbar').show()
})
$('.cancelSave').on('click', function() {
  $('.todos').hide()
  $('#home').show()
  $('#navbar').show()
})

$('#register').on('submit', function(e) {
  e.preventDefault()
  register()
})
$('#login').on('submit', function(e) {
  e.preventDefault()
  login()
})

// TESTING CLASS BACK
$('.back').on('click', function(e) {
  e.preventDefault()
  failLogin()
})

$('#add').on('submit', function(e) {
  e.preventDefault()
  add()
})
$('#update').on('submit',function (e) {
  e.preventDefault()
  edit()
})
$('#addMember').on('submit', function(e) {
  e.preventDefault()
  const email = $('#emailMember').val()
  $('#loader').show()
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/user`,
    data: { email: email },
    dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done(result => {
    const UserId = result.id
    const TodoId = $('#listProject').val()
    $.ajax({
      type: 'POST',
      url: `${BASE_URL}/members`,
      data: { UserId, TodoId },
      dataType: 'json',
      beforeSend: function(req) {
        req.setRequestHeader('access_token', localStorage.getItem('access_token'))
      }
    })
    .done(newMember => {
      console.log(newMember)
    })
    .fail(err => {
      swal.fire({
                    type: "error",
                    title: "Email Already Used",
                    timer: 1500
                })
    })
    $('#loader').hide()
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'User Not Found!',
      text: 'Add by your partners email',
      timer: 1500
    })
    $('#loader').hide()
  })
})

//ERROR LOGIN

function failLogin() {
  $('.todos').hide()
  $('#home').hide()
  $('#loginForm').show()
  // $('#Flex-01').hide()

}
function successLogin() {
  getTodos()
  $('.todos').hide()
  $('#home').show()
  $('#navbar').show()
  $('#Flex-01').show()
  reset()
  showName()
  showQuotes()
}

//REGISTER PAGE
function register() {
  const data = {
    name: $('#nameRegister').val(),
    email: $('#emailRegister').val(),
    password: $('#passwordRegister').val(),
  }
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/register`,
    data: data,
    dataType: 'json'
  })
  .done(() => {
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed up successfully'
    })
    reset()
    failLogin()
  })
  .fail(err => {
    if(err.responseJSON.message){
      swal.fire({
        type: "error",
        title: `${err.responseJSON.message}`,
        timer: 1500
    })
    }else{      
      err.responseJSON.forEach(error => {
        swal.fire({
          type: "error",
          title: `${error}`,
          timer: 1500
      })
      })
    }
  })
}

//LOGIN PAGE
function login() {
  const data = {
    email: $('#emailLogin').val(),
    password: $('#passwordLogin').val(),
  }
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/login`,
    data: data,
    dataType: 'json'
  })
  .done(result => {
      const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
    localStorage.setItem('access_token', result.access_token)
    successLogin()
  })
  .fail(err => {
    if(err.responseJSON.message){
      swal.fire({
        type: "error",
        title: `${err.responseJSON.message}`,
        timer: 1500
    })
    }else{      
      err.responseJSON.forEach(error => {
        swal.fire({
          type: "error",
          title: `${error} / Email`,
          timer: 1500
      })
      })
    }
  })
}

//LOGOUT BUTTON
function logout() {
  localStorage.removeItem('access_token')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    // console.log('User signed out.');
  });
  failLogin()
  reset()
}

//FUNCTION RESET PAGE
function reset() {
  $('#nameRegister').val('')
  $('#emailRegister').val('')
  $('#passwordRegister').val('')
  $('#emailLogin').val('')
  $('#passwordLogin').val('')
  $('#title').val('')
  $('#description').val('')
  $('#status').val('')
  $('#due_date').val('')
  $('#titleUpdate').val('')
  $('#descriptionUpdate').val('')
  $('#statusUpdate').val('')
  $('#due_dateUpdate').val('')
}

//3rd Party Quotes
function showQuotes(){
  $.ajax({
      method: "GET",
      url: `${BASE_URL}/quote`,
      dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done(function(resp){
      $("#Flex-01").empty()
      console.log(resp, 'Ini dari ajax');
      resp.forEach(data => {
      $("#Flex-01").append(`
      <div id="quotes">
          <h2>QUOTE OF THE DAY</h2> <br>
          <h5 style="color: #E89923;">${data.quote}</h5> <br>
          <p style="color: grey">- ${data.author} -</p>
      </div>
      `)
      });
  })
  .fail(function(err){
      console.log(err);
  })
}


//SHOW ALL TODOS BY USERID
function getTodos() {
  getMembers()
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/todos`,
    dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }

  })
  .done(todos => {
    $('#showTodos').empty()
    $('#listProject').empty()
    let i = 1;
    todos.forEach(todo => {
      let datetime = (todo.due_date).substring(0, 10).split('-')
      date = `${datetime[2]}-${datetime[1]}-${datetime[0]}`

      let text = `Your Todo \n\nTitle: ${todo.title}\nDescription: ${todo.description}\nDue Date: ${date}\nStatus: ${todo.status}`
      let encoded = encodeURI(text)
      $('#showTodos').append(`
        <tr>
          <th scope="row" style="color: grey;">${i++}</th>
          <td style="color: grey;">${todo.title}</td>
          <td style="color: grey;">${todo.description}</td>
          <td style="color: grey;">${date}</td>
          <td style="color: grey;">${todo.status}</td>

          <td>
            <button type="button" class="btn btn-sm btn-primary" onclick="editForm('${todo.id}')">Edit</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="deleteTodo('${todo.id}')">Delete</button>
          </td>
        </tr>
      `)
      $('#listProject').append(`
        <option value="${todo.id}">${todo.title}</option>
      `)
    })
  })
  .fail(err => {
    $('#errorMessage').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Your Session has been expired</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `)
    logout()
  })
}

//ADD MEMBER FUNCTION
function addMember() {
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/members`,
    dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done((data) => {
    console.log(data)
  })
  .fail(err => {
    console.log(err)
  })
}

function getMembers() {
  $('#showMember').empty()
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/members`,
    dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done((members) => {
    console.log(members)
    members.forEach(info => {
      console.log(info.id)
      if(info.Todo !== null && info.User !== null) {
        $('#showMember').append(`
        <tr>
          <td>Mamama</td>
          <td>${info.Todo.title}</td>
          <td>${info.User.name}</td>
          <td><button type="button" class="btn btn-sm btn-danger" onclick="deleteMember('${info.id}')">Delete from project</button></td>
        </tr>
      `)
      }else{
        console.log('Masukinn')
      }
    })
  })
  .fail((err) => {
    console.log(err)
  })
}


//ADD TODOS
function add() {
  let data = {
    title: $('#title').val(),
    description: $('#description').val(),
    status: $('#status').val(),
    due_date: $('#due_date').val(),
  }
  if (data.title != '' && data.description != '' && data.status != '' && data.due_date != "") {
    if(new Date(data.due_date) >= new Date()){
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/todos`,
    data: data,
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    } 
  })
  .done(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Created New Todo'
    })
    successLogin()
  })
  .fail((err) => {
    $('#errorMessage').append(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Internal server error</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `)
  })
  } else {
     swal.fire({
       type: "error",
       title: "Date must be higher than today",
       timer: 1500
    })
  }
} else {
    swal.fire({
      type: "error",
      title: "Please complete the form !!",
      timer: 1500
    })
  }
}

//EDIT TODO
function editForm(id) {
  $('.todos').hide()
  $('#updateForm').show()
  $('#navbar').show()
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/todos/${id}`,
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done(todo => {
    $('#idUpdate').val(`${todo.id}`)
    $('#titleUpdate').val(`${todo.title}`)
    $('#descriptionUpdate').val(`${todo.description}`)
    $('#statusUpdate').val(`${todo.status}`)
    $('#due_dateUpdate').val(`${todo["due_date"].substr(0, 10)}`)
  })
  .fail(err => {
    console.log(err)
  })
}

//UPDATE EDIT
function edit() {
  let id = $('#idUpdate').val()
  let data = {
    title: $('#titleUpdate').val(),
    description: $('#descriptionUpdate').val(),
    status: $('#statusUpdate').val(),
    due_date: $('#due_dateUpdate').val(),
  }

 $.ajax({
   type: 'PUT',
   url: `${BASE_URL}/todos/${id}`,
   data: data,
   dataType: 'json',
   beforeSend: function(req) {
     req.setRequestHeader('access_token', localStorage.getItem('access_token'))
   }
 })
 .done(() => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Todo has been updated!'
  })
  successLogin()
 })
 .fail((err) => {
    $('#errorMessage').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Internal server error</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `)
 })
}

//DELETE TODO
function deleteTodo(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/todos/${id}`,
        dataType: 'json',
        beforeSend: function(req) {
          req.setRequestHeader('access_token', localStorage.getItem('access_token'))
        }
      })
      .done(() => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        successLogin()
      })
      .fail((err) => {
        $('#errorMessage').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Internal server error</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `)
      })
    }
  })
}


//GOOGLE TOKEN LOGIN
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  sendGoogleToken(id_token)
}

function sendGoogleToken(id_token) {
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/googleSignIn`,
    data: { 'token': id_token }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    successLogin()
  })
  .fail(err => {
    console.log(err)
  })
}

//SHOW USERNAME
function showName() {
  $.ajax({
    type: 'get',
    url: `${BASE_URL}/user`,
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done(userData => {
    $('#username').empty()
    $('#username').append(`${userData.name}`)
  })
  .fail(() => {
    $('#username').empty()
    $('#username').append(`Cannot get name`)
  })
}


//PROJECT MEMBERS
function getProjects() {
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/projects`,
    dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done(projects => {
    console.log(projects)
  })
  .fail(err => {
    console.log(err)
  })
}

//LOADING SESSION
function loadingPage() {
  $('.todos').hide()
}
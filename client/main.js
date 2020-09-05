
function clickHideOther(event){
  // console.log("work")
  let containerList = [
    "#register-form-container",
    "#todo-list-container",
    "#login-form-container",
  ]
  // let result;
  // console.log(containerList)
  containerList.forEach(function(el){
    // console.log(el)
    // console.log(event, el);
    if (event.data.element=== el){
      $(`${el}`).show()
    } else {
      $(`${el}`).hide()
    }
  })
  // let test = $("#todo-list-container").css("display")
  // console.log(test, "<<< todo list");

  if($("#todo-list-container").css("display") === "block"){
    todoList()
  }
  
}
function hideOther(element){
  // console.log("work")
  let containerList = [
    "#register-form-container",
    "#todo-list-container",
    "#login-form-container",
    
  ]
  // let result;
  // console.log(containerList)
  containerList.forEach(function(el){
    // console.log(event, el);
    if (element=== el){
      $(`${el}`).show()
    } else {
      $(`${el}`).hide()
    }
  })
  if($("#todo-list-container").css("display") === "block"){
    todoList()
  }
}

function toggleShowAddFormFadeTodoList(event){
  $("#add-todo-data").toggle("slow", function(){

    $("#todo-list-content").fadeToggle("slow")
    
  })
}
function login(event){
  event.preventDefault()
  // let email = $("#email-login").val();
  let username = $("#username-login").val();
  let password = $("#password-login").val();
  // console.log(username, password)
  $.ajax({
    method: "POST",
    url:`http://localhost:3000/users/login`,
    data:{
      username,
      password
    }
  })
    .done(function(res){
      localStorage.setItem("access_token", res.access_token)
      hideOther("#todo-list-container")
      $("#nav-login").hide()
      $("#nav-register").hide()
      $("#nav-todo-list").show()
      $("#nav-logout").show()
      
      todoList()
    })
    .fail(function(err){
      $("#error-login p").replaceWith(`<p>${err.responseJSON.errors}</p>`)
    })
}

function register(event){
    event.preventDefault()
    let username = $("#username-register").val();
    let password = $("#password-register").val();
    let email= $("#email-register").val();
    $.ajax({
      method: "POST",
      url:"http://localhost:3000/users/register",
      data:{
        username,
        password,
        email
      }
    })
      .done(function(res){
        hideOther("#login-form-container")
        $("#error-login p").replaceWith(`<p>Register Success!</p>`)
        
      })
      .fail(function(err){
        $("#error-register p").replaceWith(`<p>${err.responseJSON.errors.join("<br>")}</p>`)

      })

}
function onSignIn(googleUser){
  // mengambil akses token google setiap kali sudah sign in
  const google_access_token = googleUser.getAuthResponse().id_token;

  // console.log(google_access_token, '>>> google id token');
  
  $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/google-login',
      headers : {
          google_access_token
      }
  })
      .done((res) => {
          console.log(res);
          localStorage.setItem('access_token', res.access_token)
          hideOther("#todo-list-container")
          $("#nav-login").hide()
          $("#nav-register").hide()
          $("#nav-todo-list").show()
          $("#nav-logout").show()

          
          // todoList()
      })
      .fail((err) => {
          console.log(err);
      })
}
function logout(event){
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
  hideOther("#login-form-container")
  $("#nav-todo-list").hide();
  $("#nav-login").show()
  $("#nav-register").show()
  $("#nav-logout").show()

}

function todoList(event){
  // event.preventDefault()
  console.log(event);
  if($("#todo-list-content").length > 0){
    $("#todo-list-content").empty()
  }
  $.ajax({
    method: "GET",
    url:"http://localhost:3000/todos",
    headers: {
      access_token : localStorage.getItem("access_token")
    }
  })
    .done(function(res){
    //  console.log(res, "dari todo list", this);
    console.log(res);
     if(res.length > 0){
      res.forEach(function(el){
        let background_color= "white";
        if(el.status === "complete"){
          background_color="grey"
        }
        $("#todo-list-content").append(`
          <div class="card" style="width: 18rem;background-color:${background_color}" id=${el.id}>
            <div class="card-body">
              <h5 class="card-title todo-title">${el.title}</h5>
              <p class="card-text todo-description">${el.description}</p>
              <p class="card-text todo-due-date">${el.due_date.substring(0, 10)}</p>
              <button class="btn btn-primary edit-todo-button" type="submit" id="edit-button-${el.id}">Edit</button>
              <button class="btn btn-primary delete-todo-button" type="submit">Delete</button>
            </div>
          </div>
        `)
       })
     }
     else{
      $("#todo-list-content").append(`
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h1 class="card-title">You don't have any task</h1>
        </div>
      </div>
      `)
     }


    })
    .fail(function(err){
      console.log(err);
    })
}

function addTodo(event){
  event.preventDefault()
  // console.log($(this).children("form"), "form");
  let cardBody=$(this).children()[0]
  let form= $(cardBody).children()[0]
  let inputs = $(form).children("input")
  // console.log(inputs[0], "inputs");
  let title = $("#title-add-form").val()
  let description= $("#desc-add-form").val()
  let due_date= $("#due-date-add-form").val()
  let status="uncomplete" 
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/todos",
    headers:{
      access_token : localStorage.getItem("access_token")
    },
    data:{
      title,
      description,
      due_date,
      status
    }
  })
    .done(function(res){
      // console.log(res);
      todoList()
      toggleShowAddFormFadeTodoList()
      $(inputs).val("")
    })
    .fail(function(err){
      console.log(err);
      $("#error-add-todo-form p").replaceWith(`<p>${err.responseJSON.errors.join("<br>")}</p>`)
      // $(inputs).val("")


    })
}

function editTodo(event){
  event.preventDefault()
    //$(this).parents()[1] this is the card of every task
    let parent = $(this).parents()[1]
    let id = $(parent).attr( "id" )
    let title= $(this).parent().children(".todo-title").text()
    let description=$(this).parent().children(".todo-description").text()
    let due_date=$(this).parent().children(".todo-due-date").text()
    let background= "white"
    let status="uncomplete"
    let check;
    // console.log(id, title, description, due_date);
    // console.log($(this).parents()[1]);
    // console.log($(parent).css("background-color")); 
    if($(parent).css("background-color") === "rgb(128, 128, 128)"){
      background = "grey"
      status = "complete"
      check = "checked"
    }
    $(parent).append(`
    <div class="card-body">
      <form id= "edit-todo-data-form" style= "background-color:${background}">
        <small id="error-edit-todo-form" class="form-text text-muted"><p></p></small>

        <br>
        <input type="text" id="title-edit-form" name="title" placeholder="Title" value="${title}" style= "background-color:${background}">

        <hr>

        <br>
        <input type="text" id="desc-edit-form" name="description" placeholder="Description" value="${description}" style= "background-color:${background}">

        <hr>

        <br>
        <input type="date" id="due-date-edit-form" value="${due_date}" style= "background-color:${background}">

        <br>
        <br>

        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="customCheck1" ${check}>
          <label class="custom-control-label" for="customCheck1">Complete</label>
         </div>

        <br>
        <br>

        <button type="submit" class="btn btn-primary" id="edit-submit-button">Done</button>
      </form>
    </div>
    `)
    $(this).parent().remove()
}

function doneEditTodo(event){
  event.preventDefault()
  let divCard = $(this).parents()[2];
  let form= $(this).parents()[0] //form 
  let id = $(divCard).attr("id") //.div#card
  let title = $(form).children("#title-edit-form").val()
  let description= $(form).children("#desc-edit-form").val()
  let due_date= $(form).children("#due-date-edit-form").val()
  let status = "uncomplete";
  if ($(form).css("background-color") === "rgb(128, 128, 128)"){
    status = "complete"
  }
  $.ajax({
    method : "PUT",
    url : `http://localhost:3000/todos/${id}`,
    headers:{
      access_token : localStorage.getItem("access_token")
    },
    data:{
      id,
      title,
      description,
      due_date,
      status
    }
  })
    .done(function(res){
      hideOther("#todo-list-container")
    })
    .fail(function(err){
      // console.log($(form).children("small"));
      $(form).children("small").replaceWith(`<p>${err.responseJSON.errors.join("<br>")}</p>`)
    })
  // console.log(id,title, description, due_date)
}
function deleteTodo(event){
  event.preventDefault()
  let divCard = $(this).parents()[1];
  let id = $(divCard).attr("id") //.div#card
  // console.log(id);
  $.ajax({
    method : "DELETE",
    url : `http://localhost:3000/todos/${id}`,
    headers:{
      access_token : localStorage.getItem("access_token")
    },
  })
    .done(function(res){
      hideOther("#todo-list-container")
    })
    .fail(function(err){
      console.log(err);

    })
  // console.log(id,title, description, due_date)
}
function checkboxComplete(event) {
  // this will contain a reference to the checkbox   
  let form = $(this).parents()[1];
  let divCard = $(this).parents()[3];
  
  let inputs = $(form).children('input');
  // console.log(this.checked); 
  if (this.checked) {
      // the checkbox is now checked 
      $(form).css("background-color", "grey")
      $(divCard).css("background-color", "grey")
      $(inputs).css("background-color", "grey")
 

  } else {
      // the checkbox is now no longer checked

      $(form).css("background-color", "white")
      $(divCard).css("background-color", "white")
      $(inputs).css("background-color", "white")
 

  }
}
$(document).ready(function(){
  if(!localStorage.access_token){       //if not login show login page
    $("#nav-todo-list").hide();
    $("#todo-list-container").hide()
    // console.log("work this")
    $("#register-form-container").hide()
    $("#nav-logout").hide()


  } else {                                  //else show todo-list page
    $("#register-form-container").hide()
    $("#login-form-container").hide()
    $("#nav-login").hide()
    $("#nav-register").hide()
    // console.log("work asdas")
    // todoList()
  }

  //ALL CLICK FUNCTION
  $("#nav-login").click({element :"#login-form-container"},clickHideOther)
  $("#nav-logout").click(logout)
  $("#nav-register").click({element :"#register-form-container"},clickHideOther)
  $("#nav-todo-list").click({element :"#todo-list-container"},clickHideOther)
  $("#add-todo-button").click(toggleShowAddFormFadeTodoList)
  $("#todo-list-content").on("click", ".edit-todo-button" , editTodo);
  $(document).on( "click", ".delete-todo-button", deleteTodo);

  //ALL SUBMIT BUTTON FUNCTION
  $("#login-form").submit(login)
  $("#register-form").submit(register)
  $("#add-todo-data-form").submit(addTodo)

  $(document).on( "click", "#edit-submit-button", doneEditTodo);

  $(document).on( "click", ".custom-control-input", checkboxComplete);



})
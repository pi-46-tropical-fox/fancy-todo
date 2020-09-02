

function hideOther(event){
  // console.log("work")
  let containerList = [
    "#register-form-container",
    "#todo-list",
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
  
}


$(document).ready(function(){
  $("#nav-todo-list").hide();
  $("#todo-list").hide()
  $("#register-form-container").hide()
  // $("#nav-login").click(login)
  // $("#nav-register").click(register)
  // $("#nav-todo-list").click(todoList)
  $("#nav-login").click({element :"#login-form-container"},hideOther)
  $("#nav-register").click({element :"#register-form-container"},hideOther)
  $("#nav-todo-list").click({element :"#todo-list"},hideOther)
  $("#add-todo-button").click(function(){
    $("#add-todo-data").toggle("slow", function(){
      $("#nav-todo-list").blur()
    })
  })

  $("#login-form").submit(function(event){
    event.preventDefault()
    // let email = $("#email-login").val();
    let username = $("#username-login").val();
    let password = $("#password-login").val();
    console.log(username, password)
    $.ajax({
      method: "POST",
      url:"http://localhost:3000/users/login",
      data:{
        username,
        password
      }
    })
      .done(function(res){
        localStorage.setItem("access_token", res.access_token)
      })
      .fail(function(err){
        let errors
        // err.responseJSON.forEach(el => {
        //   errors = errors + 
        // });
        // console.log(err.responseJSON)
        $("#error-login p").replaceWith(`<p>${err.responseJSON.errors}</p>`)
      })
  })
})
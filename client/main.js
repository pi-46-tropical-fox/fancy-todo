const menuLogin = (event) =>{
    $('.login').show();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

const menuRegister = (event) =>{
    $('.login').hide();
    $('.register').show();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

const menuAdd = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').show();
    $('.edit').hide();
    $('.todo').hide();
}

const menuEdit = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').hide();
    $('.edit').show();
    $('.todo').hide();
}

const menuHome = (event) =>{
    $('.login').show();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

const initContent = (event) =>{
    $('.login').hide();
    $('.register').hide();
    $('.add').hide();
    $('.edit').hide();
    $('.todo').hide();
}

$(document).ready(function(){
    $('#nav-login').click(menuLogin)
    $('#nav-register').click(menuRegister)
    $('#logout').click(menuHome)
    $('#edit-todo').click(menuEdit)
    $('#add-todo').click(menuAdd)
    initContent()

    // login 
    $('#formLogin').submit(function(event){
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        console.log(email,password);
        
        $.ajax({
            method: 'POST',
            url:'http://localhost:3000/users/login',
            data:{
                email,
                password
            }
        })
        .done((response) =>{
            console.log(response)
        })
        .fail((err) =>{
            console.log(err)
        })
    })


})
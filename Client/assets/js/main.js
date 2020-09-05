function initial(event) {
    $('#bckg-img').show()
    $('#register').hide()
    $('#login').hide()
    $('#navBar').hide()
    $('#projectList').hide()
    $('#editProject').hide()
    $('#addProject').hide()
    $('#menuTasks').hide()
    $('#editTask').hide()
    $('#addTask').hide()
    $('#apiNews').hide()
    
}

function menuLogin(event) {
    initial()
    $('#login').show()
}

function submitLogin(event) {
    event.preventDefault()
    const email = $('#emailLogin').val()
    const password = $('#passwordLogin').val()
    console.log(email, password)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
    .done((response) => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('user_id', response.id)
        localStorage.setItem('user_name', response.name)
        localStorage.setItem('user_role', response.role)
        menuProject()
    })
    .fail((err) => {
        console.log(err)
    })

}

function menuRegister(event) {
    initial()
    $('#register').show()
}

function submitRegister(event) {
    event.preventDefault()
    const name = $('#registerName').val()
    const email = $('#registerEmail').val()
    const password = $('#registerPassword').val()
    const pictureUrl = $('#registerPictureUrl').val()
    const role = $('#registerRole').val()
    console.log(name, email, password, pictureUrl, role)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            name,
            email,
            password,
            pictureUrl,
            role
        }
    })
    .done((response) => {
        console.log(response)
        $('#registerName').val('')
        $('#registerEmail').val('')
        $('#registerPassword').val('')
        $('#registerPictureUrl').val('')
        $('#registerRole').val('')
        menuLogin()
    })
    .fail((err) => {
        console.log(err)
    })
}

function menuLogout(event) {
    googleSignOut()
    localStorage.clear()
    menuLogin()
}

function onSignIn(googleUser) {
    //google signin
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
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('user_name', response.name)
        localStorage.setItem('user_role', response.role)
        menuProject()
    })
    .fail((err) => {
        console.log(err)
    })
}

function googleSignOut() {
    //google signout
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function menuProject(event) {
    initial()
    $('#navBar').show()
    $('#displayUserName').text(localStorage.getItem('user_name'))
    $('#diplayUserRole').text(localStorage.getItem('user_role'))
    
    $('#projectList').show()

    const access_token =localStorage.getItem('access_token')

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/projects',
        headers: {
            access_token
        }
    })
    .done(response => {
        console.log(response)
        $('#projectDashboard').empty()

        response.forEach(element => {
            $('#projectDashboard').append(`
            <div class="lg:flex lg:items-center lg:justify-between">
            <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                ${element.projectName}
            </h2>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                <div class="mt-2 flex items-center text-sm leading-5 text-black-500 sm:mr-6">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Description: <span>${element.projectDescription}</span>
                </div>
                <div class="mt-2 flex items-center text-sm leading-5 text-black-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                Closing on ${element.due_date}
                </div>
            </div>
            </div>
            <div class="mt-5 flex lg:mt-0 lg:ml-4">
            <span class="hidden sm:block shadow-sm rounded-md">
                <a href="#" data-id="${element.id}" onclick="menuEditProject(event)" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
                </a>
            </span>
            <span class="hidden sm:block ml-3 shadow-sm rounded-md">
                <a href="#" data-id="${element.id}" onclick="menuTask(event)" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                </svg>
                View
                </a>
            </span>
            <span class="hidden sm:block shadow-sm rounded-md">
                <a href="#" data-id="${element.id}" onclick="deleteProject(event)" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-red-700 bg-red hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                Delete
                </a>
            </span>    
            </div>
        </div> <br> <br>
            `)
        });

    })
    .fail((err) => {
        console.log(err)
    })
}

function menuAddProject(event) {
    initial()
    $('#navBar').show()
    $('#addProject').show()
}

function submitAddProject(event) {
    console.log('masuk')
    // event.preventDefault()
    let projectName = $('#addProjectName').val()
    let projectDescription = $('#addProjectDescription').val()
    let due_date = $('#addProjectDueDate').val()
    console.log(projectName, projectDescription, due_date)

    let access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/projects',
        data: {
            projectName,
            projectDescription,
            due_date
        },
        headers: {
            access_token
        }
    })
    .done((response) => {
        console.log(response)
        $('#addProjectName').val('')
        $('#addProjectDescription').val('')
        $('#addProjectDueDate').val('')
        menuProject()
    })
    .fail((err) => {
        console.log(err)
    })
}

function menuEditProject(event) {
    console.log(event.srcElement.dataset.id)
    localStorage.setItem('projectId', event.srcElement.dataset.id)
    
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projects/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        initial()
        $('#navBar').show()
        $('#editProject').show()
        console.log(data)

        $('#form-editProject').empty()

        $('#form-editProject').append(`
        <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Project
          </label>
          <input id="editProjectName" value="${data.projectName}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text">
          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Due Date
          </label>
          <input id="editProjectDueDate" value="${data.due_date}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Description
          </label>
          <input id="editProjectDescription" value="${data.projectDescription}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
          <p class="text-gray-600 text-xs italic">Elaborate the detail of your project</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Update
          </button>
      </div>
        `)

        $('#form-editProject').show()
        
    })
    .fail(err => {
        console.log(err)
    })
}

function submitEditProject(event) {
    event.preventDefault()
    let projectName = $('#editProjectName').val()
    let projectDescription = $('#editProjectDescription').val()
    let due_date = $('#editProjectDueDate').val()
    console.log(projectName, projectDescription, due_date)

    let access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/projects/${localStorage.getItem('projectId')}`,
        data: {
            projectName,
            projectDescription,
            due_date
        },
        headers: {
            access_token
        }
    })
    .done((response) => {
        console.log(response)
        menuProject()
    })
    .fail((err) => {
        console.log(err)
    })
}

function deleteProject(event) {
    console.log(event.srcElement.dataset.id)
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/projects/${event.srcElement.dataset.id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        menuProject()
    })
    .fail(err => {
        console.log(err)
    })
}

function menuTask(event) {
    const access_token =localStorage.getItem('access_token')

    localStorage.setItem('projectId', event.srcElement.dataset.id)

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projects/${event.srcElement.dataset.id}`,
        headers: {
            access_token
        }
    })
    .done(response => {
        console.log(response, '<<response')
        initial()
        $('#navBar').show()
        $('#displayUserName').text(localStorage.getItem('user_name'))
        $('#diplayUserRole').text(localStorage.getItem('user_role'))
        $('#menuTasks').show()

        
        $('#projectHeader').empty()
        $('#projectHeader').append(`
            <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                ${response.projectName}
            </h2>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                <div class="mt-2 flex items-center text-sm leading-5 text-black-500 sm:mr-6">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Description: <span>${response.projectDescription}</span>
                </div>
                <div class="mt-2 flex items-center text-sm leading-5 text-black-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                Closing on ${response.due_date}
                </div>
            </div>
            </div>
        `)

        console.log(response.users)
        $('#tableTask').empty()
        response.Users.forEach(element => {
            let tempStatus = "Active"
            if(element.Todo.status == true){
                tempStatus = "Completed"
            }
            $('#tableTask').append(`
            <tr>
                <td class="px-6 py-4 whitespace-no-wrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="${element.pictureUrl}" alt="">
                    </div>
                    <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-gray-900">
                        ${element.name}
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                        ${element.email}
                    </div>
                    </div>
                </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                <div class="text-sm leading-5 text-gray-900">${element.Todo.title}</div>
                <div class="text-sm leading-5 text-gray-500">${element.Todo.description}</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    ${tempStatus}
                </span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    ${element.Todo.due_date}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    ${element.role}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a href="#" data-title="${element.Todo.title}" onclick="menuEditTask(event)" class="text-indigo-600 hover:text-indigo-900">Edit</a> |
                <a href="#" data-title="${element.Todo.title}" onclick="deleteTask(event)" class="text-indigo-600 hover:text-indigo-900">Delete</a>
                </td>
            </tr>
            `)
        })

    })
    .fail(err => {
        console.log(err)
    })
}

function menuAddTask(event) {
    initial()
    $('#navBar').show()
    $('#displayUserName').text(localStorage.getItem('user_name'))
    $('#diplayUserRole').text(localStorage.getItem('user_role'))
    $('#addTask').show()
}

function submitAddTask(event) {
    event.preventDefault()
    let title = $('#addTaskTitle').val()
    let description =  $('#addTaskDescription').val()
    let due_date =  $('#addTaskDueDate').val()
    let UserId =  localStorage.getItem('user_id')
    let ProjectId =  localStorage.getItem('projectId')
    console.log(title, description, due_date, UserId, ProjectId)

    let access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data: {
            title,
            description,
            due_date,
            UserId,
            ProjectId
        },
        headers: {
            access_token
        }
    })
    .done((response) => {
        console.log(response)
        $('#addTaskTitle').val('')
        $('#addTaskDescription').val('')
        $('#addTaskDueDate').val('')
        menuProject()
    })
    .fail((err) => {
        console.log(err)
    })
}

function menuEditTask(event) {
    console.log(event.srcElement.dataset.title)

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.title}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response, '<<<data')
        initial()
        $('#navBar').show()
        $('#displayUserName').text(localStorage.getItem('user_name'))
        $('#diplayUserRole').text(localStorage.getItem('user_role'))

        $('#editTask').empty()

        $('#editTask').append(`
        <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div class="max-w-md w-full">
              <div>
                   <h2 class="mt-6 text-center text-4xl leading-9 font-extrabold text-gray-900">
                      Edit Task
                      </h2>
              </div><br>

                  <form id="formEditTask" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Task Name
                          </label>
                          <input id="addTaskTitle" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Task Name">
                          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Due Date
                          </label>
                          <input id="addTaskDueDate" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date">
                        </div>
                      </div>
                      <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Description
                          </label>
                          <input id="addTaskDescription" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Description">
                          <p class="text-gray-600 text-xs italic">Elaborate the detail of your task</p>
                        </div>
                      </div>

                      <div class="flex items-center justify-between">
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Add Task
                          </button>
                      </div>
                  </form>
          </div>
      </div>
        `)








        // $('#editTask').append(`
        // <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        //     <div class="max-w-md w-full">
        //         <div>
        //             <h2 class="mt-6 text-center text-4xl leading-9 font-extrabold text-gray-900">
        //                 Update a Task
        //                 </h2>
        //         </div><br>

        //             <form id="editTaskForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        //                 <div class="flex flex-wrap -mx-3 mb-6">
        //                     <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        //                     <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        //                         Task Name
        //                     </label>
        //                     <input id="editTaskTitle" value="${response.title}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text">
        //                     <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        //                     </div>
        //                     <div class="w-full md:w-1/2 px-3">
        //                     <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        //                         Due Date
        //                     </label>
        //                     <input id="editTaskDueDate" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date">
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-wrap -mx-3 mb-6">
        //                     <div class="w-full px-3">
        //                     <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        //                         Description
        //                     </label>
        //                     <input id="editTaskDescription" value="${response.description}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"type="text">
        //                     <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-wrap -mx-3 mb-2">
        //                     <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        //                     <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        //                         Status
        //                     </label>
        //                     <div class="relative">
        //                         <select id="editTaskStatus" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        //                         <option value="false">Active</option>
        //                         <option value="true">Completed</option>
        //                         </select>
        //                         <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        //                         <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        //                         </div>
        //                     </div>
        //                     </div>
        //                 </div><br>
        //                 <div class="flex items-center justify-between">
        //                     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        //                       Update
        //                     </button>
        //                 </div>
        //             </form>
        //     </div>
        // </div>
        // `)
        $('#editTask').show()

    })
    .fail((err) => {
        console.log(err)
    })
}

function submitEditTask(event) {
    event.preventDefault()
    console.log('masuk')
    // let title = $('#editTaskTitle').val()
    // let description =  $('#editTaskDescription').val()
    // let due_date = $('#editTaskDueDate').val()
    // let status =  $('#addTaskStatus').val()
    // console.log(title, description, due_date, status)

    // let access_token = localStorage.getItem('access_token')

    // $.ajax({
    //     method: 'POST',
    //     url: 'http://localhost:3000/todos',
    //     data: {
    //         title,
    //         description,
    //         due_date,
    //         UserId,
    //         ProjectId
    //     },
    //     headers: {
    //         access_token
    //     }
    // })
    // .done((response) => {

    // })
}

function deleteTask(event) {
    console.log(event.srcElement.dataset.title)
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${event.srcElement.dataset.title}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        menuProject()
    })
    .fail(err => {
        console.log(err)
    })
}

function apiNews(event) {
    initial()
    $('#navBar').show()
    $('#displayUserName').text(localStorage.getItem('user_name'))
    $('#diplayUserRole').text(localStorage.getItem('user_role'))

    $('#apiNews').show()

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/news',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((response) => {
        console.log(response)
        $('#apiNews').empty()

        $('#apiNews').append(`
        <br>
        <div class="flex mb-4">
  
          <div class="w-1/3  h-12">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="${response.result[0].urlToImage}" alt="Sunset in the mountains">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">${response.result[0].title}</div>
              <p class="text-gray-700 text-base">
              ${response.result[0].description}
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${response.result[0].author}</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${response.result[0].source.name}</span>
              <a href="${response.result[0].url}" class="inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white-900 mr-2 mb-2">Read More</a>
            </div>
          </div>
  
         </div>
  
          <div class="w-1/3  h-12">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full" src="${response.result[1].urlToImage}" alt="Sunset in the mountains">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${response.result[1].title}</div>
                <p class="text-black-700 text-base">
                ${response.result[1].description}
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${response.result[1].author}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${response.result[1].source.name}</span>
                <a href="${response.result[1].url}"  class="inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white-900 mr-2 mb-2">Read More</a>
              </div>
            </div> 
          </div>
  
          <div class="w-1/3  h-12">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full" src="${response.result[2].urlToImage}" alt="Sunset in the mountains">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${response.result[2].title}</div>
                <p class="text-gray-700 text-base">
                ${response.result[2].description}
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${response.result[2].author}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${response.result[2].source.name}</span>
                <a href="${response.result[2].url}"  class="inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white-900 mr-2 mb-2">Read More</a>
              </div>
            </div>
          </div>
  
        </div>
        `)

        $('#apiNews').show()
     
    })
    .fail((err) => {
        console.log(err)
    })
}

$(document).ready(function() {
    menuLogin()


    $('#registerPath').click(menuRegister)
    $('#loginPath').click(menuLogin)

    $('#formLogin').submit(submitLogin)
    $('#formRegister').submit(submitRegister)
    $('#logoutPath').click(menuLogout)

    $('#projectListPath').click(menuProject)

    $('#addProjectPath').click(menuAddProject)
    $('#formAddProject').click(submitAddProject)
    $('#form-editProject').click(submitEditProject)

    $('#addTaskPath').click(menuAddTask)
    $('#formAddTask').click(submitAddTask)

    $('#formEditTask').click(submitEditTask)


    $('#apiExplore').click(apiNews)


})
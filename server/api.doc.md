# My Fancy Todo App Server
Application to manage your Todo list. This app has :
* TODO CRUD
* Register dan Login
* JSON formatted response
 

# RESTful endpoints
* POST/register         => Create account
* POST/login            => Create login 
* GET/todos             => Get all todos
* POST/todos            => Create todo
* PUT/todos/:id         => Edit one todo
* DELETE/todos/:id      => Delete one todo


# RESTful endpoints

I. REGISTER
  * Route
    POST/register

  * Request Header
    not needed

  * Request Body
      "username": "<name>",
      "email": "<email>",
      "password": "<password>"

  * Response (201)
    [
      {
        "id": 1,
        "username": "<user.name>",
        "email": "<user.email>",
        "password": "<user.password>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
      }
    ]

  * Response (500 - No Found)
    {
      "message": "Error internal server"
    }


II. LOGIN
  * Route
    POST/login

  * Request Header
    not needed

  * Request Body
      "username": "<name>",
      "password": "<password>"

  * Response (200)
    [
      {
      token,
        {
          "id": 1,
          "username": "<user.name>",
          "email": "<user.email>",
          "password": "<user.password>",
          "createdAt": "2020-03-20T07:15:12.149Z",
          "updatedAt": "2020-03-20T07:15:12.149Z"
        }
      }
    ]

  * Response (400 - Bad request)
    {
      "message": "Ivalid Username or Password"
    }
  * Response (500 - No Found)
    {
      "message": "Error internal server"
    }


III. GET ALL TODOS
  * Route
    GET/todos

  * Request Header
    not needed

  * Request Body
    not needed

  * Response (200)

    [
      {
        "id": 1,
        "title": "<todo.title>",
        "description": "<todo.description>",
        "status": "false",
        "due_date": "2020-10-7",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
      },
      {
        "id": 2,
        "title": "Push Rank",
        "description": "Push rank bareng temen-temen jam 12 malem sampai jam 6 sore",
        "status": "false",
        "due_date": "2020-10-7",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
      }
    ]

  * Response (404 - Not found)
    {
      "message": "Todo not found"
    }
  * Response (401 - User not authenticated)
    {
      "message": "User not authenticated"
    }
  * Response (500 - No Found)
    {
      "message": "Error internal server"
    }


IV. CREATE NEW TODO
  * Route
    POST/todos

  * Request Header
    not needed

  * Request Body
    {
      "title": "Push Rank",
      "description": "Push rank bareng temen-temen jam 12 malem sampai jam 6 sore",
      "due_date": "2020-10-7"
    }

  * Response (201)
    {
        "id": 1,
        "title": "Push Rank",
        "description": "Push rank bareng temen-temen jam 6 sore sampai jam 12 malam",
        "status": "false",
        "UserId": <user.id>,
        "due_date": "2020-10-7",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
      }

  * Response (401 - User not authenticated)
    {
      "message": "User not authenticated"
    }
  * Response (500 - No Found)
    {
      "message": "Error internal server"
    }


V. UPDATE TODO
  * Route
    PUT/todos/<id>

  * Request Header
    PUT/todos/<id>

  * Request Body
    {
      "title": "Push Rank",
      "description": "Push rank bareng temen-temen jam 12 malem sampai jam 6 sore",
      "status": "false",
      "due_date": "2020-10-7"
    }

  * Response (201)
    {
        "id": 1,
        "title": "Push Rank",
        "description": "Push rank bareng temen-temen jam 6 sore sampai jam 12 malam",
        "status": "false",
        "due_date": "2020-10-7",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
    }

  * Response (404 - No Found)
    {
      "message": "Todo not found"
    }
  * Response (403 - Not authorized)
    {
      "message": "Forbiden access"
    }
  * Response (401 - User not authenticated)
    {
      "message": "User not authenticated"
    }
  * Response (500 - No Found)
    {
      "message": "Error internal server"
    }


VI. DELETE TODO
  * Route
    DELETE/todos

  * Request Header
    PUT/todos/<id>

  * Request Body
    no needed

  * Response (201)
    {
        "message": "Successfuly delete todo"
    }

  * Response (404 - Not found)
    {
      "message": "Todo not found"
    }
  * Response (403 - Not authorized)
    {
      "message": "Forbiden access"
    }
  * Response (401 - User not authenticated)
    {
      "message": "User not authenticated"
    }
  * Response (500 - No Found)
    {
      "message": "Error internal server"
    }



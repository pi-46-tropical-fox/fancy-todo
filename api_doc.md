# My Fancy Todo App Server
My Fancy Todo App is an application to manage your activities. This app has : 
* RESTful endpoints for todo's CRUD operations
* JSON formatted response

&nbsp;

## Endpoints
```
 - POST /register
 - POST /login
 - POST /todos
 - GET /todos
 - GET /todos/:id
 - PUT /todos/:id
 - DELETE /todos/:id
```

## RESTful endpoints
### POST /register

> Register user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "johndoe",
  "email": "johndoe@mail.com",
  "password": "johndoe123"
}
```

_Response (201 - Created)_
```
{
  "id": "1",
  "email": "johndoe@mail.com"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message 1>",
  "<error message 2>",
  ...,
  "<error message n>"
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "johndoe@mail.com",
  "password": "johndoe123"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
[
  "The Email or Password is invalid."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-29",
  "UserId": 1
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-29T00:00:00.000Z",
  "UserId": 1,
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-27T07:15:12.149Z",
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": "ongoing",
    "due_date": "2020-01-29T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2020-01-27T07:15:12.149Z",
    "updatedAt": "2020-01-27T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Learn API Documentation",
    "description": "Learn how to create API Documentation with REST standard",
    "status": "done",
    "due_date": "2020-01-29T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2020-01-28T07:15:12.149Z",
    "updatedAt": "2020-01-28T07:15:12.149Z",
  }
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### GET /todos/:id

> Get todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-29",
  "UserId": 1,
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-27T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
[
  "The todo with id <todo id> was not found."
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### PUT /todos/:id

> Update todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Learn Node",
  "description": "Learn how to create app with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-30"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Learn Node",
  "description": "Learn how to create app with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-30",
  "UserId": 1,
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-29T07:15:12.149Z",
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### DELETE /todos/:id

> Delete todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": 2,
  "title": "Learn API Documentation",
  "description": "Learn how to create API Documentation with REST standard",
  "status": "done",
  "due_date": "2020-01-29",
  "UserId": 1,
  "createdAt": "2020-01-28T07:15:12.149Z",
  "updatedAt": "2020-01-28T07:15:12.149Z",
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```

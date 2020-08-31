# My Fancy Todo App Server
My Fancy Todo App is an application to manage your todos. This app has : 
* RESTful endpoint for todo's CRUD operation
*  formatted response

&nbsp;

## RESTful endpoints

* GET /todos
* POST /todos
* GET /todos/:id
* PUT /todos/:id
* DELETE /todos/:id
* POST /register
* POST /login


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

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

<!-- _Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
``` -->

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
---

### GET /todo/:id

> Get selected todo
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "id": <id of the todo to get>
}
```

_Response (200)_
```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Invalid request"
}
```
---

### PUT /todo/:id

> Get selected todo
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title to get update into>",
    "description": "<description to get update into>",
    "status": "<status to get update into>",
    "due date": "<due date to get update into>",
}
```

_Response (200)_
```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

<!-- _Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
``` -->

_Response (404 - Not Found)_
```
{
  "message": "Invalid request"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
---

### DELETE /todo/:id

> Get selected todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "id": <id of the todo to delete>
}
```

_Response (200)_
```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
<!-- _Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
``` -->

_Response (404 - Not Found)_
```
{
  "message": "Invalid request"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---

### POST /register

> Create new user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "<user name>",
    "email": "<user email>",
    "password": "<user password>",
}
```

_Response (201)_
```
{
    "id": <given id by system>,
    "name": "<posted user name>",
    "email": "<posted user email>",
    "password": "<posted hashed user password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
<!-- _Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
``` -->

_Response (500)_
```
{
  "message": "Internal server error"
}
```
---

### POST /login

> Login to app
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "email": "<user email to get insert into>",
  "password": "<user password to get insert>"
}
```

_Response (200)_
```
{
  "id": <id as requested>,
  "name": "<posted user name>",
  "email": "<posted user email>",
  "password": "<posted hashed user password>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Invalid request"
}
```

_Response (500)_
```
{
  "message": "Internal server error"
}
```
---

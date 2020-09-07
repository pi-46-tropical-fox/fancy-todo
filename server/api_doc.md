# My Todo App Server
Todo App is an application to manage your todo activity. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response
* JWT secret in .env is SECRET=thisismydeepestsecret

&nbsp;

## RESTful endpoints
```
  - GET /todos
  - POST /todos
  - GET /todos/:id
  - PUT /todos/:id
  - DELETE /todos/:id
  - POST /users/register
  - POST /users/login
```
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
  "id": <given id by auto-increment id system>,
  "title": "<posted todo title>",
  "description": "<posted todo description>",
  "status": "<posted todo status>",
  "due_date": "<posted todo due date>",
  "UserId": <posted todo owner>
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    Title must not empty!
    Minimum due date is today!
  ]
}
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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": <todo User ID that who ordered the task>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "UserId": <todo User ID that who ordered the task>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    User is not authenticated
  ]
}
```
---
### GET /todos/:id

> Get one todo

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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": <todo User ID that who ordered the task>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Todo not found"
  ]
}
```
---

### PUT /todos/:id

> Update todos by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": <request id of todo for update>
}
```

_Response (200 - OK)_
```
[
  {
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": <todo User ID>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (404 - Not Found)_
```
{
  "errors": [
    Todo not found
  ]
}
```
---

### DELETE /todos/:id
> delete todos by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": <request id of todo for delete>
}
```

_Response (200 - OK)_
```
todo has been successfully deleted
```

_Response (404 - Not found)_
```
{
  "errors": [
    Todo not found
  ]
}
```
---

### POST /users/register

> Register new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": <user todo app>,
  "email": <email user todo app>,
  "password": <password user todo app>
}
```

_Response (201 - Created)_
```
{
  "id": <given id by auto-increment id system>,
  "username": <posted user todo app>,
  "email": <posted email user todo app>,
  "password": <posted password user>,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    Username must be unique
    Email must be unique
    Minimum password is six characters
  ]
}
```
---
### POST /users/login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <email user todo app>,
  "password": <password user todo app>
}
```

_Response (200 - OK)_
```
not needed
```

_Response (400 - Bad Request)_
```
{  
  errors: [
    Invalid email or password
  ]

}
```
---
### POST /weather
_Request Header_
```
not needed
```

_Request Body_
```
{
  "city": <"your city name">
}
```

_Response (200 - OK)_
```
not needed
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /pexels
_Request Header_
```
not needed
```

_Request Body_
```
{
  "keyword": <"your keyword search">
}
```

_Response (200 - OK)_
```
not needed
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```






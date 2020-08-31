# Fancy Todo App Server
Fancy Todo App is an application to manage your fancy todo. This app has : 
* CRUD Todo's
* Register dan Login
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /register
- POST /login
- POST /todos
- GET /todos
- GET /todos/:id
- PUT /todos/id
- DELETE /todos/:id
```

## RESTful endpoints

### POST /user/register

> Create new user

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "firstname": "<firstname to get insert into>",
  "lastname": "<username to get insert into>",
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "firstname": "<posted firstname>",
  "lastname": "<posted lastname>",
  "username": "<posted username>",
  "email": "<posted email>",
  "password": "<posted password>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "firstname must be filled",
  "message": "lastname must be filled",
  "message": "username must be filled",
  "message": "email must be filled",
  "message": "password must be filled"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```

### POST /user/login

> Login user

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "username": "<username to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
  "username": "<user's username>",
  "email": "<user's email">
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "username or password is wrong"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```

### POST /todos

> Create new todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "validation errors"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```


### GET /todos

> Get all todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<todo's name>",
    "description": "<todo's description>",
    "status": "<todo's status>",
    "due_date": "<todo's due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo's name>",
    "description": "<todo's description>",
    "status": "<todo's status>",
    "due_date": "<todo's due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "cannot display todo's list"
}
```

---

### GET /todos/:id

> Get todo by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<todo's name>",
    "description": "<todo's description>",
    "status": "<todo's status>",
    "due_date": "<todo's due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (404 - Not Found)_
```json
{
  "message": "todo's not found"
}
```

---
### PUT /todos/:id

> Update todo by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (200)_
```json
{
  "id": 1,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "validation errors"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "todo's not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```

---

### DELETE /todos/:id

> Delete todo by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "msg": "Success Delete Todo With Id: ${id}"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "todo's not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
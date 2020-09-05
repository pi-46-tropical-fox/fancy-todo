# Todo Fancy App
Website for manage your todo. This app has : 
* CRUD Todo
* JSON formatted response

&nbsp;

## Endpoints
```
- GET /todos
- POST /todos
- GET /todos/:id
- PUT /todos/:id
- DELETE /todos/:id
- POST /register
- POST /login
```

## RESTful endpoints
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
    "id": "<todo id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": "<todo id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
}
```

_Response (201 - Created)_
```json
{
    "id": "<given id>",
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
  "message": "Validation Error"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### GET /todos/:id

> Get todos by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": "<id of todo>"
}
```

_Request Body_
```
  not needed
```

_Response (200)_
```json

{
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```
---
### PUT /todos/:id

> Update todos by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id of todo>"
}
```

_Request Body_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (200)_
```json

{
  "id": "<id of todo>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation errors"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
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

> Delete todos by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id of todo>"
}
```

_Request Body_
```
    not needed
```

_Response (200)_
```json
{
  "message": "successfully delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### POST /register

> Register
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
    not needed
```

_Request Body_
```json
{
    "username": "<username from body>",
    "email": "<email from body>",
    "password": "<password from body>"
}
```

_Response (201)_
```json
[
  {
    "username": "<username from body>",
    "email": "<email from body>",
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
---
### POST /login

> Login
_Request Header_
```json
not needed
```

_Request Params_
```json
    not needed
```

_Request Body_
```json
{
  "email": "<email from body>",
  "password": "<password from body>"
}
```

_Response (200)_
```json
{
  "access_token": "<access_token>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
# Fancy Todo App Server
Fancy Todo App is an application to manage your todo list. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## Endpoints
* POST /register
* POST /login
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* DELETE /todos/:id


## RESTful endpoints
### POST /register

> Create new user
Desc: - email must be unique

_Request Header_
```
no need
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "email": "<email to get insert into",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "<posted name>",
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid required users data"
}
```


### POST /login

> Login to app

_Request Header_
```
no need
```

_Request Body_
```json
{
  "email": "<email to get insert into, found into database>",
  "password": "<password to get insert into, found into database>"
}
```

_Response (200 - Ok)_
```json
{
  "access_token": "<token>"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Username or/and password is invalid"
}
```


### POST /todos

> Create new a todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due date": "<due date to get insert into, must be after todays date>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due date": "<posted due date>",
  "createdAt": "<posted createdAt date>",
  "updatedAt": "<posted updatedAt date>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title can not be empty"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /todos

> Get all todo list

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

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due date": "<posted due date>",
    "createdAt": "<posted createdAt date>",
    "updatedAt": "<posted updatedAt date>",
  }
]
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```



### GET /todos/:id

> Get a spesific todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Response (200 - Ok)_
```json
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due date": "<posted due date>",
    "createdAt": "<posted createdAt date>",
    "updatedAt": "<posted updatedAt date>",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```


### PUT /todos/:id

> Get a spesific todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "<title to get update into>",
    "description": "<description to get update into>",
    "status": "<status to get update into>",
    "due date": "<due date to get update into>",
}
```

_Response (200 - Ok)_
```json
{
    "id": <given id by system>,
    "title": "<updated title>",
    "description": "<updated description>",
    "status": "<updated status>",
    "due date": "<updated due date>",
    "createdAt": "<posted createdAt date>",
    "updatedAt": "<posted updatedAt date>",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /todos/:id

> Get a spesific todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Todo is successfully deleted!"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```
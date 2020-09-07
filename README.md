# Fancy-Todo
Fancy Todo App Server
Fancy Todo App is an application to manage your assets. This app has :

&nbsp;

## Endpoints
````
- POST /register
- POST /login
- POST /todos
- GET /todos
- GET /todos/:id
- PUT /todos/:id
- DELETE /todos/:id
````

## RESTful endpoints

## POST /register

> Create new user to database

_Request Header_

```
not needed
```

_Request Body_
```json

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}

```
_Response (201 - Created)_
```json

{
  "id": "<given_id_by__system>",
  "email": "<posted email>",
  "password": "<posted password>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Please input email format!, Password minimum 4 characters!"
}

```

_Response (500 - Internal Error Server)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /login

> Login to todos

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (200)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid email or password"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
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
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize User!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```


### POST /todos
> Create new todos

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
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize User!"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Invalid date input, Input your todo title please!, Please input your todo description"
}
```

### GET /todos/:id
> Find detail todo by ID

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

_Response(200)_
```json
[
  {
    "id": 1,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```
_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize User!"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

### PUT /todos/:id

> Update todo by ID

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
  "due_date": "<due_date to get insert into>"
}
```

_Response (200)_
```json
{
  "id": "<selected id>",
  "title": "<updated title>",
  "description": "<updated description>",
  "due_date": "<updated due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

> Error response:
_Response (400 - Bad request)_
```json
{
  "message": "Invalid date input, Input your todo title please!, Please input your todo description"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```


### DELETE /todos/:id

> Delete todo data by ID

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

_Response(200)_
```json

[
  {
    "id": "<selected id>",
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

> Error response:
_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
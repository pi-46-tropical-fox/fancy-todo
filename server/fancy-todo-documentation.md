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
  "id": <given id by system>,
  "email": "<posted email>",
  "password": "<posted password>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (500 - Internal server error)_

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

_Response (400 - Invalid email/password)_
_OR_
_Response (500 - Internal server error)_


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
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

_Response (500 - Internal server error)_


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
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "due_date": "<posted due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "Invalid requests"
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

_Response (404 - Not Found)_

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
  "id": <selected id>,
  "title": "<updated title>",
  "description": "<updated description>",
  "due_date": "<updated due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

> Error response:
_Response (400 - Bad request)_
_OR_
_Response (404 - Not Found)_
_OR_
_Response (500 - Internal Server Error)_


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
    "id": <selected id>,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

> Error response:
_Response (404 - Not Found)_
_OR_
_Response (500 - Internal Server Error)_


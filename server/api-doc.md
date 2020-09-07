# My TodoList Server
Website to manage todo. This app has : 
* CRUD Todo
* Register & Login
* JSON formatted response

&nbsp;

## endpoints
```
- GET /todo
- POST /todo
- GET /todo/:id
- PUT /todo/:id
- PATCH /todo/:id
- DELETE /todo/:id
- POST /user/:register
- POST /user/:login

```

## RESTful endpoints
### GET /todos

> Get all Todos

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

_Response (200 - Ok)_
```
[
  {
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  },
  {
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (401 - User not authenticated  or 404 - Data not Found)_
```
{
    "errors": [
        "User not authenticated"    
        "Data not found",
    ]
}
```
---
### POST /todos

> Create new Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<todo name>",
    "description": "<todo description>",
    "due_date": "<todo due date>",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<todo name>",
  "description": "<todo description>",
  "status": false,
  "due_date": "<todo due date>",
  "createdAt": "given date by system",
  "updatedAt": "given date by system",
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Title cannot empty",
        "Description cannot empty",
        "Cannot enter date before today"
    ]
}
```

### Get /todos/:id
> GET /todos/:id
Find detail todo by Id

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
_Response (200 - Ok)_
```
[
  {
    "id": 1,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```
_Response (404 - Data not found)_
```
{
    "errors": [
        "Data not found",
    ]
}
```


### PUT /todos/:id
Update todo by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```
_Response (200 - ok)_
```
{
  "id": <selected id>,
  "title": "<updated todo title>",
  "description": "<updated todo description>",
  "status": "<updated todo status>",
  "due_date": "<updated todo due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (403 - Forbidden Access)_
```
{
    "errors": [
        "Forbidden Access"
    ]
}
```


### DELETE /todos/:id
Delete todo data by ID

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
_Response (200 - ok)_
```
[
  {
    "id": <selected id>,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```
_Response (403 - Forbidden Access)_
```
{
    "errors": [
        "Forbidden Access"
    ]
}
```
### POST /register
> Create new User

_Request Header_
```
not needed
```
_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
  "status": "<password to get insert into>",
}
```
_Response (201 - Ok)_
```
[
  {
    "id": 1,
    "username": "<username to get insert into>",
    "email": "<email to get insert into>",
  },
]
```
_Response (400 - Bad Request)_
```
{
  "errors": [
      "Username cannot empty",
      "Invalid email format",
      "Pasword min 6 characters max 15 characters"
  ]
}
```
### POST /login

_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "<email>",
  "status": "<password>",
}
```
_Response (200 - Ok)_
```
{
    "access_token": <access_token>,
    "username": <username>
}
```
_Response (400 - Bad Request)_
```
{
  "errors": [
      "Invalid username or password"
  ]
}
```

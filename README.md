# fancy-todo

My fancy-todo App is an application to manage your fancy-todo. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
&nbsp;
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
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### GET /todos

> Get all fancy-todo

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
    "title": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due_date to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due_date to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### GET /todos/:id

> Get fancy-todo based id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of todo>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
  {
    "id": 1,
    "title": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due_date to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```


### PUT /todos/:id

> Update todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of todo>"
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

_Response (200 - Updated)_
```
{
  "id": <given id by system>,
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### DELETE /todos/:id

> Get fancy-todo based id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of todo>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
  {
    "id": 1,
    "title": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due_date to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### POST /register

> Create new user

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",  
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<email to get insert into>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### POST /login

> Login user

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",  
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
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
---
User bisa create todo dan findAll Todo jika memberikan accesstoken. acces token tersebut sudah terverivikasi(Authentication)

---
User hanya bisa melihat (findOne), menghapus dan menghapus todonya sendiri (Authorization)
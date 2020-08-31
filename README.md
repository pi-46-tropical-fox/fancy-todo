# fancy-todo
# My todos App Server
My todos App is an application to manage your todos. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## Endpoints
```
- GET /todos
- POST /todos
- GET /todos/:id
- PUT /todos/:id
- PATCH /todos/:id
- DELETE /todos:id
- POST /register
- POST /login
```

## RESTful endpoints
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
    "name": "deutsch lernen",
    "description": "vom A1 bis A2",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "etwas kochen",
    "description": "mittagsessen"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

---
### POST /todos

> Create new asset

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
  "description": "<description to get insert into>"
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

---
### GET /todos/:id

> Get todos by Id
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
        "id": <todos id>,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos due_date>",
        "createdAt": "2020-04-27T13:15:33.821Z",
        "updatedAt": "2020-04-27T13:39:19.162Z"
    }
]
```

_Response (404 - Error Not Found)_
```
{
  "message": "<returned error message>"
}
```

---
### PUT /todos/:id

> Update todos by Id
_Request Header_
```
not needed
```

_Request Body_
```
{
  "title": "<title to get update into>",
  "description": "<description to get update into>",
  "status": "<status to get update into>",
  "due_date": "<due_date to get update into>"
}
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<todos updated title>",
  "description": "<todos updated description>",
  "status": "<todos updated status>",
  "due_date": "<todos updated due_date>",
  "createdAt": "2020-04-27T13:15:33.821Z",
  "updatedAt": "2020-04-27T13:39:19.162Z"
}
```

_Response (400 - Validation Error)_
```
{
  "validation error": "<returned validation error>"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "<returned error message>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---
### DELETE /todos/:id

> Delete todos by Id
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<todos deleted title>",
  "description": "<todos deleted description>",
  "status": "<todos deleted status>",
  "due_date": "<todos deleted due_date>",
  "createdAt": "2020-04-27T13:15:33.821Z",
  "updatedAt": "2020-04-27T13:39:19.162Z"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

# Fancy Todo App Server
Fancy Todo App is an application to manage your fancy todo. This app has : 
* CRUD Todo's
* Register dan Login
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /todos
- GET /todos
- GET /todos/:id
- PUT /todos/id
- DELETE /todos/:id
- POST /register
- POST /login
```

## RESTful endpoints
### POST /todos

> Create new todo

_Request Header_
```
{
  "todo_token": "<your todo token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
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
  "message": "validation errors"
}
```
_Response (500 - Internal Server Error)_


### GET /todos

> Get all todos

_Request Header_
```
{
  "todo_token": "<your todo token>"
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

---

### GET /todos/:id

> Get todo by Id

_Request Header_
```
{
  "todo_token": "<your todo token>"
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

---
### PUT /todos/:id

> Update todo by Id

_Request Header_
```
{
  "todo_token": "<your todo token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (200)_
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
  "message": "validation errors"
}
```
_Response (404 - Not Found)_

_Response (500 - Internal Server Error)_

---

### DELETE /todos/:id

> Delete todo by Id

_Request Header_
```
{
  "todo_token": "<your todo token>"
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

_Response (500 - Internal Server Error)_
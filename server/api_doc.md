# fancy-todo
Make a website to manage interesting things to do. This app has :
* CRUD Todo
* Register and Login
* JSON formatted response

&nbsp;

## RESTful endpoints
```
 - POST /todos
 - GET /todos
 - GET /todos/:id
 - PUT /todos/:id
 - DELETE /todos/:id
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
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into with validation so that there is no due date behind the date when this request is created>"
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
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request"
}
```

_Response(500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<your accsess token>"
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
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z",
  },
  {
    "id": 2,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z",
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /todos/:id

> Get todo based on id

_Request Header_
```
{
  "access_token": "<your accsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <requested id>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z",
}
```

_Response (404 - Not found)_
```
{
  "message": "Not found"
}
```
---
### PUT /todos/:id

> Update todo based on id

_Request Header_
```
{
  "access_token": "<your accsess token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into with validation so that there is no due date behind the date when this request is created>"
}
```

_Response (200)_
```
[
  1,
  [
    {
    "id": <requested id>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z",
  }
  ]
]
```

_Response (400 - Bad request)_
```
{
  "message": "Bad Request"
}
```

_Response (404 - Not found)_
```
{
  "message": "Not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /todos/:id

> Delete todo based on id

_Request Header_
```
{
  "access_token": "<your accsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
1
```

_Response (404 - Not found)_
```
{
  "message": "Not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### References
https://gist.github.com/iros/3426278#file-example-md
https://github.com/Sursev07/documentation-example
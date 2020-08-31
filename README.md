# fancy-todo
Make a website to manage interesting things to do.

&nbsp;

## RESTful endpoints
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
  "message": "Validation errors"
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
```

_Response (404 - Not found)_
```
{
  "message": "Error not found"
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
```

_Response (400 - Bad request)_
```
{
  "message": "Validation errors"
}
```

_Response (404 - Not found)_
```
{
  "message": "Error not found"
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
```

_Response (404 - Not found)_
```
{
  "message": "Error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
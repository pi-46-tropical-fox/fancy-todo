# My Todos App Server
My Todos App is an application to manage your todos. This app has : 
* RESTful endpoint for todo's CRUD operation
* Register and Login
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
    "title": "Daily Challenge",
    "description": "Mengerjakan challenge harian",
    "due_date": "2020-08-31",
    "status": "incomplete",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Portfolio week-1",
    "description": "Nyicil portfolio week-1",
    "due_date": "2020-09-05",
    "status": "incomplete",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
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
  "title": "<todo title>",
  "description": "<todo description>",
  "due_date": "<todo due date>"
  "status": "<todo status>",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "due_date": "<posted due date>",
  "status": "incomplete",
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
### GET /todos/:id

> Get todo by id

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
{
  "id": 1,
  "title": "Daily Challenge",
  "description": "Mengerjakan challenge harian",
  "due_date": "2020-08-31",
  "status": "incomplete",
  "createdAt": "2020-08-31T07:15:12.149Z",
  "updatedAt": "2020-08-31T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### PUT /todos/:id

> Update todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "due_date": "<todo due date>"
  "status": "incomplete"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "<updated todo title>",
  "description": "<updated todo description>",
  "due_date": "<updated todo due date>",
  "status": "<updated todo status>",
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /todos/:id

> Delete todo by id

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

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
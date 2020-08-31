# My Fancy Todo App Server
My Fancy Todo App is an application to manage your activities. This app has : 
* RESTful endpoints for todo's CRUD operations
* JSON formatted response

&nbsp;

## Endpoints
```
 - POST /todos
 - GET /todos
 - GET /todos/:id
 - PUT /todos/:id
 - DELETE /todos/:id
```

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
  "title": "<todo title to get insert into>",
  "description": "<todo description to get insert into>",
  "status": "<todo status to get insert into>",
  "due_date": "<todo due date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted todo title>",
  "description": "<posted todo description>",
  "status": "<posted todo status>",
  "due_date": "<posted todo due date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
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

_Response (200 - OK)_
```
[
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
---
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

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200 - OK)_
```
{
  "id": <todo id>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>",
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
  "title": "<todo title to get insert into>",
  "description": "<todo description to get insert into>",
  "status": "<todo status to get insert into>",
  "due_date": "<todo due date to get insert into>"
}
```

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200 - OK)_
```
{
  "id": <todo id>,
  "title": "<updated todo title>",
  "description": "<updated todo description>",
  "status": "<updated todo status>",
  "due_date": "<updated todo due date>",
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

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200 - OK)_
```
{
  "id": <todo id>,
  "title": "<deleted todo title>",
  "description": "<deleted todo description>",
  "status": "<deleted todo status>",
  "due_date": "<deleted todo due date>",
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

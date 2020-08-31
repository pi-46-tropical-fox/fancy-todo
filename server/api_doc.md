# My FancyTodo Server
Fancy Todo. This app has : 
* CRUD Todo
* Register and Login
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
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-29",
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

> Create new todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "due_date": "2020-01-29"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "name": "learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "due_date": "2020-01-29",
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
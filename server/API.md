# My TODO App Server
My TODO App is an application to manage your to-do lists. This app has : 
* RESTful endpoint for asset's CRUD operation
<!-- * JSON formatted response -->

&nbsp;

## RESTful endpoints
### GET /todo

> Get all todo list

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": "<todo user id FK>"
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
### POST /todo

> Create new todo

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due date>",
    "UserId": "<todo user id FK>",
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

### GET /todo/:id

> Get a todo by ID

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": <id as requested>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": "<todo user id FK>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Error Not Found"
}
```
---

### PUT /todo/:id

> Modify/Update a todo by ID

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```
{
    "title": "<updated title>",
    "description": "<updated description>",
    "status": "<updated status>",
    "due_date": "<updated due date>"
}
```

_Response (200)_
```
{
    "id": <id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": "<todo user id FK>",
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

### DELETE /todo/:id

> Delete a todo by ID

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  1
}
```

_Response (404 - Not Found)_
```
{
  "message": "Invalid request"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
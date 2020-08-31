# My Fancy Todo App Server
My Fancy Todo App is an application to manage your activities. This app has : 
* CRUD Todo
* JSON formatted response

&nbsp;

## endpoints
``` 
- GET /todos
- POST /todos
- GET /todos/:id
- PUT /todos/:id
- DELETE /todos/:id 
```


## RESTful endpoints
### GET /todos

> Get all assets

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
    "title": "Belajar bikin dokumentasi",
    "description": "sesuai standar",
    "status": "Incomplete"  ,
    "due_date": "2020-05-20T07:15:12.149Z" ,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Benerin kipas angin",
    "description": "benerin lah",
    "status": "Incomplete",
    "due_date": "2020-05-20T07:15:12.149Z" ,
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
### POST /todos/create

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
    "title": "Benerin mesin cuci",
    "description": "benerin lah",
    "status": "Incomplete",
    "due_date": "2020-05-20T07:15:12.149Z"
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
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /todos/:id

> Get all todos WHERE id == req.params.id

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
    "title": "Belajar bikin dokumentasi",
    "description": "sesuai standar",
    "status": "Incomplete"  ,
    "due_date": "2020-05-20T07:15:12.149Z" ,
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

### PUT /todos/:id

> Update todo WHERE id == req.params.id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
}
```

_Response (200 - OK)_
```
{
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
### DELETE /todos/:id

> Delete todo WHERE id == req.params.id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
```

_Response (200 - OK)_
```
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
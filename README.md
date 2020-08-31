# fancy-todo
Membuat sebuah website untuk me-manage hal - hal menarik untuk dilakukan


# My Fancy Todo App Server
Application to manage your Todo list. This app has :
* CRUD
* Register dan Login
* JSON formatted response

## RESTful endpoints
List of available endpoint:

  - `GET /todos` 
  - `GET /todos/:id`
  - `POST /todos`
  - `PUT /todos/:id`
  - `POST /login`
  - `POST /register`
  - `DELETE /todos/:id`



```

_Response (500 - Internal Server Error)
{
  "message": "Internal Server Error"
}

---
### GET /todos

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "makan",
    "description": "makan ayam",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 1
  },
  {
    "id": 2,
    "title": "minum",
    "description": "minum air",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 2
  },
  {
    "id": 3,
    "title": "makan",
    "description": "makan sosis",
    "status": "belum",
    "Due_date": 2020-12,
    "UsersId": 1
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

_Response (200 - OK)_
```
  {
    "id": 1,
    "title": "makan",
    "description": "makan ayam",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 1
  }
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /todos
```
  {
    "title": "string",
    "description": "string",
    "status": "string",
    "due_date": "date",
    "UsersId": "integer"
  }

```
_Response (201 - Created)_
  ```
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "string",
    "due_date": "date",
    "UsersId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)
```
[
  {
    "message": "Title is empty"
  },
  {
    "message": "Description is empty"
  },
  {
    "message": "You dont choose the status"
  },
  {
    "message": "You don't pick a Due Date"
  },
    "message: "fill Empty slot"
  }
]
```
### PUT /todos/:id

_Request Body_
```
  {
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UsersId": 1
  }

```

_Response (200 - OK)
```
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UserId": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```
[
  {
    "message": "Title is empty"
  },
  {
    "message": "Description is empty"
  },
  {
    "message": "You dont choose the status"
  },
  {
    "message": "You don't pick a Due Date"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
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

_Response (200 - OK)_
```
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UsersId": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /register

_Request Body_
```
  {
    "email": "string",
    "password": "string"
  }

```

_Response (201 - Created)_
```
  {
    "id": "integer",
    "email": "string",
    "password": "string"
  }
```

_Response (400 - Bad Request)_
```
[
  {
    "message": "You don't put any password"
  },
  {
    "message": "You don't put any email"
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

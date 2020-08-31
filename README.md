# fancy-todo
Membuat sebuah website untuk me-manage hal - hal menarik untuk dilakukan


# My Fancy Todo App Server
Application to manage your Todo list. This app has :
* CRUD
* Register dan Login
* JSON formatted response

## RESTful endpoints
List of available endpoint:

  - `GET /todos` => Menampilkan seluruh data
  - `GET /todos/:id`=> Menampilkan data berdasar id yang di input
  - `POST /todos` => Menambah Daftar todos
  - `PUT /todos/:id`=> Menupdate data todos
  - `POST /login`=> Masuk kedalam todos dengan login
  - `POST /register`=> Membuat data login
  - `DELETE /todos/:id`=> Menghapus data todos berdasarkan id



```
_Response (500 - Internal Server Error)
{
  "message": "Internal Server Error"
}
---
### GET /todos
_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "title": "makan",
    "description": "makan Nasi",
    "status": "belum",
    "Due_date": 2020-11-30,
    "UsersId": 1
  },
  {
    "id": 2,
    "title": "belajar",
    "description": "documentation",
    "status": "belum",
    "Due_date": 2020-11-30,
    "UsersId": 2
  },
  {
    "id": 3,
    "title": "makan",
    "description": "makan sosis",
    "status": "belum",
    "Due_date": 2020-11-30,
    "UsersId": 1
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### GET /todos/:id

_Response (200 - OK)_
```json
  {
    "id": 1,
    "title": "makan",
    "description": "makan nasi",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 1
  }
```

_Response (404 - Not Found)_
```json
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
```json
  {
    "title": "string",
    "description": "string",
    "status": "string",
    "due_date": "date",
    "UsersId": "integer"
  }
```
_Response (201 - Created)_
  ```json
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
```json
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
    "message": "fill Empty slot"
  }
]
```
### PUT /todos/:id
_Request Body_
```json
  {
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UsersId": 1
  }
```
_Response (200 - OK)
```json
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
```json
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
```json
{
  "message": "error Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### DELETE /todos/:id
_Response (200 - OK)_
```json
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
```json
{
  "message": "error Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### POST /register
_Request Body_
```json
  {
    "email": "string",
    "password": "string"
  }
```
_Response (201 - Created)_
```json
  {
    "id": "integer",
    "email": "string",
    "password": "string"
  }
```
_Response (400 - Bad Request)_
```json
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
```json
{
  "message": "Internal Server Error"
}
```
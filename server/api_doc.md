# Fancy ToDo
A simple website to manage upcoming activities. This app has:
* CRUD for activities
* Register and login

&nbsp;

## RESTful endpoints
### POST /register

> Register new account

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username":"<your username>",
  "password":"<your password>",
  "email":"<your email>"
  }
```

_Response (200)_
```
  {
    "username":"<your username>",
    "email":"<your email>"
  }
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /login

> Register new account

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username":"<your username>",
  "password":"<your password>"
  }
```

_Response (200)_
```
  {
    "access_token": "<your access token>"
  }
```

_Response (400)_
```
{
  "message": "Username/password is invalid"
}
```

_Response (500)_
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
    "title": "Belajar REST API & JWT",
    "description": "Menonton ulang lecture",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "Menyicil porto Week 1",
    "description": "Cicil challenge harian",
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

> Create new asset

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
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
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

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /todos/:id

> Get specific todos (specified by :id)

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
    "title": "Belajar REST API & JWT",
    "description": "Menonton ulang lecture",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }]
```

_Response (404 - Not Found)_
```
{
  "message": "Error: Not Found"
}
```
---
### PUT /todos/:id

> Get specific todos (specified by :id)

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
    "due_date":"<due_date to get insert into>"
}
```

_Response (200)_
```

  {
    "title":"Belajar method PUT",
    "description":"Cari definisi, cari contoh, cari definisi dari sumber lain, cari contoh lain, coba soal",
    "status": "unfinisihed",
    "due_date":"2020-08-31"
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }

```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Errors"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Error: not Found"
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
  {
    "id": 1,
    "title": "Belajar REST API & JWT",
    "description": "Menonton ulang lecture",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Error: Not Found"
}
```
---
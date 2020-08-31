# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
* GET /todos => Menampilakan data todos
* POST /todos => Menambahkan data ke dalam todos
* GET /todos/:id => Menampilkan data todos berdasarkan id yang diterima dari parameter
* PUT /todos/:id => Memperbarui data berdasarkan id yang diterima dari parameter
* DELETE /todos/:id => Menghapus data berdasarkan id yang diterima dari parameter
---
### GET /todos

> Get all Todos

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
    "title": "Coding",
    "description": "Coding JavaScript",
    "status": "true",
    "due_date": "2020-09-01",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Tidur",
    "description": "Tidur Malam",
    "status": "false",
    "due_date": "2020-09-01",
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
_Response (500 - Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /todos

> Create new Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Bangun",
  "description": "Bangun Tidur",
  "status": "false",
  "due_date": "2020-09-02",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
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
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title Belum Diisi"
},
{
  "message": "Description belum diisi"
},
{
  "message": "Status tidak valid"
},
{
  "message": "Due Date tidak valid"
}
```
_Response (500 - Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /todos/:id

> Get Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200)_
```
{
  "id": <given id by request parameters>,
  "title": "<given title by request id>",
  "description": "<given description by request id>",
  "status": "<given status by request id>",
  "due_date": "<given due_date by request id>",
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
_Response (500 - Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /todos/:id

> Update new Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Olahraga",
  "description": "Olahraga Sore",
  "status": "false",
  "due_date": "2020-09-01",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (200)_
```
{
  "id": <given id by request parameters>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title Belum Diisi"
},
{
  "message": "Description belum diisi"
},
{
  "message": "Status tidak valid"
},
{
  "message": "Due Date tidak valid"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Error Not Found"
}
```
_Response (500 - Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /todos/:id

> Update new Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Response (200)_
```
{
  "id": <given id by request parameters>,
  "title": "<given title by request id>",
  "description": "<given description by request id>",
  "status": "<given status by request id>",
  "due_date": "<given due_date by request id>",
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
_Response (500 - Server Error)_
```
{
  "message": "Internal Server Error"
}
```
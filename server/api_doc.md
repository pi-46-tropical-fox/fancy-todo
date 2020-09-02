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
### GET /articles/:input

> Get most recent articles

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
    "result": [
        {
            "Title": "How to Find a Truly Dark Location for the Best Photos of the Night Sky",
            "url": "https://lifehacker.com/how-to-find-a-truly-dark-location-for-the-best-photos-o-1844881808"
        },
        {
            "Title": "How to Quickly Fact Check Forwarded Messages on WhatsApp",
            "url": "https://lifehacker.com/how-to-quickly-fact-check-forwarded-messages-on-whatsap-1844605934"
        }
    ]
}
```

_Response (404 - Not Found)_
```
{
  "message": "Articles Not Found"
}
```
---
### GET /todos/articles/:id

> Get related articles with your specific todo

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
    "result": [
        {
            "Title": "Makan"
        },
        {
            "Title": "Bakar Daun Salam di Dalam Rumah, Hal Mengejutkan Akan Terjadi",
            "url": "https://www.viva.co.id/gaya-hidup/kesehatan-intim/1298374-bakar-daun-salam-di-dalam-rumah-hal-mengejutkan-akan-terjadi"
        },
        {
            "Title": "Diet Ala Militer Bisa Pangkas 4,5Kg dalam Seminggu Tanpa Banyak Usaha",
            "url": "https://www.viva.co.id/gaya-hidup/kesehatan-intim/1298265-diet-ala-militer-bisa-pangkas-4-5kg-dalam-seminggu-tanpa-banyak-usaha"
        },
        {
            "Title": "6 Cara Sederhana Menurunkan Lemak Perut, Berdasarkan Penelitian",
            "url": "https://www.viva.co.id/gaya-hidup/kesehatan-intim/1298370-6-cara-sederhana-menurunkan-lemak-perut-berdasarkan-penelitian"
        }
    ]
}
```

_Response (404 - Not Found)_
```
{
  "message": "Articles Not Found"
}
```

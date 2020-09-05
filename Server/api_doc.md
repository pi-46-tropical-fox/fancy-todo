# Fancy Todo App Server
Fancy Todo adalah aplikasi berbasis port yang bertujuan untuk mempermudah kolaborasi dan komunikasi antar anggota tim. 
Aplikasi ini memiliki konfigurasi dan fitur sebagai berikut : 
* RESTful endpoint dengan operasi CRUD.
* Format respon berupa JSON.
* Assosiasi "many-to-many" antara User dan Project. Dimana satu User bisa memiliki banyak Project dan satu Project bisa di kerjakan oleh banyak User.
* Tabel konjungsi berupa "Todo" dimana terkandung task, deskripsi, due date, dan status
* User dapat memilih 2 role saat mendaftar yaitu sebagai Project Manager atau Team Member. Hal ini akan berpengaruh pada authorisasi akses fitur tertentu.
* Terdapat fitur "explore" dimana user dapat mendapatkan informasi berita menarik yang didapatkan dari 3rd party API

Constraint Aplikasi:
* User harus registrasi dan login terlebih dahulu agar dapat mengakses aplikasi.
* Terdapat fitur OAuth Google, namun user hanya bisa melihat dashboard dan tidak diizinkan untuk membuat project/task.
* Hanya user dengan role "Project Manager" yang dapat melakukan pembuatan project baru sebagai lahan "task/todo" baru bagi para team members.

&nbsp;

## Endpoints
* POST /register
* POST /login
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* DELETE /todos/:id
* POST /projects
* GET /projects
* GET /projects/:id
* PUT /projects/:id
* DELETE /projects/:id
* GET /api/news


## RESTful endpoints
### POST /register

> Create new user
  - name, email, and password harus diisi
  - email harus unik
  - email harus menggunakan format email
  - password min 6 characters
  - apabila pictureUrl tidak diisi maka akan disematkan foto avatar default yang telah disiapkan

_Request Header_
```
no need
```

_Request Body_
```json
{
    "name": "Amanda Caessara",
    "email": "amanda@mail.com",
    "password": "123456",
    "role": "Project Manager",
    "pictureUrl": "http://pictureamanda/twitter.com"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "Amanda Caessara",
    "email": "amanda@mail.com",
    "role": "Project Manager"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid required users data"
}
```


### POST /login

> Login to app
  - password akan di "hash"menggunakan bcrypjtjs sebelum disimpan dalam database


_Request Header_
```
no need
```

_Request Body_
```json
{
  "email": "amanda@mail.com",
  "password": "123456"
}
```

_Response (200 - Ok)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey",
    "id": 1,
    "name": "Amanda Caessara",
    "role": "Project Manager"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Username or/and password is invalid"
}
```


### POST /todos

> Create a new todo/task
  - Title, description, status dan due date harus diisi
  - Due date harus setelah 5 September 2020
  - User harus login terlebih dahulu untuk mengakses laman ini
  - UserId dan ProjectId akan otomatis terisi berdasarkan id User dan pada project apa user menambahkan task. Ketika mengakses laman, UserId dan ProjectId akan terekam pada local storage.

_Request Header_
```json
{
  "access_token": "<your access token>",
  "UserId": 1,
  "ProjectId": 3
}
```

_Request Body_
```json
{
  "title": "Mencuci",
  "description": "Mencuci baju menggunakan mesin cuci",
  "status": "false",
  "due date": "12 November 2020"
}
```

_Response (201 - Created)_
```json
{
    "title": "Budgetting",
    "description": "Melakukan perencanaan keuangan dalam project renovasi",
    "status": false,
    "due_date": "25 December 2020",
    "UserId": 10,
    "ProjectId": 5,
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title/Description/Status/Due Date harus diisi"
},
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /todos

> Get all todo list
  - User harus login untuk mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "status": false,
    "due date": "12 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 5,
    "ProjectId": 1
  },
  {
    "id": 2,
    "title": "Memasak",
    "description": "Memasak ayam pop",
    "status": false,
    "due date": "1 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 6,
    "ProjectId": 1
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /todos/:id

> Get a todo list that owned by certain user
Desc: 
  - User harus login untuk mengakses laman ini
  - Hanya authorized user yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
todos id
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "status": false,
    "due date": "12 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 5,
    "ProjectId": 1
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```


### PUT /todos/:id

> Update a spesific todo
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
todos id
```

_Request Body_
```json
{
    "title": "Menggoreng",
    "description": "Menggoreng ikan",
    "status": true,
    "due date": "12 September 2020",
}
```

_Response (200 - Ok)_
```json
{
    "id": 7,
    "title": "Menggoreng",
    "description": "Menggoreng ikan",
    "status": true,
    "due date": "12 September 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "3 September 2020",
    "UserId": 5,
    "ProjectId: 1
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /todos/:id

> Delete a todo owned by an authorized User
  - User harus login untuk mengakses laman ini
  - Hanya authorized user yang dapat menghapus todo/task tertentu


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
todos id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Todo is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```




### POST /projects

> Create a new project
  - Project Name, Project Descriptiondan due date harus diisi
  - Due date harus setelah 5 September 2020
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user (Project Manager) yang dapat mengakses lama ini


_Request Header_
```json
{
  "access_token": "<your access token>",
}
```

_Request Body_
```json
{
  "projectName": "Project Renovasi rumah",
  "projectDescription": "Merenovasi rumah dengan style vintage 80an dan kolaborasi nuansa alam",
  "due date": "12 Januay 2021"
}
```

_Response (201 - Created)_
```json
{
    "id": 5,
    "projectName": "Project Renovasi Rumah",
    "projectDescription": "Merenovasi rumah dengan style vintage 80an dan kolaborasi nuansa alam",
    "due_date": "12 January 2020",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "projectName/projectDescription/Due Date harus diisi"
},
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (403 - Not Authorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /projects

> Get all todo list
  - User harus login untuk mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```json
[
  {
    "id": 5,
    "projectName": "Project Renovasi Rumah",
    "projectDescription": "Merenovasi rumah dengan style vintage 80an dan kolaborasi nuansa alam",
    "due_date": "15 January 2020",
    "updatedAt": "5 September 2020",
    "createdAt": "5 September 2020"
  },
  {
    "id": 6,
    "projectName": "Project Merakit Motor",
    "projectDescription": "Merakit motor caferacer dengah harga terjangkau",
    "due_date": "12 Januay 2020",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /projects/:id

> Get a project that owned by certain user
  - User harus login untuk mengakses laman ini
  - Hanya authorized user yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
projects id
```

_Response (200 - Ok)_
```json
{
    "id": 5,
    "projectName": "Project Renovasi Rumah",
    "projectDescription": "Merenovasi rumah dengan style vintage 80an dan kolaborasi nuansa alam",
    "due_date": "15 January 2020",
    "updatedAt": "5 September 2020",
    "createdAt": "5 September 2020"
},
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (403 - Not Authorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Project data is not found!"
}
```


### PUT /projects/:id

> Update a spesific project
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
projects id
```

_Request Body_
```json
{
    "projectName": "Project Renovasi Rumah",
    "projectDescription": "Merenovasi rumah dengan style vintage 80an dan kolaborasi nuansa alam",
    "due_date": "15 January 2020",
},
```

_Response (200 - Ok)_
```json
{
    "id": 7,
    "title": "Menggoreng",
    "description": "Menggoreng ikan",
    "due date": "12 September 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "3 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (403 - Not Authorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Project data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /projects/:id

> Delete a todo owned by an authorized User
  - User harus login untuk mengakses laman ini
  - Hanya authorized user yang dapat menghapus todo/task tertentu


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
projects id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Project is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (403 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Project data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}


## Get /api/news

> Fethcing 3rd party API
  - User harus login untuk mengakses laman ini
  - Melakukan pemanggilan data dari 3rd party API menggunakan API Key, 3rd party api yang dipakai adalah news


_Request Header_
```json
{
  "apiKey": "<your apiKey>"
}
```

_Request Params
```
projects id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
[
   {
            "source": {
                "id": null,
                "name": "Lifehacker.com"
            },
            "author": "David Murphy",
            "title": "Should I Buy a PC or Mac for College?",
            "description": "Yes, we’re wading into these waters this week: The classic PC or Mac debate that spawned countless, hilarious ads from Apple and John Hodgman a decade-plus ago. (I’m sure Microsoft would beg to disagree with Apple’s interpretation, but I think the entire woul…",
            "url": "https://lifehacker.com/should-i-buy-a-pc-or-mac-for-college-1844944031",
            "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/xavjw9nihpn1lqflgkd2.jpg",
            "publishedAt": "2020-09-04T13:00:00Z",
            "content": "Yes, were wading into these waters this week: The classic PC or Mac debate that spawned countless, hilarious ads from Apple and John Hodgman a decade-plus ago. (Im sure Microsoft would beg to disagre… [+6483 chars]"
        },
        {
            "source": {
                "id": "engadget",
                "name": "Engadget"
            },
            "author": "Engadget",
            "title": "The Morning After: Nintendo turned 'Super Mario' into a battle royale",
            "description": "Yesterday was interrupted by all the Mario game news you could ever want in a lifetime. Yes, we knew it was coming, but then it all just landed at once. Remastered Mario games for the Switch, a new Game & Watch device (yes, honestly), a new Mario Kart game in…",
            "url": "https://www.engadget.com/super-mario-bros-35-battle-royale-tma-111520748.html",
            "urlToImage": "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-09%2F20b75270-ee9e-11ea-b7dd-f48f8fa1bb77&client=amp-blogside-v2&signature=44f5e43076f9e507c0a933556a2c7eae54bbfc87",
            "publishedAt": "2020-09-04T11:15:20Z",
            "content": "Like the Tetris 99 battle royale game from last year, Super Mario Bros. 35 is free if you have a subscription to Nintendo’s Switch Online service. It launches October 1st and will run until March nex… [+3906 chars]"
        },
        {
            "source": {
                "id": "the-verge",
                "name": "The Verge"
            },
            "author": "Makena Kelly",
            "title": "Read Apple’s commitment to freedom of expression that doesn’t mention China",
            "description": "Apple published a human rights policy committing to “freedom of information and expression” after facing years of criticism over the company’s willingness to follow mainland China’s censorship guidelines.",
            "url": "https://www.theverge.com/2020/9/4/21423347/apple-freedom-speech-expression-information-china-censorship-policy",
            "urlToImage": "https://cdn.vox-cdn.com/thumbor/bEspe2VM_QH315QC-wUtGt5WL_c=/0x146:2040x1214/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/11477047/acastro_180604_1777_apple_wwdc_0001.jpg",
            "publishedAt": "2020-09-04T20:10:15Z",
            "content": "The document follows years of criticism of the company bowing down to the Chinese government\r\nIllustration by Alex Castro / The Verge\r\nOn Friday, Apple published a new human rights policy committing … [+1868 chars]"
        }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
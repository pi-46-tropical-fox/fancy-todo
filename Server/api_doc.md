# Fancy Todo App Server
Fancy Todo App is an application to manage your todo list. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## Endpoints
* POST /register
* POST /login
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* DELETE /todos/:id


## RESTful endpoints
### POST /register

> Create new user
Desc: 
  - name, email, and password can not be empty
  - name and email must be unique
  - email must use email format
  - password min 6 characters

_Request Header_
```
no need
```

_Request Body_
```json
{
  "name": "Amanda Caessara",
  "email": "amanda@mail.com",
  "password": "amanda123"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "Amanda Caessara",
  "email": "amanda@mail.com"
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
Desc:
  - password must be hashed using bcrypt before stored into database
  - response login must be token (access_token) that contains id, name and email

_Request Header_
```
no need
```

_Request Body_
```json
{
  "email": "amanda@mail.com",
  "password": "amanda123"
}
```

_Response (200 - Ok)_
```json
{
  "access_token": "<token>"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Username or/and password is invalid"
}
```


### POST /todos

> Create new a todo
Desc:
  - Title, description, status and due date can not be empty
  - Due date must be after 5 September 2020
  - User must login to access this site

_Request Header_
```json
{
  "access_token": "<your access token>"
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
  "id": 1,
  "title": "Mencuci",
  "description": "Mencuci baju menggunakan mesin cuci",
  "status": "false",
  "due date": "12 November 2020",
  "createdAt": "1 September 2020",
  "updatedAt": "1 September 2020",
  "UserId": 5
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title/Description/Status/Due Date can not be empty"
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
Desc:
  - User must login to access this site

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
    "status": "false",
    "due date": "12 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 5,
  },
  {
    "id": 2,
    "title": "Memasak",
    "description": "Memasak ayam pop",
    "status": "false",
    "due date": "1 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 6
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
  - User must login to access this site
  - Only display todo list which are owned by authorized User

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

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "status": "false",
    "due date": "12 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 5,
  },
  {
    "id": 3,
    "title": "Memancing",
    "description": "Memancing di danau",
    "status": "false",
    "due date": "3 November 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "1 September 2020",
    "UserId": 5
  }
]
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

> Get a spesific todo
Desc:
  - User must login to access this site
  - Only able to update todo that is owned by authorized User

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "Menggoreng",
    "description": "Menggoreng ikan",
    "status": "false",
    "due date": "12 September 2020",
}
```

_Response (200 - Ok)_
```json
{
    "id": 7,
    "title": "Menggoreng",
    "description": "Menggoreng ikan",
    "status": "false",
    "due date": "12 September 2020",
    "createdAt": "1 September 2020",
    "updatedAt": "3 September 2020",
    "UserId": 5,
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (401 - Not Athorized)_
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
Desc:
  - User must login to access this site
  - Only able to delete todo that is owned by authorized User


_Request Header_
```json
{
  "access_token": "<your access token>"
}
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

_Response (401 - Not Athorized)_
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
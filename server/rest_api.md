Fancy Todo is an application to manage your todo list. 

This app is created using :
* REST API
* ExpressJS
* Postgres
* Sequelize

This app has :
* RESTful endpoint for todo's CRUD operation
* JSON formatted response
* detectlanguage API


## REST Endpoints Table:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/todos` | GET | **Headers**<br>token: `String`<br>**Body**<br> not needed | **Success**<br>`200` All todos displayed<br>**Fail**<br>`500` Internal Server Error | Get all todos
`/todos` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date` | **Success**<br>`201` New todo created<br>**Fail**<br>`400` Validation error messages<br>`500` Internal Server Error | Create a todo
`/todos/:id` | GET | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Get one todo
`/todos/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date` | **Success**<br>`200` Edited todo displayed<br>**Fail**<br>`404` Todo not found<br>`400` Validation error messages<br>`500` Internal Server Error | Update one todo
`/todos/:id` | DELETE | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Deleted todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Delete a todo
`/register` | POST | **Body**<br>email: `String`<br>password: `String`<br>username: `String` | **Success**<br>`201` New user created<br>**Fail**<br>`400` Validation error messages<br>`500` Internal Server Error | Register user
`/login` | POST | **Body**<br>email: `String`<br>password: `String` | **Success**<br>`200` Get token for user<br>**Fail**<br>`401` Validation error messages<br>`500` Internal Server Error | Login user


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

_Response (200 - OK)_
```
{
    "todos": [
        {
            "id": 1,
            "title": "Belajar Rest API",
            "description": "Materi baru REST API",
            "status": false,
            "due_date": "2020-09-30T00:00:00.000Z",
            "createdAt": "2020-09-30T11:04:24.354Z",
            "updatedAt": "2020-09-30T11:04:24.354Z"
        },
        {
            "id": 2,
            "title": "Makan siang",
            "description": "Makan siang jam 13.00",
            "status": false,
            "due_date": "2020-09-30T00:00:00.000Z",
            "createdAt": "2020-09-30T11:04:55.855Z",
            "updatedAt": "2020-09-30T11:04:55.855Z"
        }
    ]
}
```

### POST /todos
> Create a Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Todo Title",
  "description": "Todo Description",
  "status": "true/false",
  "due_date": "2020-09-05",
}
```

_Response (201 - CREATED)_
```
{
    "todo": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang di warteg",
        "status": false,
        "due_date": "2020-09-30T00:00:00.000Z",
        "updatedAt": "2020-09-30T11:04:55.855Z",
        "createdAt": "2020-09-30T11:04:55.855Z"
    }
}
```

_Response (400 - BAD REQUEST)_
```
{
    "message": "Title cannot be empty"
}
```

### GET /todos/:id
> Get one Todo

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

_Response (200 - OK)_
```
{
    "todo": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang jam 13.00",
        "status": false,
        "due_date": "2020-09-30T00:00:00.000Z",
        "createdAt": "2020-09-30T11:04:55.855Z",
        "updatedAt": "2020-09-30T11:04:55.855Z"
    }
}
```

_Response (404 - NOT FOUND)_
```
{
    "message": "To Do not found"
}
```

### PUT /todos/:id
> Update one Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Todo Title",
  "description": "Todo Description",
  "status": "true/false",
  "due_date": "2020-09-30",
}
```

_Response (201 - CREATED)_
```
{
    "hasil": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang jam 13.00",
        "status": true,
        "due_date": "2020-09-30T00:00:00.000Z",
        "createdAt": "2020-09-30T11:04:55.855Z",
        "updatedAt": "2020-09-30T11:23:15.249Z"
    }
}
```

_Response (400 - BAD REQUEST)_
```
{
    "message": "Title cannot be empty"
}
```

_Response (404 - NOT FOUND)_
```
{
    "message": "To Do not found"
}
```

### DELETE /todos/:id
> Get one Todo

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

_Response (200 - OK)_
```
{
    "todo": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang di warteg",
        "status": false,
        "due_date": "2020-09-30T00:00:00.000Z",
        "createdAt": "2020-09-30T11:04:55.855Z",
        "updatedAt": "2020-09-30T11:04:55.855Z"
    }
}
```

_Response (404 - NOT FOUND)_
```
{
    "message": "To Do not found"
}
```

### POST /register
> Register new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "johndoe@mail.com",
  "password": "userpassword",
  "username": "John Doe"
}
```

_Response (201 - CREATED)_
```
{
    "id": 13,
    "email": "johndoe@mail.com",
    "password": "$2a$10$sZgmpxQxqU/IUxnXkpZ0H.qLW1LcekI3ZUpBVSMUDLjDlz4Q9OTwS",
    "username": "John Doe",
    "updatedAt": "2020-09-04T09:55:16.638Z",
    "createdAt": "2020-09-04T09:55:16.638Z"
}

```

_Response (400 - BAD REQUEST)_
```
{
    "message": "Email cannot be empty"
}
```

### POST /login
> User login

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "johndoe@mail.com",
  "password": "userpassword"
}
```

_Response (200 - OK)_
```
{
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJhZGlldDMzYWxpbXVkaW5AZ21haWwuY29tIiwiaWF0IjoxNTk5MjU3ODU4fQ.4StXeoLpHd7uZonVcf6ef1LnVXAkpXQH-rzngah2Vg0"
}

```

_Response (400 - BAD REQUEST)_
```
{
"message": "wrong password"
}
```

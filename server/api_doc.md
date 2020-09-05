# My Fancy Todo App Server
My Fancy Todo App is an application to manage your activities. This app has : 
* CRUD Todo
* JSON formatted response

&nbsp;

## endpoints
``` 
- GET /mytodos
- POST /mytodos
- PUT /mytodos/:idTodo
- PUT /mytodos/complete/:idTodo
- DELETE /mytodos/"idTodo
- GET /weather
- POST /user/register
- POST /user/login
- POST /user/google-login
```


## RESTful endpoints
### GET /mytodos

> Get all assets WHERE id:req.params.id

_Request Header_
```
{
  "access_token": "<jwt generated token>"
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
### POST /mytodos

> Create new todo

_Request Header_
```
{
  "access_token": "<jwt generated token>"
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

### PUT /mytodos

> Update existing todo WHERE id:req.params.id

_Request Header_
```
{
  "access_token": "<jwt generated token>"
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

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### DELETE /mytodos/:id

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
[1]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /weather

> Get current weather from Weather Stack

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
```

_Response (200)_
```
  {Data: {data from weather stack}
  }
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /user/register

> Create new account

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    username: "user's name",
    email: "user's email",
    password: "user's password",
    city: "user's city"
}
```

_Response (201)_
```
{
    username: "user's name",
    email: "user's email",
    city: "user's city"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "User.password cannot be null"
}
```
_Response (500 - Bad Request)_
```
{
  "message": ["Invalid email format",
              "Password must be at least 6 characters"]
}
```
---
### POST /user/login

> user login

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (200 - OK)_
```
{
  "access_token": "JWT generated token"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

### POST /user/google-login

> user login with google OAuth2

_Request Header_
```
{
  google_access_token: "access token given by google"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    access_token: "JWT generated google payload"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "There was an error. Please try again later. That’s all we know."
}
```
---
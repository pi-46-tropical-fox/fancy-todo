# My Todos App Server
fancy Todos App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
```
    POST /todos
    GET /todos
    GET /todos/:id
    PUT /todos/:id
    DELETE /todos/:id

```
```
    POST /users/register
    POST /users/login

```

```
    GET /calendars/holidays2020
    GET /calendars/holidays2021
    GET /calendars/holidays2022
    
    GET /calendars/longweekends2020
    GET /calendars/longweekends2021
    GET /calendars/longweekends2022
    


```



### POST /todos

> Create new asset

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize
  "status" : "done"
  "due-date" : "2020-01-29"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize"
  "status" : "done"
  "due-date" : "2020-01-29"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /todos

> Get all asset

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
    not needed
}
```

_Response (200 - Ok)_
```
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize"
  "status" : "done"
  "due-date" : "2020-01-29"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

> Get asset with specific id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
    "id": "<select id from table >"
}
```
_Response (200 - Ok)_
```
{
  "id": "<selected id from table >",
  "title": "<asset's title according to id from table >",
  "description": "<asset's description according to id from table >"
  "status" : "<asset's status according to id from table> "
  "due-date" : "<asset's due date according to id from table> "
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

### PUT /todos/:id

> Replace asset with specific id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "title": "<enter new asset's title>",
  "description": "<enter new asset's description>"
  "status" : "<enter new asset's status>"
  "due-date" : "<enter new asset's due date>"
}
```

_Response (200 - Ok)_
```
{
  "id": 1,
  "title": "<new asset's title>",
  "description": "<new asset's description>"
  "status" : "<new asset's status>"
  "due-date" : "<new asset's due date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request - Error Validation"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### DELETE /todos/:id

> Get asset with specific id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
    "id": "<select id from table >"
}
```

_Response (200 - Ok)_
```
{
  "message": "Deleted data from specific id"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /users/

> Create new users

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "username": "<insert new username>",
  "email": "<insert new email>"
  "password" : "<insert new password>"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "username": "<new username>",
  "email": "<new email>"
  "password" : "<new hash password>"
  "updatedAt" : "<new hash password>"
  "createdAt" : "<new hash password>"

}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```





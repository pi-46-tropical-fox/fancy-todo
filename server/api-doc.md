# My TodoList Server
Website to manage todo. This app has : 
* CRUD Todo
* Register & Login
* JSON formatted response

&nbsp;

## endpoints
```
- GET /todo
- POST /todo
- GET /todo/:id
- PUT /todo/:id
- PATCH /todo/:id
- DELETE /todo/:id
- POST /todo/:register
- POST /todo/:login

```

## RESTful endpoints
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

_Response (200 - Ok)_
```
[
  {
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  },
  {
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
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
    "title": "<todo name>",
    "description": "<todo description>",
    "due_date": "<todo due date>",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<todo name>",
    "description": "<todo description>",
    "status": false,
    "due_date": "<todo due date>",
  "createdAt": "given date by system",
  "updatedAt": "given date by system",
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

### Get /todos/:id
> GET /todos/:id
Find detail todo by Id

_Request Header_

{
  "access_token": "<your access token>"
}

_Request Body_

not needed

_Response (200 - Ok)_

[
  {
    "id": 1,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]

_Response (404 - Data not found)_

### PUT /todos/:id
Update todo by ID

_Request Header_

{
  "access_token": "<your access token>"
}

_Request Body_

{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}

_Response (200 - ok)_

{
  "id": <selected id>,
  "title": "<updated todo title>",
  "description": "<updated todo description>",
  "status": "<updated todo status>",
  "due_date": "<updated todo due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

_Response (404 - Data not found)_


### DELETE /todos/:id
Delete todo data by ID

_Request Header_

{
  "access_token": "<your access token>"
}

_Request Body_

not needed

_Response (200 - ok)_

[
  {
    "id": <selected id>,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]

_Response (404 - Data not found)_



Fancy Todo App Server
Fancy Todo App is an application to manage your assets. This app has :

````
ENDPOINTS
POST /register
POST /login
POST /todos
GET /todos
GET /todos/:id
PUT /todos/:id
DELETE /todos/:id
````

RESTful endpoints
POST /register
Create new user to database
Request Header

{
  "access_token": "<your access token>"
}
Request Body

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
Response (201 - Created)

{
  "id": <given id by system>,
  "email": "<posted email>",
  "password": "<posted password>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (500 - Internal server error)

POST /login
Login to todos

Request Header

{
  "access_token": "<your access token>"
}

Request Body

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}

Response (200)
[
  {
    "id": 1,
    "email": "<user email>",
    "password": "<user password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]

Response (400 - Invalid email/password)
OR
Response (500 - Internal server error)


GET /todos
Get all todos

Request Header

{
  "access_token": "<your access token>"
}
Request Body

not needed
Response (200)

[
  {
    "id": 1,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
Response (500 - Internal server error)


POST /todos
Create new todos

Request Header

{
  "access_token": "<your access token>"
}
Request Body

{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>"
}
Response (201 - Created)

{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "due_date": "<posted due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}

GET /todos/:id
Find detail todo by ID
Request Header

{
  "access_token": "<your access token>"
}

Request Body

not needed
Response(200)

[
  {
    "id": 1,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]

Response (404 - Not Found)

PUT /todos/:id
Update todo by ID
Request Header

{
  "access_token": "<your access token>"
}

Request Body

{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>"
}

Response (200)

{
  "id": <selected id>,
  "title": "<updated title>",
  "description": "<updated description>",
  "due_date": "<updated due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Error response:
Response (400 - Bad request)
OR
Response (404 - Not Found)
OR
Response (500 - Internal Server Error)


DELETE /todos/:id
Delete todo data by ID
Request Header

{
  "access_token": "<your access token>"
}

Request Body
not needed
Response(200)

[
  {
    "id": <selected id>,
    "title": "<todos name>",
    "description": "<todos description>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]

Error response:
Response (404 - Not Found)
OR
Response (500 - Internal Server Error)


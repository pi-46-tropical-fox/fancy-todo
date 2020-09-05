## Get(todos ) for showing list data 

Response(200)
[
  {
    "id": 1,
    "title": "Dinner",
    "description": "Dinner with Fam",
    "status" : "True",
    "due_date" : "2020-09-04",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id":2
    "title": "Free time",
    "description": "Nongkrong di kafe",
    "status" : "False",
    "due_date" : "2020-09-04",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]

Response(400)
{
  "message": "Invalid request"
}

## Post(todos add) for adding data into database

Request Header

{
  "access_token": "<jwt token>"
}
Request Body

{
    "name": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status" : "<status to get insert into>",
    "due_date" : "<status to get insetrt into>",

}
Response (201 - Created)

{
    "id": <given id by system>,
    "name": "<posted name>",
    "description": "<posted description>",
    "status" : "<posted status>",
    "due_date" : "<posted due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}



## PUT(todos edit) for editing data

Request Body

{
    "name": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status" : "<status to get insert into>",
    "due_date" : "<status to get insetrt into>",

}
Response (201 - Created)

{
    "id": <given id by system>,
    "name": "<posted name>",
    "description": "<posted description>",
    "status" : "<posted status>",
    "due_date" : "<posted due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}

## delete(todos delete)

Request Header

{
  "access_token": "<jwt token>"
}
Request Body
{
    not needed
}
Response (201 - Created)

{
   
}
Response (400 - Bad Request)

{
  "message": "delete data id not found"
}




## User Register

Request Header{
  not needed
}

Request Body{
  email : <email to get insert into>
  password : <password>
  username : <username>
}

Response (201 - Created)

{
    "id": <given id by system>,
    "email": <posted email>
    "password": <poseted password>
    "username" : <posted username>
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response(401 - Error)
{
  "msg": "Invalid email or password"
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}


## User Login

Request Header{
  not needed
}

Request Body{
  email : <email to get insert into>
  password : <password>
}

Response (201 - Created)

{
    "id": <given id by system>,
    "email": <posted email>
    "password": <poseted password>
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response(401 - Error)
{
  "msg": "Invalid email or password"
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}

## User Login Usign Google Account

Request Header{
  access_token : <google access token>
}

Request Body{
  not needed
}

Response (201 - Created)

{
    "id": <given id by system>,
    "email": <posted email>
    "password": <posted password>
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response(401 - Error)
{
  "msg": "Invalid email or password"
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}




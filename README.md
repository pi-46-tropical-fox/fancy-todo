# fancy-todo
A Todo-List App, Made With Express

# Endpoints
```
- GET /todos
- GET /todos/:id
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id
- POST /register
- POST /login
- GET /movies
```

# GET /todos
> Get All Todos
Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
Not Needed
```

Response 200(Success)
```
[
    {
        "id" : 1,
        "title": "Do Dishes",
        "description": "Do Dishes Before Mom Came",
        "status": "Not Done",
        "due_date": "2020-09-20T07:15:12.149Z",
        "createdAt" : "2020-09-21T07:15:12.149Z",
        "updateAt" : "2020-09-21T07:15:12.149Z",
        "User": {
                "email": "example1@email.com",
                "id": 1
            }
    },
    {
        "id" : 2,
        "title": "Do Extra Chores",
        "description": "Do Extra Chores To Get Pocket Money",
        "status": "Done",
        "due_date": "2020-09-20T07:15:12.149Z",
        "createdAt" : "2020-09-21T07:15:12.149Z",
        "updateAt" : "2020-09-21T07:15:12.149Z",
        "User": {
            "email": "example2@mail.com",
            "id": 2
        }
    },
    
]
```

Response 401 - Unauthorized(Failed)
```
{
    "errors": [
        "User Not Authenticated"
    ]    
}
``` 
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# GET /todos/:id
> Get Todo Based On Id
Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
    "id" : "<Id From The Todo Data>"
}
```

Response 200(Success)
```
{
    "id" : 1,
    "title": "Do Dishes",
    "description": "Do Dishes Before Mom Came",
    "status": "Not Done",
    "due_date": "2020-09-20T07:15:12.149Z",
    "createdAt" : "2020-09-21T07:15:12.149Z",
    "updateAt" : "2020-09-21T07:15:12.149Z"
}
```
Response 401 - Unauthorized(Failed)
```
{
    "errors": [
        "User Not Authenticated"
    ]    
}
```

Response 404 - Not Found(Failed)
```
{
    "errors": [
        "404 Not Found"
    ]    
}
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 


# POST /todos
> Create A New Todo
Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
    "title": "<todo's name>",
    "description": "<todo's description>",
    "status": "<todo's status>",
    "due_date": "<todo's due_date ( Must Not )>"

}
```

Response 201 - Created(Success)
```
{
    "title": "Do Dishes",
    "description": "Do Dishes Before Mom Came",
    "status": "Not Done",
    "due_date": "2020-09-20T07:15:12.149Z",
    "createdAt" : "2020-09-21T07:15:12.149Z",
    "updateAt" : "2020-09-21T07:15:12.149Z"
}
```

Response 400 - Bad Request(Failed)
```
[   
    errors : {
        "message": "Invalid requests"
    }
]
```

Response 401 - Unauthorized(Failed)
```
{
    "errors": [
        "User Not Authenticated"
    ]    
}
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# PUT /todos/:id
> Edit Existing Todo Data Based On Id
Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
    "id" : "<Id From The Todo Data>",
    "title": "<Title Changes You Wish To Made>",
    "description": "<Description Changes You Wish To Made>",
    "status": "<Status Changes You Wish To Made>"
}
```

Response 200(Success)
```
{
    "id" : 1,
    "title": "Practice Guitar",
    "description": "Guitar Practice",
    "status": "Done",
    "due_date": "2020-09-20T07:15:12.149Z",
    "createdAt" : "2020-09-21T07:15:12.149Z",
    "updateAt" : "2020-09-21T07:15:12.149Z"
}
```

Response 400 - Bad Request(Failed)
```
[   
    errors : {
        "message": "Invalid requests"
    }
]
```

Response 401 - Unauthorized(Failed)
```
{
    "errors": [
        "User Not Authenticated"
    ]    
}
```

```
Response 403 - Forbidden(Failed)
{
    "errors": [
        "Forbidden Access"
    ]
}
```
Response 404 - Not Found(Failed)
```
{
    "errors": [
        "404 Not Found"
    ]    
}
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# DELETE /todos/:id
> Delete Existing Todo Data Based On Id
Request Header
```
{
  "access_token": "<your access token>" 
}
```

Request Body
```
{
    "id" : "<Id From The Todo Data>"
}
```

Response 204(Success)
```
{
    Empty Body
}
```

Response 401 - Unauthorized(Failed)
```
{
    "errors": [
        "User Not Authenticated"
    ]    
}
```

```
Response 403 - Forbidden(Failed)
{
    "errors": [
        "Forbidden Access"
    ]
}
```
Response 404 - Not Found(Failed)
```
{
    "errors": [
        "404 Not Found"
    ]    
}
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# POST /login
> Login
Request Header
```
Not Needed
```

Request Body
```
{
    "email": "<user's email>",
    "password": "<user's description>",

}
```

Response 200(Success)
```
{
    "access_token": <access_token>",
}
```

Response 400 - Bad Request(Failed)
```
[   
    errors : {
        "message": "Invalid requests"
    }
]
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# POST /login
> Login
Request Header
```
Not Needed
```

Request Body
```
{
    "email": "<user's email>",
    "password": "<user's description>",

}
```

Response 201 - Created(Success)
```
{
    "email": <user's email>",
}
```

Response 400 - Bad Request(Failed)
```
[   
    errors : {
        "message": "Invalid requests"
    }
]
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# GET /movies
> Get Popular Movie List
Request Header
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
Not Needed
```

Response 200(Success)
```
[
    {
        "popularity": 1094.47,
        "vote_count": 141,
        "video": false,
        "poster_path": "/uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
        "id": 718444,
        "adult": false,
        "backdrop_path": "/x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg",
        "original_language": "en",
        "original_title": "Rogue",
        "genre_ids": [
            28
        ],
        "title": "Rogue",
        "vote_average": 5.9,
        "overview": "Battle-hardened O’Hara leads a lively mercenary team of soldiers on a daring mission: rescue hostages from their captors in remote Africa. But as the mission goes awry and the team is stranded, O’Hara’s squad must face a bloody, brutal encounter with a gang of rebels.",
        "release_date": "2020-08-20"
    },
    ...
]
```

Response 401 - Unauthorized(Failed)
```
{
    "errors": [
        "User Not Authenticated"
    ]    
}
``` 
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 
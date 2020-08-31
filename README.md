# fancy-todo
A Todo-List App, Made With Express

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
{
    "message": "Invalid requests"
}
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
        "updateAt" : "2020-09-21T07:15:12.149Z"
    },
    {
        "id" : 2,
        "title": "Do Extra Chores",
        "description": "Do Extra Chores To Get Pocket Money",
        "status": "Done",
        "due_date": "2020-09-20T07:15:12.149Z",
        "createdAt" : "2020-09-21T07:15:12.149Z",
        "updateAt" : "2020-09-21T07:15:12.149Z"
    },
    
]
```

Response 400 - Bad Request(Failed)
```
{
    "message": "Invalid requests"
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

Response 400 - Bad Request(Failed)
```
{
    "message": "Invalid requests"
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
{
    "message": "Invalid requests"
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

Response 400 - Bad Request(Failed)
```
{
    "message": "Invalid requests"
}
```

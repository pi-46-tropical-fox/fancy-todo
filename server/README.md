# Fancy Todo Server
This Fancy Todo server has:
* RESTful endpoint for todos (CRUD Operation)
* JSON formatted response

## RESTful endpoints

### POST /todos
> Create a new todo

_Request Body_
```json
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```json
{
    "id": "<todo id>",
    "name": "<todo name>",
    "description: "<todo description>",
    "due_date": "<todo due date>",
    "createdAt": "<todo created at>",
    "updatedAt": "<todo created at>"
}
```

_Response (400 -  Bad request)_
```json
{
    "validation_errors": [
        {
            "name": "<validation name>",
            "message": "<validation message>"
        }
    ]
}
```

_Response (500 - Internal server error)_
```json
{
    "message": "Internal server error"
}
```

### GET /todos
> Get all todos

_Request Body_
```
not needed
```

_Response (200 - OK)_
```json
[
    {
        "id": "<todo id>",
        "name": "<todo name>",
        "description: "<todo description>",
        "due_date": "<todo due date>",
        "createdAt": "<todo created at>",
        "updatedAt": "<todo created at>"
    }
]
```

_Response (500 - Internal server error)_
```json
{
    "message": "Internal server error"
}
```

### GET /todos/:id
> Get todo by id

_Request Body_
```
not needed
```

_Response (200 - OK)_
```json
[
    {
        "id": "<todo id>",
        "name": "<todo name>",
        "description: "<todo description>",
        "due_date": "<todo due date>",
        "createdAt": "<todo created at>",
        "updatedAt": "<todo created at>"
    }
]
```

_Response (404 - Not Found)_
```json
{
    "message": "Error todo not found"
}
```

_Response (500 - Internal server error)_
```json
{
    "message": "Internal server error"
}
```

### PUT /todos/:id
> Update a todo

_Request Body_
```json
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (200 - OK)_
```json
{
    "id": "<todo id>",
    "name": "<todo name>",
    "description: "<todo description>",
    "due_date": "<todo due date>",
    "createdAt": "<todo created at>",
    "updatedAt": "<todo created at>"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Error todo not found"
}
```

_Response (400 -  Bad request)_
```json
{
    "validation_errors": [
        {
            "name": "<validation name>",
            "message": "<validation message>"
        }
    ]
}
```

_Response (500 - Internal server error)_
```json
{
    "message": "Internal server error"
}
```

### DELETE /todos/:id
> Delete a todo

_Request Body_
```
not needed
```

_Response (200 - OK)_
```json
{
    "id": "<todo id>",
    "name": "<todo name>",
    "description: "<todo description>",
    "due_date": "<todo due date>",
    "createdAt": "<todo created at>",
    "updatedAt": "<todo created at>"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Error todo not found"
}
```

_Response (500 - Internal server error)_
```json
{
    "message": "Internal server error"
}
```
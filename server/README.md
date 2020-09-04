# Fancy Todo
## API Documentation

### GET /todos
> Gets all the todos belonging to the user
#### Request Header 
```json
{
    "access_token": "<JWT Access Token>"
}
```
#### Request Body
```
not required
``` 
Response (200)
```json
[
    {
        "id" : 1,
        "title" : "Ngepel kamar",
        "description" : "jangan lupa ngepel kamar",
        "status" : "done",
        "due_date" : "2020-09-02",
        "createdAt" : "2020-08-31T09:41:55.532Z",
        "updatedAt" : "2020-08-31T09:41:55.532Z",
    },
    {
        "id" : 2,
        "title" : "Nyapu kamar",
        "description" : "jangan lupa ngepel kamar",
        "status" : "",
        "due_date" : "2020-09-02",
        "createdAt" : "2020-08-31T09:41:55.532Z",
        "updatedAt" : "2020-08-31T09:41:55.532Z",
    }
]
```
Response (500)
```
500 Internal Server Error
```

### POST /todos
> Inserts a todo
#### Request Header 
```json
{
    "Content-Type" : "application/json"
}
```
#### Request Body
```json
{
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "due_date" : "2020-09-02",
}
```

#### Response (201)
```json
{
    "id" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "done",
    "due_date" : "2020-09-02",
    "createdAt" : "2020-08-31T09:41:55.532Z",
    "updatedAt" : "2020-08-31T09:41:55.532Z",
}
```
#### Response (400)
```json
{
    "errors" : [
        "Judul Invalid"
    ]
}
```
#### Response (500)
```
500 - Internal Server Error
```

### GET /todos/:id
#### Request Header 
```json
{
    "access_token": "<JWT Access Token>"
}
```
#### Request Body
```
not required
``` 
#### Response (200)
```json
{
    "id" : 1,
    "userId" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "done",
    "due_date" : "2020-09-02",
    "createdAt" : "2020-08-31T09:41:55.532Z",
    "updatedAt" : "2020-08-31T09:41:55.532Z",
}
```
#### Response (404)
```json
{
    "error" : "Not found"
}
```

### PUT /todos/:id
#### Request Header
```json
{
    "Content-Type" : "application/json",
    "access_token" : "<access_token>"
}
```

#### Request Body
```json
{
    "userId" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "done",
    "due_date" : "2020-09-02",
}   
```

#### Response (200)
```json
{
    "id" : 1,
    "userId" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "done",
    "due_date" : "2020-09-02",
    "createdAt" : "2020-08-31T09:41:55.532Z",
    "updatedAt" : "2020-08-31T09:41:55.532Z",
}
```

#### Response (404)
```json
{
    "error" : "Not found"
}
```

#### Response (500)
```
500 - Internal Server Error
```

### DELETE /todos/:id
#### Request Header 
```
{
    "access_token": "<JWT Access Token>"
}
```
#### Request Body
```
not required
``` 
#### Response (200)
```json
{
    "id" : 1,
    "userId" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "done",
    "due_date" : "2020-09-02",
    "createdAt" : "2020-08-31T09:41:55.532Z",
    "updatedAt" : "2020-08-31T09:41:55.532Z",
}
```
#### Response (404)
```json
{
    "error" : "Not found"
}
```
#### Response (500)
```
500 - Internal Server Error
```
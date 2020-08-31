# My Assets App Server
fancy Todos App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
```
    POST /todos

```

### POST /todos

> Create new asset

_Request Header_
```
{
  "Content-Type": "application/json"
```

_Request Body_
```
{
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize
  "due-date" : "2020-01-29"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize
  "due-date" : "2020-01-29"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
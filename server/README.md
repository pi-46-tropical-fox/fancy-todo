# Fancy Todo Server

This Fancy Todo server has:

- RESTful endpoint for todos (CRUD Operation)
- JSON formatted response

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
	"description": "<todo description>",
	"status": "<todo status>",
	"due_date": "<todo due date>",
	"UserId": "<todo user id>",
	"createdAt": "<todo created at>",
	"updatedAt": "<todo created at>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Title cannot null"
		},
		{
			"name": "is_null",
			"message": "Description cannot null"
		},
		{
			"name": "is_null",
			"message": "Status cannot null"
		},
		{
			"name": "is_null",
			"message": "Due date cannot null"
		},
		{
			"name": "notPast",
			"message": "Due date cannot yesterday or past"
		},
		{
			"name": "notEmpty",
			"message": "Title cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Description cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Status cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Due date cannot empty"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
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
		"description": "<todo description>",
		"status": "<todo status>",
		"due_date": "<todo due date>",
		"UserId": "<todo user id>",
		"createdAt": "<todo created at>",
		"updatedAt": "<todo created at>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
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
{
	"id": "<todo id>",
	"name": "<todo name>",
	"description": "<todo description>",
	"status": "<todo status>",
	"due_date": "<todo due date>",
	"UserId": "<todo user id>",
	"createdAt": "<todo created at>",
	"updatedAt": "<todo created at>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error todo not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorized",
			"message": "User not authorized accessing this Todo"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
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
	"description": "<todo description>",
	"status": "<todo status>",
	"due_date": "<todo due date>",
	"UserId": "<todo user id>",
	"createdAt": "<todo created at>",
	"updatedAt": "<todo created at>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error todo not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorized",
			"message": "User not authorized accessing this Todo"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Title cannot null"
		},
		{
			"name": "is_null",
			"message": "Description cannot null"
		},
		{
			"name": "is_null",
			"message": "Status cannot null"
		},
		{
			"name": "is_null",
			"message": "Due date cannot null"
		},
		{
			"name": "notPast",
			"message": "Due date cannot yesterday or past"
		},
		{
			"name": "notEmpty",
			"message": "Title cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Description cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Status cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Due date cannot empty"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
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
	"description": "<todo description>",
	"status": "<todo status>",
	"due_date": "<todo due date>",
	"UserId": "<todo user id>",
	"createdAt": "<todo created at>",
	"updatedAt": "<todo created at>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error todo not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorized",
			"message": "User not authorized accessing this Todo"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /register

> Register a new user

_Request Body_

```json
{
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<user id>",
	"email": "<user email>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Email cannot null"
		},
		{
			"name": "is_null",
			"message": "Password cannot null"
		},
		{
			"name": "minLength",
			"message": "Password must be minimal 6 characters"
		},
		{
			"name": "isEmail",
			"message": "Email format is invalid"
		},
		{
			"name": "notEmpty",
			"message": "Email cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Password cannot empty"
		},
		{
			"name": "not_unique",
			"message": "Email already registered"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /login

> Login to app

_Request Body_

```json
{
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (200 - OK)_

```json
{
	"access_token": "<access_token>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "invalidLogin",
			"message": "Invalid email or password!"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /holidays

> get list of indonesian holidays

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"date": "2020-01-01",
		"localName": "Tahun Baru Masehi",
		"name": "New Year's Day",
		"countryCode": "ID",
		"fixed": true,
		"global": true,
		"counties": null,
		"launchYear": null,
		"type": "Public"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "invalidHeaderRapidAPI",
			"message": "Invalid Header Rapid API"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

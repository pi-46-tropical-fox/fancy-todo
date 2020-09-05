# fancy-todo
Make a website to manage interesting things to do. This app has :
* CRUD Todo
* Register and Login
* JSON formatted response

&nbsp;

## RESTful endpoints
```
 - POST /todos
 - GET /todos
 - GET /todos/:id
 - PUT /todos/:id
 - DELETE /todos/:id
 - POST /user/register
 - POST /user/login
 - POST /user/googleLogin
 - GET thirdparty/weather
```

### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into with validation so that there is no due date behind the date when this request is created>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z",
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /todos

> Get all todos

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

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z",
  },
  {
    "id": 2,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z",
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /todos/:id

> Get todo based on id

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

_Response (200 - OK)_
```
{
  "id": <requested id>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z",
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### PUT /todos/:id

> Update todo based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into with validation so that there is no due date behind the date when this request is created>"
}
```

_Response (200 - OK)_
```
[
  {
    "id": <requested id>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-08-31T06:30:49.914Z",
    "updatedAt": "2020-08-31T06:30:49.914Z",
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /todos/:id

> Delete todo based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
1
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /user/register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "access_token": "<your access token>",
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ] 
}
```
---
### POST /user/login

> Logged in an existing user and authenticate his/her credentials

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "email": "<your_email@provider.domain>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Invalid email or password"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ] 
}
```
---
### POST /user/googleLogin

> Create new user using google sign in if it is not exists in the database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "avatar": "<your gogle profile picture>",
  "email": "<your google email>"
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "The verifyIdToken method requires an ID Token"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]  
}
```

#### _for more information about google oAuth please visit https://developers.google.com/gdata/docs/auth/overview_
---
### GET /thirdparty/weather

> Get information about current weather in local area

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "request": {
    "type": "City",
    "query": "Denpasar, Indonesia",
    "language": "en",
    "unit": "m"
  },
  "location": {
    "name": "Denpasar",
    "country": "Indonesia",
    "region": "Bali",
    "lat": "-8.650",
    "lon": "115.217",
    "timezone_id": "Asia/Makassar",
    "localtime": "2020-09-05 14:05",
    "localtime_epoch": 1599314700,
    "utc_offset": "8.0"
  },
  "current": {
    "observation_time": "06:05 AM",
    "temperature": 30,
    "weather_code": 113,
    "weather_icons": [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
    ],
    "weather_descriptions": [
      "Sunny"
    ],
    "wind_speed": 13,
    "wind_degree": 140,
    "wind_dir": "SE",
    "pressure": 1008,
    "precip": 0,
    "humidity": 55,
    "cloudcover": 0,
    "feelslike": 32,
    "uv_index": 7,
    "visibility": 10,
    "is_day": "yes"
  }
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]  
}
```

#### _for more information regarding error messages please visit https://weatherstack.com/documentation#api_error_codes_
---
### GET /thirdparty/quotes

> Get motivational quotes of the day

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "qotd_date": "2020-09-06T00:00:00.000+00:00",
  "quote": {
    "id": 62443,
    "dialogue": false,
    "source": "A Feast for Crows",
    "context": "Victarion Greyjoy, the Iron Captain",
    "private": false,
    "tags": [],
    "url": "https://favqs.com/quotes/george-r-r-martin/62443-every-man-sho-",
    "favorites_count": 1,
    "upvotes_count": 0,
    "downvotes_count": 0,
    "author": "George R.R. Martin",
    "author_permalink": "george-r-r-martin",
    "body": "Every man should lose a battle in his youth, so he does not lose a war when he is old."
  }
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]  
}
```

#### _for more information regarding error messages please visit https://favqs.com/api#collapseErrorCodes_
---
### References
- https://gist.github.com/iros/3426278#file-example-md
- https://github.com/Sursev07/documentation-example
- https://www.markdownguide.org/basic-syntax
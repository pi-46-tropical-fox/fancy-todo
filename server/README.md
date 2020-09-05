# Fancy Todo - API Documentation
## Endpoints

```
POST /register
POST /login

GET /todos
POST /todos
GET /todos/:id
PUT /todos/:id
DELETE /todos/:id

GET /movies
```

## POST /register
### Request Body
```json
{
    "username" : "reaganiwadha",
    "password" : "password",
    "email" : "myemail@email.com"
}
```

### Response (200)
```json
{
    "id" : 6,
    "email" : "myemail@email.com"
}
```

### Response (400)
```json
{
    "errors": [
        "Username must not contain commas or spaces!",
        "Password harus melebihi 6 karakter"
    ]
}
```

## POST /login
### Request Body
```json
{
    "email" : "myemail@email.com",
    "password" : "password"
}
```

### Response (200)
```json
{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwiaWF0IjoxNTk5Mjk5NjIxfQdoJAG3kHMzggv02PFiGoika2fVAcosBYzM40ldIb3EY",
    "username" : "reaganiwadha",
    "email" : "myemail@email.com"
}
```

### Response (400)
```json
{
    "errors" : "Username/Password not found"
}
```

## GET /todos
> Gets all the todos belonging to the user
### Request Header 
```json
{
    "access_token": "<JWT Access Token>"
}
```
### Request Body
```
not required
``` 
### Response (200)
```json
[
    {
        "id" : 1,
        "title" : "Clean the second floor",
        "description" : "Don't forget under the bed",
        "status" : "Done",
        "due_date" : "2020-09-02",
        "createdAt" : "2020-08-31T09:41:55.532Z",
        "updatedAt" : "2020-08-31T09:41:55.532Z",
    },
    {
        "id" : 2,
        "title" : "Clean the room",
        "description" : "Don't forget to mop it",
        "status" : "On Progress",
        "due_date" : "2020-09-02",
        "createdAt" : "2020-08-31T09:41:55.532Z",
        "updatedAt" : "2020-08-31T09:41:55.532Z",
    }
]
```
### Response (401) Unauthorized
```json
{
    "errors": [
        "User not authenticated"
    ]
}
```

### Response (500)
```
500 Internal Server Error
```

## POST /todos
> Inserts a todo
### Request Header 
```json
{
    "Content-Type" : "application/json",
    "access_token": "<JWT Access Token>"
}
```
### Request Body
```json
{
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "due_date" : "2020-09-02",
}
```

### Response (201)
```json
{
    "id" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "Waiting",
    "due_date" : "2020-09-02",
    "createdAt" : "2020-08-31T09:41:55.532Z",
    "updatedAt" : "2020-08-31T09:41:55.532Z",
}
```
### Response (400)
```json
{
    "errors" : [
        "Title Invalid"
    ]
}
```
### Response (500)
```
500 - Internal Server Error
```

## GET /todos/:id
> Gets a todo based of an id
### Request Header 
```json
{
    "access_token": "<JWT Access Token>"
}
```
### Request Body
```
not required
``` 
### Response (200)
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
### Response (404)
```json
{
    "errors" : [
        "not found"
    ]
}
```

### Response (403)
```json
{
    "errors" : [
        "forbidden access"
    ]
}
```

## PUT /todos/:id
> Updates a todo based of an id
### Request Header
```json
{
    "Content-Type" : "application/json",
    "access_token" : "<access_token>"
}
```

### Request Body
```json
{
    "userId" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "Done",
    "due_date" : "2020-09-02",
}   
```

### Response (200)
```json
{
    "id" : 1,
    "userId" : 1,
    "title" : "Ngepel kamar",
    "description" : "jangan lupa ngepel kamar",
    "status" : "Done",
    "due_date" : "2020-09-02",
    "createdAt" : "2020-08-31T09:41:55.532Z",
    "updatedAt" : "2020-08-31T09:41:55.532Z",
}
```

### Response (404)
```json
{
    "errors" : [
        "not found"
    ]
}
```

### Response (403)
```json
{
    "errors" : [
        "forbidden access"
    ]
}
```

### Response (500)
```
500 - Internal Server Error
```

## DELETE /todos/:id
> Deletes a todo based of an id
### Request Header 
```json
{
    "access_token": "<JWT Access Token>"
}
```
### Request Body
```
not required
``` 
### Response (200)
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
### Response (404)
```json
{
    "errors" : [
        "not found"
    ]
}
```

### Response (403)
```json
{
    "errors" : [
        "forbidden access"
    ]
}
```

### Response (500)
```
500 - Internal Server Error
```
##


## GET /movies
> Search a movie by a keyword

### Request Header 
```json
{
    "access_token": "<JWT Access Token>"
}
```

### Query parameters
```json
{
    "q" : "Batman"
}
```

### Response (200)
```json
[
    {
        "popularity": 42.666,
        "vote_count": 4968,
        "video": false,
        "poster_path": "https://image.tmdb.org/t/p/w200//lH3dsbxA4wLalWKNYpVldX8zfPP.jpg",
        "id": 268,
        "adult": false,
        "backdrop_path": "/2va32apQP97gvUxaMnL5wYt4CRB.jpg",
        "original_language": "en",
        "original_title": "Batman",
        "genre_ids": [
            28,
            14
        ],
        "title": "Batman",
        "vote_average": 7.2,
        "overview": "Having witnessed his parents' brutal murder as a child, millionaire philanthropist Bruce Wayne fights crime in Gotham City disguised as Batman, a costumed hero who strikes fear into the hearts of villains. But when a deformed madman who calls himself \"The Joker\" seizes control of Gotham's criminal underworld, Batman must face his most ruthless nemesis ever while protecting both his identity and his love interest, reporter Vicki Vale.",
        "release_date": "1989-06-23",
        "infoUrl": "https://www.themoviedb.org/movie/268"
    },
    {
        "popularity": 43.201,
        "vote_count": 14873,
        "video": false,
        "poster_path": "https://image.tmdb.org/t/p/w200//1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg",
        "id": 272,
        "adult": false,
        "backdrop_path": "/xqzilMDWLohLpAG5qkd7eVnbsjx.jpg",
        "original_language": "en",
        "original_title": "Batman Begins",
        "genre_ids": [
            28,
            80,
            18
        ],
        "title": "Batman Begins",
        "vote_average": 7.7,
        "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
        "release_date": "2005-06-10",
        "infoUrl": "https://www.themoviedb.org/movie/272"
    },
    {
        "popularity": 40.868,
        "vote_count": 389,
        "video": false,
        "poster_path": "https://image.tmdb.org/t/p/w200//eiVQORVyVuNNZHPAELuWtlXoQsD.jpg",
        "id": 537056,
        "adult": false,
        "backdrop_path": "/eevJuYAitUe6VwFN29aFwzeyeTr.jpg",
        "original_language": "en",
        "original_title": "Batman: Hush",
        "genre_ids": [
            28,
            16,
            80,
            9648
        ],
        "title": "Batman: Hush",
        "vote_average": 7.3,
        "overview": "A mysterious new villain known only as Hush uses a gallery of villains to destroy Batman's crime-fighting career as well as Bruce Wayne's personal life, which has been further complicated by a  relationship with Selina Kyle/Catwoman.",
        "release_date": "2019-07-19",
        "infoUrl": "https://www.themoviedb.org/movie/537056"
    }
]
```

### 

### Response (500)
```
500 Internal Server Error
```

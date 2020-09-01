# Todoers! API

## Todo

### **Show Todos**

Fetch and returns JSON data of todos.

URL

/todos

Method

`GET`

URL Params

None

Data Params

None

Success Response

Code -

`200`

Content

```json
{
    "id": 1,
    "title": "harus selesai coding!",
    "description": "ngoding sersan (serius tapi santai) sembari dikejer deadline",
    "status": "pending",
    "due_date": "2020-09-29T17:00:00.000Z",
    "updatedAt": "2020-08-31T12:12:40.510Z",
    "createdAt": "2020-08-31T12:12:40.510Z"
}
```

* **Error Response**

Code - `401 UNAUTHORIZED`

Content `{ error : "You are unauthorized to make this request." }`

* **Sample Call**

```markdownjavascript
$.ajax({
    url: "/todos",
    dataType: "json",
    type: "GET",
    success: function(r) {
    console.log(r);
    }
});
```

***

### **Create Todo**

Creates a new todo data.

* **URL**

/todos

* **Method**

`POST`

* **URL Params**

None

* **Data Params**

Required

```markdown
title=[string]
description=[string]
due_date=[date]
```

Optional

```markdown
status=[string]
```

* **Success Response**

Code - `201`

Content

```json
{
    "id": 1,
    "title": "harus selesai coding!",
    "description": "ngoding sersan (serius tapi santai) sembari dikejer deadline",
    "status": "pending",
    "due_date": "2020-09-29T17:00:00.000Z",
    "updatedAt": "2020-08-31T12:12:40.510Z",
    "createdAt": "2020-08-31T12:12:40.510Z"
}
```

* **Error Response**

Code - `401 UNAUTHORIZED`

Content `{ error : "You are unauthorized to make this request." }`

* **Sample Call**

```markdownjavascript
$.ajax({
    url: "/todos",
    type: "POST",
    dataType: 'JSON',
    data: {
        title: 'harus selesai coding!',
        description: 'ngoding sersan (serius tapi santai) sembari dikejer deadline',
        due_date: '2020/09/30',
        status: 'pending'
    },
    success: function(r) {
        console.log(r);
    }
});
```

***

### **Update Todo**

Updates an existing todo data.

* **URL**

/todos/:id

* **Method**

`PUT`

* **URL Params**

Required

`id=[integer]`

Optional

None

* **Data Params**

Required

```markdown
title=[string]
description=[string]
due_date=[date]
```

Optional

```markdown
status=[string]
```

* **Success Response**

Code - `200`

Content

```json
{
    "id": 1,
    "title": "coding harus kreatif!",
    "description": "ngoding sersan (serius tapi santai) sembari dikejer deadline",
    "status": "completed",
    "due_date": "2020-09-29T17:00:00.000Z",
    "updatedAt": "2020-08-31T12:12:40.510Z",
    "createdAt": "2020-08-31T12:12:40.510Z"
}
```

* **Error Response**

Code - `404 NOT FOUND`

Content `{ error : "The todo data you're searching for is not found." }`

Code - `401 UNAUTHORIZED`

Content `{ error : "You are unauthorized to make this request." }`

* **Sample Call**

```markdownjavascript
$.ajax({
    url: "/todos",
    type: "POST",
    dataType: 'JSON',
    data: {
        title: 'coding harus kreatif!',
        description: 'ngoding sersan (serius tapi santai) sembari dikejer deadline',
        due_date: '2020/09/30',
        status: 'completed'
    },
    success: function(r) {
        console.log(r);
    }
});
```

***

### **Delete Todo**

Creates a new todo data.

* **URL**

/todos

* **Method**

`POST`

* **URL Params**

None

* **Data Params**

None

* **Success Response**

Code - `200`

Content

```json
{
    "msg": "Todo with ID [id] was successfully deleted"
}
```

* **Error Response**

Code - `404 NOT FOUND`

Content `{ error : "The todo data you're searching for is not found" }`

Code - `401 UNAUTHORIZED`

Content `{ error : "You are unauthorized to make this request." }`

* **Sample Call**

```markdownjavascript
$.ajax({
    url: "/todos/:id",
    type: "DELETE",
    dataType: 'JSON',
    success: function(r) {
        console.log(r);
    }
});
```

## Auth

### **Login**

Logs user into the app.

URL

`/u/login`

Method

`POST`

URL Params

None

Data Params

* **Required**

`username=[string]`

`password=[string]`

Success Response

Code - `200`

Content

```json
{
    "id": [id],
    "name": "[name]",
    "username": "[username]",
    "updatedAt": "2020-08-31T12:12:40.510Z",
    "createdAt": "2020-08-31T12:12:40.510Z"
}
```

* **Error Response**

Code - `403 UNAUTHORIZED`

Content `{ error : "The username or password you input is incorrect." }`

* **Sample Call**

```markdownjavascript
$.ajax({
    url: "/u/login",
    dataType: "json",
    type: "POST",
    data: data,
    success: function(r) {
    console.log(r);
    }
});
```

***

### **Register**

Registers user into a database

URL

/u/register

Method

`POST`

URL Params

None

Data Params

* **Required**

`name=[string]`

`username=[string]`

`password=[string]`

Success Response

Code - `200`

Content

```json
{
    "id": [id],
    "name": "[name]",
    "username": "[username]",
    "updatedAt": "2020-08-31T12:12:40.510Z",
    "createdAt": "2020-08-31T12:12:40.510Z"
}
```

* **Error Response**

Code - `400 BAD REQUEST`

Content `{ error : [Error(s) will depend on user input] }`

* **Sample Call**

```markdownjavascript
$.ajax({
    url: "/u/login",
    dataType: "json",
    type: "POST",
    data: data,
    success: function(r) {
    console.log(r);
    }
});
```

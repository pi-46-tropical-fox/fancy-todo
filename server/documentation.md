# **Tasks**
  An application to list what you should do. By you, for you. Features:
  * CRUD tasks
  * Register and Login
  * JSON formatted 

&nbsp;
## **Endpoints**
---
  * `POST` /register
  * `POST` /login
  * `GET` /todos
  * `POST` /todos
  * `GET` /todos/:id
  * `PUT` /todos/:id
  * `PATCH` /todos/:id
  * `DELETE` /tasks/:id

&nbsp;
### **`POST` /register**
---
  Register a new user

* **Request Body**
    <br/>
    **Content**: `{ username, email, password }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ username, email }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ <error message> }`

<!-- ----------------------------------------------------------------- -->
### **`POST` /login**
---
  Login into the application

* **Request Body**
    <br/>
    **Content**: 
    ```
    {
      username,
      password
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ access_token: <jwt_token> }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ <error message> }`

<!-- ----------------------------------------------------------------- -->
### **`GET` /tasks**
---
  Shows all active tasks

* **Request Headers**
    <br/>
    **Content:** `{ access_token: <jwt_token> }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
  ```
    [
        {
            title,
            description,
            due_date,
            status,
            completedAt, <-- if status = true
            createdBy
        }
    ]
  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

<!-- ----------------------------------------------------------------- -->
### **`POST` /tasks**
---
 Add a new task

* **Request Headers**
    <br/>
    **Content:** `{ access_token: <jwt_token> }`

* **Request Body**
    <br/>
    **Content**:
    ```
    {
        "taskName": required String,
        "deadline": DateTime
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    [
        {
            "id": <system generated>
            "taskName": String,
            "deadline": DateTime
            "createdAt": DateTime,
            "updatedAt": DateTime,
            "completed": false,
            "completedAt": null
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid requests" }`

      OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**`{ error : "You are unauthorized to make this request." }`

<!-- ----------------------------------------------------------------- -->
### **`GET` /todos/:id**
---
  Show todo details

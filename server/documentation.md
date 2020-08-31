# **Tasks**
  An application to list what you should do. By you, for you. Features:
  * CRUD tasks
  * Register and Login
  * JSON formatted 

&nbsp;
## **Endpoints**
---
  * `GET` /tasks
  * `POST` /tasks
  * `PUT` /tasks/:id
  * `PATCH` /tasks/:id
  * `DELETE` /tasks/:id
  * `GET` /completed
  * `POST` /register
  * `POST` /login

&nbsp;
### **`GET` /tasks**
---
  Shows all active tasks

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
```
    [
        {
            "id": 1,
            "taskName": String,
            "deadline": DateTime,
            "completed": Boolean,
            "completedAt": DateTime,
            "createdAt": DateTime
        }
    ]
```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

### **`POST` /tasks**
---
 Add a new task

* **Request Body**
    <br/>
    **Content**:
    ```
    {
        "taskName": required String,
        "deadline": DateTime,
        "routine": Boolean,
        "reminder": DateTime
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
            "deadline": DateTime,
            "routine": Boolean,
            "reminder": DateTime,
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
# Kanban Apps
Kanban App is application to tracking task for each member of project. It performs CRUD action based on RESTful concepts.

## Dependencies
1. Node JS
2. Express JS framework
3. PostgreSQL + Sequelize
4. bcryptjs
5. axios
6. cors
7. google-auth-library

## Dev Dependencies
1. dotenv
2. nodemon

## Route List
 - POST /login,
 - POST /register,
 - POST /tasks,
 - GET /tasks,
 - GET /tasks/:id,
 - PUT /tasks/:id,
 - PATCH /tasks/:id,
 - DELETE /tasks/:id

## POST /login , "Home/Login Page"
### Requirement/Request
``` json
    Request Body
    {
        "email" : <user@mail.com, string>,
        "password" : <hidden, string>
    }
```
### Response
```json
    Response (200)
    {
        "id": <given id by system, integer>,
        "email": <user@mail.com, string>,
    }
    {
        "message" : "Login Success"
    }

    Response (401) Authorization
    Response (500) Internal Server
```

## POST /register , "Register Page"
### Requirement/Request
``` json
    Request Body
    {
        "email" : <user@mail.com, string>,
        "password" : <hidden, string>
    }
```

### Response
```json
    Response (201 - Created)
    {
        "id": <given id by system, integer>,
        "email": <user@mail.com, string>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>,
    },
    {
        "message" : "Thank you for Sign up, Please login to continue"
    }

    Response (401) Authorization
    Response (500) Internal Server
```

## POST /tasks
### Requirement/Request
```json
    Request Header
    {
    "access_token": <your access token, string>
    }

    Request Body
    {
        "title" : <your title, string>,
        "category" : <data type string>,
    }
```

### Response
```json
    Response (201 - Created)
    {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>
        "title" : <your title, string>,
        "category" : <data type string, autofilled depends on choosed table>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>
    },
    {
        "message" : "Task at Selected Category Added"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## GET /tasks
### Requirement/Request
```json
    Request Header
    {
    "access_token": <your access token, string>
    }
    Request Body
    {
        -
    }
```

### Response
```json
    Response (200 - OK)
    [
        {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>,
        "title" : <your title, string>,
        "category" : <data type string>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>,
        "User": {
            "id": <given id by system, integer>,
            "email": <user@mail.com, string>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>,
            }
        },
        {
            ...
        }
    ]
    {
        "message" : "Task List From All Category Loaded"
    }

    Response (500) Internal Server
```

## GET /tasks/:id
### Requirement/Request
```json
    Request Header
    {
         "access_token": <your access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - OK)
    {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>
        "title" : <your title, string>,
        "category" : <data type string>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>
    },
    {
        "message" : "Specified Tasks Loaded"
    }

    Response (404) Data not found,
    Response (500) Internal Server
```

## PUT /tasks/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <your access token, string>
    }

    Request Params
    {
        id: <id from param>
    }

    Request Body
    {
        "title" : <your title, string>,
    }
```

### Response
``` json
    Response (200 - OK)
    {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>,
        "title" : <your title, string>,
        "category" : <data type string>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>
    },
    {
        "message" : "Specified Tasks Updated"
    }

    Response (400) Validate not meet requirement
    Response (404) Data not found
    Response (500) Internal Server
```


## PATCH /tasks/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <your access token, string>
    }

    Request Params
    {
        id: <id from param>
    }

    Request Body
    {
        "category" : <data type string>,
    }
```
### Response
```json
    Response (200 - OK)
    {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>,
        "title" : <your title, string>,
        "category" : <data type string>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>
    },
    {
        "message" : "Specified Tasks category updated"
    }

    Response (400) Validate not meet requirement
    Response (404) Data not found
    Response (500) Internal Server
```

## DELETE /tasks/:id

### Requirement/Request
```json
    Request Header
    {
        "access_token": <your access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - OK)
    {
        "message" : "Task success to delete"
    }

    Response (404) Data not found
    Response (500) Internal Server
```

## Fail Responses
```json
    Response (400) Validate not meet requirement
    {
        "errors" : [
            "title can't be empty",
        ]
    }

    Response (401) Authorization  
    {
        "errors" : [
            "Invalid Email/Password",
            "Email can't be empty",
            "Password can't be empty",
            "Email already exists",
            "You don't have permission to edit this task"
            ]
    }

    Response (404) Data not found
    {
        "errors" : ["Data not found"]
    }

    Response (500) Internal Server
    {
        "errors" : ["Internal server error"]
    }

```
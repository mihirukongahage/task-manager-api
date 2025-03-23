# Task Manager API

A Node.js server using,

- Expressjs
- REST
- AWS SDK
- AWS Services: Dynamodb, S3

- Swagger Documentation

## Run the application

1. Clone the Github Project

```sh
git clone <github link>
```

2. Install the dependencies and devDependencies

```sh
cd /task-manager-api
npm install
```

### Setup AWS services

Set `.env` file with below variables.

```sh
# AWS CONFIGS
AWS_REGION="<region>"
AWS_ACCESS_KEY="<access_key>"
AWS_SECRET_KEY="<secret_key>"

DYNAMODB_TABLE_NAME="<dynamodb_db_tablename>"
S3_BUCKET_NAME="<s3_bucket_name>"

# port configs
PORT="<port>"
```

3. Initialize AWS resources

```sh
terraform init
terraform apply
```

Set you region, dynamodb table name, and S3 table name.

4. Start the Server in development

```sh
npm start dev
```

## How to use the APIs

### The available endpoints

#### REST APIs

The endpoint should be called by adding the prefix `http://<host>:<port>/api/` to the below endpoints.

Currently configured to `http://localhost:3000/api/`

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by id
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete a task

- `POST /upload` - Upload a file

### Swagger documentation

Swagger API documentation is available with more information.

```sh
http://localhost:3000/api/docs
```

## Features Implemented

- CRUD functionalities for tasks
- Upload a files

## Folder Structure

```bash
src
├── app.ts
├── configs
│   └── aws-config.ts
├── controllers
│   └── task.controller.ts
├── dtos
│   └── task.dto.ts
├── middleware
│   ├── error-handler.middleware.ts
│   └── validation.middleware.ts
├── models
│   └── task.model.ts
├── repositories
│   ├── dynamodb-task.repository.ts
│   ├── s3.repository.ts
│   └── task.repository.interface.ts
├── routes
│   └── task.routes.ts
├── server.ts
├── services
│   ├── file-upload.service.ts
│   ├── task.service.test.ts
│   └── task.service.ts
└── utils
    └── uuid.util.ts
```

## Highlevel Architecture

![alt text](documentation/highlevel-architecture.png?raw=true)

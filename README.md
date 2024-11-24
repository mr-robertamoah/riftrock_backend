# RiftRock Backend

This is a NestJS-based application featuring authentication, file management, and various service modules. It integrates with Prisma for database management and AWS S3 for file storage.

---

## Table of Contents

- [RiftRock Backend](#riftrock-backend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Features](#features)
  - [Routes](#routes)
    - [Authentication Routes](#authentication-routes)
    - [User Management Routes](#user-management-routes)
    - [Service Management Routes](#service-management-routes)
    - [Contact Management Routes](#contact-management-routes)
    - [Details Management Routes](#details-management-routes)
  - [Technologies Used](#technologies-used)
  - [Notes](#notes)

---

## Installation

1. Clone the repository:
```bash
  git clone <repository-url>
  npm install
  npx prisma migrate dev
  npm run start
```

---
## Environment Variables
The following environment variables are required:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `DATABASE_URL`
- `SECRET_KEY`
- `PORT`
- `AWS_BUCKET_NAME`

---
## Features
- Authentication: User registration, login, and password reset.
- Role Management: Assign admin or user roles.
- User Management: User profile management, including profile creation and update.
- File Management: Upload and manage files on AWS S3.
- Service Management: Service creation, update, and deletion.
- Contact Management: Contact creation, update, and deletion.
  - Details Management: Details creation, update, and deletion.

---
## Routes
### Authentication Routes
| Method | Path | Description |
| --- | --- | --- |
| POST | /auth/login | Log in with email and password. |
| POST | /login | Register a new user. |
| GET | /auth/register | Retrieve the currently logged-in user. |
| POST | /auth/logout | Log out the current user. |
### User Management Routes
| Method | Path | Description |
| --- | --- | --- |
| PATCH | /users/make-admin | Assign admin role to a user. |
| PATCH | /users/make-user | Revoke admin role from a user. |
| POST | /users | Create a new user |
| PATCH | /users/update | Update an existing user's details. |
### Service Management Routes
| Method | Path | Description |
| --- | --- | --- |
| POST | /services | Create a new service |
| PATCH | /services/:id | Update a service |
| GET | /services | Retrieve all services (with pagination). |
| DELETE | /services/:id | Delete a service |
### Contact Management Routes
| Method | Path | Description |
| --- | --- | --- |
| POST | /contacts | Create a new contact |
| PATCH | /contacts/:id | Update a contact |
| GET | /contacts | Retrieve all contacts. |
| DELETE | /contacts/:id | Delete a contact |
### Details Management Routes
| Method | Path | Description |
| --- | --- | --- |
| POST | /details | Create a new detail |
| PATCH | /details/:id | Update a detail |
| GET | /details | Retrieve all details. |
| DELETE | /details/:id | Delete a detail |

---
## Technologies Used
* NestJS: Backend framework for building scalable applications.
* Prisma: ORM for database management.
* AWS S3: File storage.
* JWT: Authentication and authorization
* Passport.js (for authentication)
* Bcrypt (for password hashing)
* PostgreSQL/MySQL: Database (configurable via .env).

---
## Notes
* The application uses pagination for routes like /services to handle large datasets efficiently.
* For file upload functionality, ensure your AWS S3 bucket is configured correctly, and the environment variables are set.

Feel free to reach out with questions or suggestions! 😊

# Job Tracker API

A simple Job Tracker API built with Node.js, Express, MongoDB, and JWT.

This project allows users to register, log in, and manage their job applications.

## Features

* User registration
* User login
* JWT authentication
* Create job applications
* View job applications
* Update job applications
* Delete job applications
* Users can only see their own applications

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* validator
* dotenv

## Installation

Clone the repository:

```bash
git clone https://github.com/aye2-win/job-tracker-api.git
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=your_jwt_secret
```

## Run the Project

Start the development server:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

## Authentication Routes

### Register

```text
POST /api/auth/register
```

Example:

```json
{
  "name": "Aye",
  "email": "aye@gmail.com",
  "password": "123456"
}
```

### Login

```text
POST /api/auth/login
```

Example:

```json
{
  "email": "aye@gmail.com",
  "password": "123456"
}
```

After registering or logging in, you will get a JWT token.

Use the token for protected routes:

```text
Authorization: Bearer YOUR_TOKEN
```

### Get Profile

```text
GET /api/auth/profile
```

Requires authentication.

## Application Routes

All application routes require a JWT token.

### Get All Applications

```text
GET /api/applications
```

Returns the applications of the logged-in user.

### Create Application

```text
POST /api/applications
```

Example:

```json
{
  "companyName": "Google",
  "position": "Backend Developer",
  "status": "Applied",
  "notes": "Waiting for interview"
}
```

### Update Application

```text
PUT /api/applications/:id
```

Example:

```json
{
  "status": "Interview",
  "notes": "Interview scheduled"
}
```

### Delete Application

```text
DELETE /api/applications/:id
```

## Application Status

An application can have one of these statuses:

```text
Applied
Interview
Offer
Rejected
```

## Project Structure

```text
job-tracker-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── applicationController.js
│   └── authController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Application.js
│   └── User.js
│
├── router/
│   ├── applicationRoutes.js
│   └── authRoute.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint                | Authentication |
| ------ | ----------------------- | -------------- |
| GET    | `/`                     | No             |
| POST   | `/api/auth/register`    | No             |
| POST   | `/api/auth/login`       | No             |
| GET    | `/api/auth/profile`     | Yes            |
| GET    | `/api/applications`     | Yes            |
| POST   | `/api/applications`     | Yes            |
| PUT    | `/api/applications/:id` | Yes            |
| DELETE | `/api/applications/:id` | Yes            |

## How Authentication Works

1. Register a new account.
2. Log in with your email and password.
3. The server gives you a JWT token.
4. Send the token with protected requests.
5. The server checks the token.
6. The server gets your user ID from the token.
7. You can only access your own job applications.

## License

This project is for learning and practice purposes.

**Hope you enjoy this project ✨**

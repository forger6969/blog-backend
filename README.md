# Blog Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-32325D?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A **RESTful backend** for a blogging application built with **Node.js**, **Express**, **MongoDB**, **JWT**, and **bcrypt**.  
Supports user registration, login, creating posts, likes, comments, followers, and secure authentication.

---

## Features

- **User Management**
  - Register and login with email & password
  - Passwords hashed with `bcrypt`
  - JWT authentication for protected routes
  - Follow/unfollow users
  - Followers and following counts

- **Posts**
  - Create posts with description and pictures
  - Like/unlike posts
  - Comment on posts
  - Track views, likesCount, commentsCount

- **Security**
  - Passwords never returned to client (`select: false`)
  - JWT tokens for protected routes

- **Validation**
  - Input validation using **Zod**
  - Checks username, email, and password

- **File Uploads**
  - Support for post images via `/uploads`

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- Zod (validation)
- CORS

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-backend.git
cd blog-backend
Install dependencies:

bash
Copy code
npm install
Create a .env file:

env
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_token_here
Start the server:

bash
Copy code
npm run dev
Server will run on http://localhost:3000.

API Endpoints
Auth
Method	Route	Description
POST	/api/users/register	Register new user
POST	/api/users/login	Login user and get JWT

Users
Method	Route	Description
GET	/api/users/:id	Get user info (password hidden)
POST	/api/users/follow	Follow another user
POST	/api/users/unfollow	Unfollow a user

Posts
Method	Route	Description
POST	/api/posts	Create a new post
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post
POST	/api/posts/like	Like a post
POST	/api/posts/unlike	Remove like from a post

Comments
Method	Route	Description
POST	/api/comments	Add comment to a post
GET	/api/comments/:id	Get comments for a post

Project Structure
bash
Copy code
├── app.js               # Express server setup
├── routes/              # All route files
├── users/               # User model, controller, routes
├── posts/               # Post model, controller, routes
├── comments/            # Comment model, controller, routes
├── likes/               # Like handling (optional)
├── uploads/             # Uploaded images
├── auth/                # Authentication and validation
├── .env                 # Environment variables
├── .gitignore
└── package.json
Security Notes
Never commit .env file with JWT secret

Passwords are hashed using bcrypt

JWT tokens expire in 1 hour (configurable)

Protected routes require authMiddleware

Contributing
Fork the repo

Create your feature branch (git checkout -b feature/newFeature)

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature/newFeature)

Open a Pull Request
**Quora Posts — RESTful CRUD App**

A simple Quora-style posts application built while learning Node.js, Express.js, EJS, and RESTful APIs.

The project focuses on implementing CRUD operations using RESTful routing.

🚀 Features
View all posts
Create a new post
View a specific post
Edit an existing post
Update post content
Delete posts
Generate unique IDs using UUID
Use EJS for server-side rendering
Use method-override for PATCH/DELETE requests
🛠️ Tech Stack
Node.js
Express.js
EJS
UUID
method-override
HTML/CSS
📁 Project Structure
RESTful_API/
│
├── public/
│   └── CSS/
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   ├── detail.ejs
│   └── edit.ejs
│
├── index.js
├── package.json
└── package-lock.json

🔄 RESTful Routes
Method	Route	Purpose
GET	/posts	Display all posts
GET	/posts/new	Show form to create a post
POST	/posts	Create a new post
GET	/posts/:id	Display a specific post
GET	/posts/:id/edit	Show edit form
PATCH	/posts/:id	Update post content
DELETE	/posts/:id	Delete a post

**🧠 Concepts Practiced**
Express
Creating an Express server
app.listen()
Routing with app.get(), app.post(), app.patch(), and app.delete()
Request and response objects
Route parameters
Middleware
express.urlencoded()
Static files
REST


**🎯 Learning Goal**

This project was built to understand how a backend handles:

Client Request
      ↓
Express Route
      ↓
Process Data
      ↓
CRUD Operation
      ↓
EJS Response / Redirect

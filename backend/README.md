# Contacts API README

- User Registration and Login
- JWT Authentication for Secure Access
- Create, Read, Update, and Delete Contacts
- Contact Association with Users

## Technologies Used

- **Node.js**: Provides the runtime environment for executing JavaScript code server-side.
- **Express.js**: A web application framework for Node.js, facilitating the building of APIs.
- **MongoDB & Mongoose**: A NoSQL database and Object Data Modeling (ODM) library for MongoDB and Node.js, used for data management.
- **JSON Web Token (JWT)**: Utilized for securing API endpoints through token-based authentication.
- **bcrypt**: Employed for hashing passwords, enhancing security.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js: Download and install from [Node.js official website](https://nodejs.org/).
- npm: Comes bundled with Node.js installation.
- MongoDB: Download and install from [MongoDB official website](https://www.mongodb.com/try/download/community).

## Installation and Setup

Follow these steps to set up the Contacts API on your local machine:

1. **Clone the Repository**
```
git clone https://github.com/rimjhimittal/contact-details.git 
cd contact-details
```

2. **Install Dependencies**
```
npm install
```

3. **Set Up Environment Variables**

Create a `.env` file in the root directory of the project and add the following variables:
```
PORT=5040 
MONGO_URI=your_mongodb_connection_string ACCESS_TOKEN_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secret string for JWT signing.

4. **Start the Server**
```
npm run dev
```

The server will start on the port specified in the `.env` file (default is 5040).

## API Endpoints

### User Routes

- **Register a User**
  - Endpoint: `POST /api/users/register`
  - Request Body:
 ```{ "username": "exampleuser", "email": "user@example.com", "password": "password123" }```


- **Login a User**
  - Endpoint: `POST /api/users/login`
  - Request Body:
```{ "email": "user@example.com", "password": "password123" }```

- Response:
```{ "accessToken": "your_jwt_token" }```


- **Get Current User**
  - Endpoint: `GET /api/users/current`
  - Requires Authorization header with Bearer token.
  - Response:
```{ "id": "user_id", "username": "exampleuser", "email": "user@example.com" }```


### Contact Routes

All contact routes require an Authorization header with Bearer token.

- **Get All Contacts**
  - Endpoint: `GET /api/contacts`
  - Response:
```[ { "_id": "contact_id", "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890", "user_id": "user_id" } ]```


- **Create a New Contact**
  - Endpoint: `POST /api/contacts`
  - Request Body:
```{ "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890" }```

- Response:
```{ "_id": "contact_id", "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890", "user_id": "user_id" }```


- **Get a Specific Contact**
  - Endpoint: `GET /api/contacts/:id`
  - Response:
```{ "_id": "contact_id", "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890", "user_id": "user_id" }```


- **Update a Contact**
  - Endpoint: `PUT /api/contacts/:id`
  - Request Body (any fields you want to update):
```{ "name": "Jane Doe" }```

- Response:
```{ "_id": "contact_id", "name": "Jane Doe", "email": "john@example.com", "phone": "123-456-7890", "user_id": "user_id" }```


- **Delete a Contact**
  - Endpoint: `DELETE /api/contacts/:id`
  - Response:
```{ "_id": "contact_id", "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890", "user_id": "user_id" }```


## Error Handling

All errors are returned with a JSON response in the following format:

```{ "message": "Error message", "stack": "Error stack trace" // Only in development mode }```
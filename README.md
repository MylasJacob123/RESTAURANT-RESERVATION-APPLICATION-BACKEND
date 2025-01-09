**Backend Setup and Usage Documentation**

**Restaurant Management and Reservation System**

This project is a Restaurant Management and Reservation System built with Node.js, Express.js, and MongoDB. It provides RESTful APIs for user authentication, restaurant management, and reservation handling. It uses JWT (JSON Web Token) for authentication and express-validator for input validation.

**Features**

-- User Authentication: Register, login, reset password, and update user profiles.
-- Restaurant Management: Add, update, and delete restaurant details (admin role required).
-- Reservation Management: Make, update, and delete reservations.
-- Role-Based Access Control: Ensures only authorized users can manage restaurants and reservations.

**Prerequisites**
To set up and run this backend server, ensure you have the following installed:

Node.js 
MongoDB
Postman or any API client (For testing the APIs)

**Installation**

1. Clone the repository:

git clone https://github.com/MylasJacob123/RESTAURANT-RESERVATION-APPLICATION-BACKEND.git
cd RESTAURANT-RESERVATION-APPLICATION-BACKEND

2. Install dependencies:
npm install

3. Setup Environment Variables:

MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
PORT=port-where-the-server-will-run 
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=your-email-port
EMAIL_USER=your-email-address
EMAIL_PASS=given-email-security-password


**API Documentation**

1. **User Authentication Endpoints**

---- **POST /auth/register**: Register a new user.
---- **POST /auth/login**: Log in an existing user and get a JWT token.
---- **POST /auth/forgot-password**: Send a password reset email.
---- **POST /auth/reset-password**: Reset the user password using a token.
---- **PUT /auth/update-user**: Update the user profile (requires JWT token).
---- **DELETE /auth/delete-user**: Delete the authenticated user account.


2. **Restaurant Management Endpoints**

---- **GET /api/get-restaurant**s: Retrieve a list of all restaurants.
---- **POST /api/add-restaurant**: Add a new restaurant (requires admin role).
---- **PUT /api/update-restaurant/:id**: Update restaurant details (requires admin role).
---- **DELETE /api/delete-restaurant/:id**: Delete a restaurant (requires admin role).


3. **Reservation Management Endpoints**

---- **GET /api/get-reservations**: Retrieve all reservations.
---- **POST /api/add-reservation**: Create a new reservation (requires authentication).
---- **PUT /api/update-reservation/:id**: Update an existing reservation (requires authentication).
---- **DELETE /api/delete-reservation/:id**: Delete a reservation (requires authentication).


**Error Handling**

API responses include meaningful error messages for debugging. Example:

{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}

Testing the APIs
Use Postman to test the endpoints.For authenticated endpoints, include the JWT token in the Authorization header:

Authorization: Bearer <jwt_token>

restaurant-reservation-system/
├──config/              # Contains mongoDB connection logic
├── controllers/        # Contains route logic
├── middleware/         # Middleware for authentication and validation
├── models/             # MongoDB schemas and models
├── routes/             # API routes
├── utils/              # Utility functions
├── .env                # Environment variables
├── server.js           # Entry point for the server
└── package.json   


**Contributors**

Jacob Mylas (GitHub)
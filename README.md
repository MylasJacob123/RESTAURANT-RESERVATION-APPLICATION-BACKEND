**Backend Setup and Usage Documentation**

**Restaurant Management and Reservation System**

This project is a Restaurant Management and Reservation System built with Node.js, Express.js, and MongoDB. It provides RESTful APIs for user authentication, restaurant management, and reservation handling. It uses JWT (JSON Web Token) for authentication and express-validator for input validation. It also integrates PayPal for handling payments.

**Features**

-- User Authentication: Register, login, reset password, and update user profiles.
-- Restaurant Management: Add, update, and delete restaurant details (admin role required).
-- Reservation Management: Make, update, and delete reservations.
-- Payment Integration: Process payments using PayPal.
-- Role-Based Access Control: Ensures only authorized users can manage restaurants and reservations.
-- Review System: Users can add and view reviews for restaurants.
-- File Uploads (Multer): Handle image uploads for restaurants.

**Prerequisites**
To set up and run this backend server, ensure you have the following installed:

Node.js 
MongoDB
Postman or any API client (For testing the APIs)
PayPal Developer Account (For integration)
Multer for handling file uploads (for restaurant images or user profile pictures)

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
PAYPAL_MODE=sandbox_or_live
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret


**API Documentation**

1. **User Authentication Endpoints**

---- **POST /auth/register**: Register a new user.
---- **POST /auth/login**: Log in an existing user and get a JWT token.
---- **POST /auth/forgot-password**: Send a password reset email.
---- **POST /auth/reset-password**: Reset the user password using a token.
---- **PUT /auth/update-user**: Update the user profile (requires JWT token).
---- **DELETE /auth/delete-user**: Delete the authenticated user account.


2. **Restaurant Management Endpoints**

---- **GET /api/get-restaurants**: Retrieve a list of all restaurants.
---- **GET /get-restaurants/admin/:adminId**: Retrieve a list of restaurants associated with a specific admin.
---- **GET /get-restaurants/:id**: Retrieve a restaurant associated with a specific Id.
---- **POST /api/add-restaurant**: Add a new restaurant (requires admin role).
---- **PUT /api/update-restaurant/:id**: Update restaurant details (requires admin role).
---- **GET /get-restaurants/:restaurantId/slots/:date**: Checks the available slots for a specific restaurant on a specific date.
---- **DELETE /api/delete-restaurant/:id**: Delete a restaurant (requires admin role).


3. **Reservation Management Endpoints**

---- **GET /api/get-reservations**: Retrieve all reservations.
---- **POST /api/add-reservation**: Create a new reservation (requires authentication).
---- **PUT /api/update-reservation/:id**: Update an existing reservation (requires authentication).
---- **DELETE /api/delete-reservation/:id**: Delete a reservation (requires authentication).


4. **Payment Integration**

---- **POST /api/create-payment**: Creates a payment request with PayPal.
---- **POST /api/capture-payment/:orderId**: Captures the payment once the user approves the payment.


4. **Review Endpoints**

---- **GET /api/get-reviews/:restaurantId**: Retrieve all reviews for a specific restaurant.
---- **POST /api/add-review**: Add a review for a restaurant (requires authentication).

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

restaurant-reservation-application-backend/
├──config/              # Contains mongoDB and PayPal connection logic
├── controllers/        # Contains route logic
├── middleware/         # Middleware for authentication and validation
├── models/             # MongoDB schemas and models
├── routes/             # API routes
├── .env                # Environment variables
├── server.js           # Entry point for the server
└── package.json   


**Contributors**

Jacob Mylas (GitHub)


This README provides a full breakdown of the project structure, installation instructions, API documentation, and details about integrating PayPal into the system. 
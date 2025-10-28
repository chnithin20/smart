# Backend Plan for Smart Parking Dashboard

## Overview
This plan outlines the setup of a backend service for the Smart Parking Dashboard using Express.js as the web framework and MySQL as the database. The backend will handle API endpoints for parking management, user authentication, bookings, payments, and more, integrating with the existing React frontend.

## Folder Structure
```
backend/
├── config/
│   ├── database.js          # MySQL connection configuration
│   └── config.js            # General app configuration (e.g., JWT secrets, ports)
├── controllers/
│   ├── authController.js    # Handles user authentication (login, register)
│   ├── parkingController.js # Manages parking slots, levels, and availability
│   ├── bookingController.js # Handles booking creation, updates, and cancellations
│   ├── paymentController.js # Processes payments and integrations
│   └── adminController.js   # Admin-specific operations (reports, analytics)
├── models/
│   ├── User.js              # User model (authentication, profiles)
│   ├── ParkingSlot.js       # Parking slot model
│   ├── ParkingLevel.js      # Parking level model
│   ├── Booking.js           # Booking model
│   ├── Payment.js           # Payment model
│   └── index.js             # Database associations and sync
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── parking.js           # Parking-related routes
│   ├── booking.js           # Booking routes
│   ├── payment.js           # Payment routes
│   └── admin.js             # Admin routes
├── middleware/
│   ├── authMiddleware.js    # JWT authentication middleware
│   ├── validationMiddleware.js # Input validation
│   └── errorHandler.js      # Global error handling
├── utils/
│   ├── helpers.js           # Utility functions (e.g., date formatting)
│   └── emailService.js      # Email notifications (integrate with existing email server)
├── tests/
│   ├── auth.test.js         # Unit tests for auth
│   ├── parking.test.js      # Tests for parking logic
│   └── integration.test.js  # End-to-end tests
├── app.js                   # Main Express app setup
├── server.js                # Server startup script
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables (DB credentials, JWT secret)
├── .gitignore               # Ignore node_modules, .env, etc.
└── README.md                # Backend documentation
```

## Technology Stack
- **Framework**: Express.js
- **Database**: MySQL (with mysql2 driver or Sequelize ORM for easier management)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi or express-validator
- **Testing**: Jest and Supertest
- **Other**: CORS, Helmet for security, Morgan for logging

## Setup Commands
Run these commands in the `backend/` directory (create it first if needed).

1. **Initialize the project**:
   ```
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install dependencies**:
   ```
   npm install express mysql2 sequelize bcryptjs jsonwebtoken joi helmet morgan cors dotenv
   ```

3. **Install dev dependencies**:
   ```
   npm install --save-dev nodemon jest supertest
   ```

4. **Set up MySQL database**:
   - Install MySQL if not already installed (e.g., via XAMPP or MySQL Installer).
   - Create a database: `CREATE DATABASE smart_parking_db;`
   - Update `.env` file with DB credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=smart_parking_db
     JWT_SECRET=yourjwtsecret
     PORT=5000
     ```

5. **Run the server**:
   - Development: `npm run dev` (uses nodemon)
   - Production: `npm start`

6. **Run tests**:
   ```
   npm test
   ```

## Implementation Steps
1. Set up Express app and basic routes.
2. Configure MySQL connection and define models.
3. Implement authentication (register, login, JWT).
4. Add parking management endpoints.
5. Integrate booking and payment logic.
6. Add middleware for security and validation.
7. Write tests and documentation.
8. Deploy (e.g., to Heroku or AWS with MySQL RDS).

## Integration with Existing Project
- The backend will run on port 5000 (configurable).
- Update the React frontend's API calls to point to `http://localhost:5000/api/...`.
- Reuse the existing email server in `server/` for notifications by importing `emailService.js`.

## Notes
- Ensure CORS is configured to allow requests from the React app (e.g., `http://localhost:3000`).
- Use environment variables for sensitive data.
- Follow RESTful API conventions.
- Add rate limiting and input sanitization for security.

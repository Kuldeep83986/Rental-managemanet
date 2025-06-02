# Rental Management System Backend

## Introduction
This project is a backend system for managing rental properties, designed for landlords and property managers. It provides APIs to handle tenant applications, rent payments, lease agreements, maintenance requests, and user management with role-based access control.

## Project Type
Backend

## Directory Structure
rental-management-backend/  
├─ controllers/  
├─ middleware/  
├─ models/  
├─ routes/  
├─ config/  
├─ server.js  
├─ package.json  

## Video Walkthrough of the project
Attach a very short video walkthrough of all of the features [1 - 3 minutes]

## Video Walkthrough of the codebase
Attach a very short video walkthrough of the codebase [1 - 5 minutes]

## Features
- Tenant Application Management with document uploads and background check integration (stubbed)
- Rent Payment Processing with payment gateway integration (stubbed), automated reminders, and transaction history
- Lease Management including creation, renewal, and expiry notifications
- Maintenance Request System with request submission, photo uploads, and service provider management
- Role-Based Access Control (RBAC) for secure user permissions
- JWT-based authentication and authorization

## Design Decisions or Assumptions
- Node.js, Express, and MongoDB chosen for backend scalability and flexibility
- Modular architecture separating controllers, routes, models, and middleware
- Stubbed third-party integrations for payment and background checks
- JWT authentication with role-based access control for security

## Installation & Getting Started

```bash
cd rental-management-backend
npm install
npm run dev
```

Ensure MongoDB is running locally or update the connection string in `.env`.

## Usage
- Use API endpoints to register and authenticate users
- Submit tenant applications with document uploads
- Process rent payments and view transaction history
- Manage leases and receive expiry notifications
- Submit and manage maintenance requests

## Credentials
Provide default user credentials here if applicable (e.g., admin user)

## APIs Used
- Internal REST APIs for authentication, tenant applications, payments, leases, maintenance, and user management
- Stubbed external APIs for payment gateway and background checks

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive JWT token

### Tenant Applications
- POST /api/tenant-applications - Submit a new tenant application
- GET /api/tenant-applications - List tenant applications (role-based access)

### Payments
- POST /api/payments - Process a rent payment
- GET /api/payments - Retrieve payment history

### Leases
- POST /api/leases - Create or renew a lease
- GET /api/leases - List leases

### Maintenance
- POST /api/maintenance - Submit a maintenance request
- GET /api/maintenance - List maintenance requests

### Users
- GET /api/users - List users (restricted by role)
- GET /api/users/:id - Get user details

## Technology Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Stripe (stubbed) for payment processing
- Nodemailer (stubbed) for email notifications

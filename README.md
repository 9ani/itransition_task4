# User Management System

A web application with user registration, authentication, user management, and administrative actions. This system supports functionalities like blocking, unblocking, and deleting users, as well as session management.

## Table of Contents
1. [User Registration](#user-registration)
2. [User Login](#user-login)
3. [User Management (Admin Panel)](#user-management-admin-panel)
4. [Blocking and Unblocking Users](#blocking-and-unblocking-users)
5. [Session Management](#session-management)
6. [Deployment and Installation](#deployment-and-installation)

## User Registration
- Users can register with a unique email and a non-empty password.
- Store user data securely in a database, ensuring passwords are hashed using bcrypt.
- Ensure email uniqueness to prevent conflicts.

## User Login
- Implement a login page for users to log in with their email and password.
- Authenticate users by comparing hashed passwords with bcrypt.
- Redirect authenticated users to appropriate pages based on their roles or status.

## User Management (Admin Panel)
- Only authenticated users can access the admin panel.
- The admin panel contains a user management table with the following information:
  - User ID
  - Name
  - Email
  - Last login time
  - Registration time
  - Status (active or blocked)
- The table allows for multiple selections through checkboxes, with a toolbar to block, unblock, or delete users.

## Blocking and Unblocking Users
- Authenticated users can block or unblock other users.
- Blocking a user should prevent them from logging in.
- If a user blocks themselves, end their session and redirect them to the login page.
- Implement logic to ensure blocked users are redirected to the login page.

## Session Management
- Use session-based authentication to maintain user login state.
- If a user's account is blocked or deleted, any subsequent requests should redirect to the login page.
- Ensure session security and proper logout handling.

## Deployment and Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/9ani/itransition_task4.git
   cd itransition_task4

2. **Install Dependencies:
   ```bash
   npm install

3. **Run the Application:
   ```bash
   npm start

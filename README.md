# Chat API

## Overview

This project is a backend application for a chat service, developed using the NestJS framework. It features an event-driven architecture with Redis as the broker. The chat functionality is built on WebSockets and REST API, providing real-time communication capabilities along with traditional HTTP-based interactions.

## Features

### Chat Functionality
- **Real-Time Communication**: Built using WebSockets for real-time chat capabilities.
- **REST API**: Provides RESTful endpoints for chat operations.
- **Message Management**: Create, read, update, and delete messages.
- **Polling**: Supports polling for message delivery and updates.

### Authentication and Authorization
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Email Token Authentication**: Option for users to receive authentication tokens via email.
- **Role-Based Access Control**: Different permissions for users, including roles like chat owner and chat member.
- **Custom Guards and Decorators**: Guards to protect routes and decorators for managing user permissions within chats.

### User Management
- **User Registration and Login**: Users can register and log in to the system.
- **User Profiles**: Manage user profiles and update user information.

### Group Management
- **Create and Manage Groups**: Users can create groups and add members.
- **Permissions Management**: Configure different permissions for group members.

### Email Notifications
- **Email Sending**: Send email notifications for various events and actions.

## Technologies Used

### Backend Framework
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.

### Programming Language
- **TypeScript**: A statically typed superset of JavaScript that enhances code quality and maintainability.

### Database
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution to model application data.

### Authentication
- **PassportJS**: Middleware for handling authentication.
- **JWT**: JSON Web Tokens for secure authentication.

### Real-Time Communication
- **WebSockets**: For real-time communication.
- **Redis**: Used as a broker for event-driven architecture.

### Email
- **Nodemailer**: A module for sending emails from Node.js applications.

### Testing
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.

### Other Tools
- **ESLint**: A tool for identifying and reporting on patterns in JavaScript/TypeScript.
- **Prettier**: An opinionated code formatter.
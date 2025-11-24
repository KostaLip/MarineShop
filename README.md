# MarineShop

A full-stack e-commerce platform for marine and nautical equipment, featuring separate user and admin interfaces with comprehensive product management capabilities.

## Technologies Used

### Frontend
- **Angular** - Modern TypeScript-based framework for building the SPA
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming for handling asynchronous operations

### Backend
- **Spring Boot** - Java-based REST API
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Relational database

### Third-Party Services
- **Stripe** - Payment processing integration
- **Cloudinary** - Cloud-based image storage and management

## Features

### User Features
- **Authentication & Authorization**
  - User registration and login system
  - JWT-based session management
  - Role-based access control (User/Admin)

- **Product Browsing**
  - Browse products by categories
  - View detailed product information
  - Read product reviews and ratings
  - Comment on products

- **Shopping Experience**
  - Add products to shopping cart
  - Manage cart items
  - Secure checkout with Stripe payment integration

- **Profile Management**
  - Edit user profile information
  - View order history

### Admin Features
- **Admin Dashboard**
  - Dedicated admin panel (admins cannot access the shop)
  - Full CRUD operations on:
    - Products
    - Categories
    - Users
    - Orders
  - Image management via Cloudinary integration

## Architecture

### Database Design
- **SQL Database (PostgreSQL)** for structured data
- **Cloudinary** for image storage
  - Database stores Cloudinary URLs as references
  - Efficient image delivery through CDN

### Security
- Role-based access control separating admin and user functionalities
- Protected routes requiring authentication
- Secure payment processing through Stripe

## Getting Started

### Prerequisites
- Node.js and npm
- Java JDK 11+
- PostgreSQL
- Stripe account (for payment processing)
- Cloudinary account (for image hosting)

### Backend Setup

### Frontend Setup

## User Roles

| Role | Access | Capabilities |
|------|--------|-------------|
| **User** | Shop only | Browse products, manage cart, checkout, edit profile |
| **Admin** | Admin panel only | CRUD operations on all resources, no shop access |

## Payment Integration

The application uses **Stripe** for secure payment processing:
- Test mode for development
- Production-ready integration
- Secure checkout flow

## Image Management

Images are managed through **Cloudinary**:
- Automatic image optimization
- Fast CDN delivery
- URL references stored in MySQL database

## Key Learning Points

- Built a complete full-stack application with modern frameworks
- Implemented role-based authentication and authorization
- Integrated third-party payment processing (Stripe)
- Managed cloud-based image storage (Cloudinary)
- Developed separate user and admin interfaces
- Created RESTful API with Spring Boot
- Worked with Angular and reactive programming (RxJS)

## Future Enhancements

- Order tracking functionality
- Email notifications for orders
- Advanced search and filtering
- Wishlist feature
- Product recommendations
- Inventory management system

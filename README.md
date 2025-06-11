# E-commerce App

A modern full-stack e-commerce application with a clean, responsive UI and robust backend services.
Link to my website: https://e-commerce-website-ebon-ten.vercel.app/

## 📋 Overview

This application provides a complete e-commerce solution with product browsing, search functionality, user authentication, shopping cart management, and secure checkout using Stripe.

## 🛠️ Tech Stack

### Frontend (Client)

- **Framework**: [Next.js](https://nextjs.org/) (v15.3.1)
- **UI Library**: [React](https://reactjs.org/) (v19.0.0)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4.1.5)
  <!-- - **State Management**: [Zustand](https://github.com/pmndrs/zustand) -->
  <!-- - **State Management**: [Context Hook] -->
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **UI Components**:
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Lucide React](https://lucide.dev/) icons
  - [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment**: [Vercel]

### Backend (Server)

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/) (v5.1.0)
- **Authentication**:
  - [JSON Web Tokens](https://jwt.io/) (JWT)
  - [Passport.js](http://www.passportjs.org/)
  - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/) for password hashing
- **API Validation**: [Zod](https://github.com/colinhacks/zod)
- **Email Services**: is not implemented yet
- **Payment Processing**: is not implemented yet

## ✨ Features

- **User Authentication & Authorization**

  - Sign up, login, password reset
  - JWT-based authentication
  - Role-based access control

- **Product Management**
<!--
  - Browse products by categories
  - Advanced search and filtering
  - Product details with images, descriptions, and reviews -->

- **Shopping Experience**
<!--
  - Add to cart functionality
  - Wishlist management
  - Responsive product viewing -->
- **Checkout Process**
<!--
  - Secure payment processing with Stripe
  - Order history and tracking
  - Email notifications -->

<!-- - **Internationalization**
  - Multi-language support with next-intl -->

## 🚀 Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/e-commerce-app.git
   cd e-commerce-app
   ```

2. Install frontend dependencies

   ```
   cd client
   npm install
   ```

3. Install backend dependencies

   ```
   cd ../server
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   <!-- ```
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ``` -->

### Running the Application

1. Start the backend server

   ```
   cd server
   npm run dev
   ```

2. Start the frontend development server

   ```
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

# E-commerce Client Application

## Folder Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication routes (login, register, etc.)
│   ├── (home)/            # Public routes
│   ├── (protected)/       # Protected routes requiring authentication
│   ├── admin/             # Admin-only routes
│   ├── products/          # Product-related routes
│   └── layout.js          # Root layout
│
├── components/            # React components
│   ├── auth/             # Authentication related components
│   ├── common/           # Shared components (buttons, inputs, etc.)
│   ├── layouts/          # Layout components
│   └── ui/               # UI components (cards, modals, etc.)
│
├── hooks/                # Custom React hooks
│   ├── useAuth.js       # Authentication hook
│   ├── useCart.js       # Shopping cart hook
│   └── useProducts.js   # Products hook
│
├── lib/                  # Utility libraries
│   ├── constants.ts     # Constants and configuration
│   └── utils.ts         # Helper functions
│
├── services/            # API services
│   ├── api.ts          # Base API configuration
│   ├── auth.ts         # Authentication service
│   └── products.ts     # Products service
│
├── store/              # State management
│   ├── cart.store.ts   # Cart state
│   └── user.store.ts   # User state
│
├── styles/             # Global styles
│   └── globals.css     # Global CSS
│
└── types/              # TypeScript type definitions
    ├── auth.ts         # Auth-related types
    └── product.ts      # Product-related types
```

## Key Features

- **App Router Structure**: Uses Next.js 13+ App Router with organized route groups
- **Component Organization**: Modular component structure with clear separation of concerns
- **Type Safety**: Full TypeScript support
- **State Management**: Centralized state management
- **API Integration**: Organized API services
- **Authentication**: Protected routes and auth components

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

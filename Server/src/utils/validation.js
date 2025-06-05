import { z } from "zod";

const MongoId = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId");
  
const Price = (field) =>
  z.coerce
    .number()
    .refine(
      (val) => /^\d+(\.\d{2})?$/.test(val.toFixed(2)),
      `${field} must have exactly two decimal places (e.g., 49.99)`
    );
// User
const Email = z.string().email("Invalid email address");
const Password = z.string().min(6, "Password must be at least 6 characters");
const Username = z.string().min(5, "Username must be at least 5 characters");

export const userSigninSchema = z.object({
  email: Email,
  password: Password,
});

export const userSignupSchema = z
  .object({
    username: Username,
    email: Email,
    password: Password.regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userSchema = z.object({
  username: Username,
  email: Email,
});

export const UserInputSchema = z.object({
  name: Username,
  email: Email,
  image: z.string().optional(),
  emailVerified: z.boolean(),
  role: z.string().min(1, "Role is required"),
  password: Password,
  paymentMethod: z.string().min(1, "Payment method is required"),
  address: z.object({
    fullName: z.string().min(1, "Full name is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().min(1, "Phone number is required"),
  }),
});

//REVIEW
// export const ReviewInputSchema = z.object({
//   product: MongoId,
//   user: MongoId,
//   isVerifiedPurchase: z.boolean(),
//   title: z.string().min(1, "Title is required"),
//   comment: z.string().min(1, "Comment is required"),
//   rating: z.coerce.number().int().min(1).max(5),
// });

//PRODUCT
export const ProductInputSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  category: z.string().min(1),
  images: z.array(z.string()).min(1),
  price: Price("Price"),
  description: z.string().min(1),
  isPublished: z.boolean(),
  // listPrice: Price("List price"),
  numSales: z.coerce.number().int().nonnegative(),
  countInStock: z.coerce.number().int().nonnegative(),
  tags: z.array(z.string()).default([]), // optional for filtering
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce.number().min(0).max(5), // optional for filtering and sorting
  numReviews: z.coerce.number().int().nonnegative(),
  ratingDistribution: z
    .array(z.object({ rating: z.number(), count: z.number() }))
    .max(5), // store how many reviews for each rating (1-5)
  reviews: z.array(ReviewInputSchema).default([]),
});

export const ProductUpdateSchema = ProductInputSchema.extend({
  _id: MongoId,
});

//ORDER
// const OrderItemSchema = z.object({
//   clientId: z.string().min(1),
//   product: z.string().min(1),
//   name: z.string().min(1),
//   slug: z.string().min(1),
//   category: z.string().min(1),
//   quantity: z.number().int().nonnegative(),
//   countInStock: z.number().int().nonnegative(),
//   image: z.string().min(1),
//   price: Price("Price"),
//   size: z.string().optional(),
//   color: z.string().optional(),
// });

// const ShippingAddressSchema = z.object({
//   fullName: z.string().min(1),
//   street: z.string().min(1),
//   city: z.string().min(1),
//   postalCode: z.string().min(1),
//   province: z.string().min(1),
//   phone: z.string().min(1),
//   country: z.string().min(1),
// });

// export const OrderInputSchema = z.object({
//   user: z.union([
//     MongoId,
//     z.object({
//       name: z.string(),
//       email: Email,
//     }),
//   ]),
//   items: z.array(OrderItemSchema).min(1),
//   shippingAddress: ShippingAddressSchema,
//   paymentMethod: z.string().min(1),
//   paymentResult: z
//     .object({
//       id: z.string(),
//       status: z.string(),
//       email_address: Email,
//       pricePaid: z.string(),
//     })
//     .optional(),
//   itemsPrice: Price("Items price"),
//   shippingPrice: Price("Shipping price"),
//   taxPrice: Price("Tax price"),
//   totalPrice: Price("Total price"),
//   expectedDeliveryDate: z
//     .date()
//     .refine(
//       (val) => val > new Date(),
//       "Expected delivery date must be in the future"
//     ),
//   isDelivered: z.boolean().default(false),
//   deliveredAt: z.date().optional(),
//   isPaid: z.boolean().default(false),
//   paidAt: z.date().optional(),
// });

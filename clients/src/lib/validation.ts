import { z } from "zod";

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



const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (val) => /^\d+(\.\d{2})?$/.test(val.toFixed(2)),
      `${field} must have exactly two decimal places (e.g., 49.99)`
    );

const MongoId = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId");
// Product
export const ProductInputSchema = z.object({
  id:MongoId,
  name: z.string().min(3),
  slug: z.string().min(3),
  category: z.string().min(1),
  image: z.string().url({ message: "Image must be a valid URL" }),
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
  // reviews: z.array(ReviewInputSchema).default([]),
});

export const ProductUpdateSchema = ProductInputSchema.extend({
  _id: MongoId,
});

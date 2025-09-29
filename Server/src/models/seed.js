import mongoose from "mongoose";
import env from "../config/env.js";
import Product from "./product.model.js";
import User from "./user.model.js";
import Review from "./review.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from root directory
dotenv.config({ path: path.join(__dirname, "../../.env") });

// import { products } from "../../data/product.js";

// const seedProducts = async () => {
//   try {
//     await mongoose.connect(env.MONGODB_URI, {
//       useUnifiedTopology: true,
//     });

//     await Product.insertMany(products);

//     console.log("Products seeded successfully!");
//   } catch (error) {
//     console.error("Error seeding products:", error);
//   } finally {
//     await mongoose.disconnect();
//   }
// };
// seedProducts()
//   .then(() => console.log("Seeding completed."))
//   .catch((error) => console.error("Seeding failed:", error));

const seedReviews = async () => {
  const sampleComments = [
    "Amazing quality, highly recommended!",
    "Good product but packaging was damaged.",
    "Exactly what I needed, great value for money.",
    "Not bad, but could be better.",
    "Delivery took too long.",
    "Superb build quality, feels premium!",
    "The product didn’t match the description.",
    "Perfect size and works as expected.",
    "This is my second purchase, love it!",
    "It broke after a week, disappointed.",
    "Stylish and durable, good deal.",
    "Love the design, looks very modern.",
    "The color was slightly different than shown.",
    "Comfortable and easy to use.",
    "Average product, nothing special.",
    "The item arrived late but works fine.",
    "Worth every penny, great quality.",
    "Lightweight and easy to handle.",
    "Didn’t meet my expectations.",
    "Fantastic! I will recommend to friends.",
  ];

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  try {
    await mongoose.connect(env.MONGODB_URI);
    const users = await User.find({});
    const products = await Product.find({});

    if (users.length < 5 || products.length < 29) {
      console.log("⚠️ You need at least 5 users and 29 products in DB.");
      process.exit();
    }

    // generate ~40 reviews
    const reviews = Array.from({ length: 40 }, () => {
      return {
        userId: randomItem(users)._id,
        productId: randomItem(products)._id,
        isVerifiedPurchase: Math.random() < 0.7, // 70% chance true
        comment: randomItem(sampleComments),
        rating: Math.floor(Math.random() * 5) + 1, // 1–5
      };
    });

    await Review.deleteMany();
    await Review.insertMany(reviews);
    const review1 = await Review.find({});
    console.log(review1);
    console.log("✅ 40 Reviews seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding reviews:", err);
    process.exit(1);
  }
};

seedReviews();

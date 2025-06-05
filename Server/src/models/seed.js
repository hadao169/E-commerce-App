import mongoose from "mongoose";
import env from "../config/env.js";
import Product from "./product.model.js";
import { products } from "../../data.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.disconnect();
  }
};
// seedProducts()
//   .then(() => console.log("Seeding completed."))
//   .catch((error) => console.error("Seeding failed:", error));

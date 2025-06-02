import mongoose from "mongoose";
import env from "../config/env.js";
import Product from "./product.model.js";

const seedProducts = async () => {
	try {
		await mongoose.connect(env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Seeding products...");

		const products = [
			{
				name: "T-Shirt",
				slug: "t-shirt",
				category: "Clothing",
				image: "/images/t-shirt.jpg",
				price: 19.99,
				description: "A comfortable cotton t-shirt.",
				countInStock: 100,
				sizes: ["S", "M", "L", "XL"],
				colors: ["red", "blue", "green"],
				isPublished: true,
			},
			{
				name: "Jeans",
				slug: "jeans",
				category: "Clothing",
				image: "/images/jeans.jpg",
				price: 39.99,
				description: "Stylish denim jeans.",
				countInStock: 50,
				sizes: ["S", "M", "L"],
				colors: ["blue", "black"],
				isPublished: true,
			},
			// Add more products as needed
		];

		await Product.insertMany(products);
		console.log("✅ Products seeded successfully!");
	} catch (error) {
		console.error("❌ Error seeding products:", error);
	} finally {
		await mongoose.disconnect();
	}
}
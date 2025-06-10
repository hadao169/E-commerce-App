import mongoose from "mongoose";
import env from "../config/env.js";
import Product from "./product.model.js";
import { products } from "../../data.js";

const product = [
  {
    name: "Green Crystal Earring",
    slug: "green-crystal-earring",
    category: "women-jewellery",
    image:
      "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp",
    price: 29.99,
    description:
      "The Green Crystal Earring is a dazzling accessory that features a vibrant green crystal. With a classic design, it adds a touch of elegance to your ensemble, perfect for formal or special occasions.",
    countInStock: 54,
    tags: ["fashion accessories", "earrings"],
    sizes: [],
    colors: [],
    isPublished: true,
    avgRating: 3.96,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 2,
      5: 1,
    },
    reviews: [],
  },
  {
    name: "Green Oval Earring",
    slug: "green-oval-earring",
    category: "women-jewellery",
    image:
      "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/thumbnail.webp",
    price: 24.99,
    description:
      "The Green Oval Earring is a stylish and versatile accessory with a unique oval shape. Whether for casual or dressy occasions, its green hue and contemporary design make it a standout piece.",
    countInStock: 73,
    tags: ["fashion accessories", "earrings"],
    sizes: [],
    colors: [],
    isPublished: true,
    avgRating: 3.57,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 1,
    },
    reviews: [],
  },
  {
    name: "Tropical Earring",
    slug: "tropical-earring",
    category: "women-jewellery",
    image:
      "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/thumbnail.webp",
    price: 19.99,
    description:
      "The Tropical Earring is a fun and playful accessory inspired by tropical elements. Featuring vibrant colors and a lively design, it's perfect for adding a touch of summer to your look.",
    countInStock: 1,
    tags: ["fashion accessories", "earrings"],
    sizes: [],
    colors: [],
    isPublished: true,
    avgRating: 4.4,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 1,
      2: 0,
      3: 0,
      4: 1,
      5: 1,
    },
    reviews: [],
  },
  {
    name: "Annibale Colombo Bed",
    slug: "annibale-colombo-bed",
    category: "furniture",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
    price: 1899.99,
    description:
      "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    countInStock: 88,
    tags: ["furniture", "beds"],
    sizes: [],
    colors: [],
    isPublished: false,
    avgRating: 2.33,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 1,
      2: 1,
      3: 0,
      4: 1,
      5: 0,
    },
    reviews: [],
  },
  {
    name: "Annibale Colombo Sofa",
    slug: "annibale-colombo-sofa",
    category: "furniture",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
    price: 2499.99,
    description:
      "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    countInStock: 60,
    tags: ["furniture", "sofas"],
    sizes: [],
    colors: [],
    isPublished: false,
    avgRating: 3.0,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 1,
      2: 0,
      3: 1,
      4: 0,
      5: 1,
    },
    reviews: [],
  },
  {
    name: "Bedside Table African Cherry",
    slug: "bedside-table-african-cherry",
    category: "furniture",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
    price: 299.99,
    description:
      "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    countInStock: 64,
    tags: ["furniture", "bedside tables"],
    sizes: [],
    colors: [],
    isPublished: false,
    avgRating: 4.0,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 3,
      5: 0,
    },
    reviews: [],
  },
  {
    name: "Knoll Saarinen Executive Conference Chair",
    slug: "knoll-saarinen-executive-conference-chair",
    category: "furniture",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
    price: 499.99,
    description:
      "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    countInStock: 26,
    tags: ["furniture", "office chairs"],
    sizes: [],
    colors: [],
    isPublished: false,
    avgRating: 3.0,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 0,
      2: 2,
      3: 0,
      4: 0,
      5: 1,
    },
    reviews: [],
  },
  {
    name: "Wooden Bathroom Sink With Mirror",
    slug: "wooden-bathroom-sink-with-mirror",
    category: "furniture",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
    price: 799.99,
    description:
      "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    countInStock: 7,
    tags: ["furniture", "bathroom"],
    sizes: [],
    colors: [],
    isPublished: false,
    avgRating: 4.0,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 1,
    },
    reviews: [],
  },
  {
    name: "Brown Leather Belt Watch",
    slug: "brown-leather-belt-watch",
    category: "mens-watches",
    image:
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
    price: 89.99,
    description:
      "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
    countInStock: 32,
    tags: ["watches", "leather watches"],
    sizes: [],
    colors: [],
    isPublished: false,
    avgRating: 4.19,
    numReviews: 3,
    numSales: 0,
    rateDistribution: {
      1: 1,
      2: 0,
      3: 0,
      4: 2,
      5: 0,
    },
    reviews: [],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.insertMany(product);
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.disconnect();
  }
// };
// seedProducts()
//   .then(() => console.log("Seeding completed."))
//   .catch((error) => console.error("Seeding failed:", error));

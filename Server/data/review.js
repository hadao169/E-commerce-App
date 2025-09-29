import mongoose from "mongoose";
import User from "../src/models/user.model.js";
import env from "../src/config/env.js";

const reviews = async () => {
  await mongoose.connect(env.MONGODB_URI, {
    useUnifiedTopology: true,
  });

  const users = await User.find({});

  // Add these 30 more reviews by hand
  const reviews = [
    {
      user: users[0]._id,
      product: products[10]._id,
      isVerifiedPurchase: true,
      comment: "Very useful in daily life, sturdy build.",
      rating: 5,
    },
    {
      user: users[1]._id,
      product: products[11]._id,
      isVerifiedPurchase: false,
      comment: "Average quality for the price.",
      rating: 3,
    },
    {
      user: users[2]._id,
      product: products[12]._id,
      isVerifiedPurchase: true,
      comment: "Exceeded expectations, will buy again.",
      rating: 5,
    },
    {
      user: users[3]._id,
      product: products[13]._id,
      isVerifiedPurchase: true,
      comment: "Item works fine but instructions unclear.",
      rating: 4,
    },
    {
      user: users[4]._id,
      product: products[14]._id,
      isVerifiedPurchase: false,
      comment: "Did not like the material, feels cheap.",
      rating: 2,
    },
    {
      user: users[0]._id,
      product: products[15]._id,
      isVerifiedPurchase: true,
      comment: "Super easy to use and reliable.",
      rating: 5,
    },
    {
      user: users[1]._id,
      product: products[16]._id,
      isVerifiedPurchase: true,
      comment: "Looks nice but battery drains fast.",
      rating: 3,
    },
    {
      user: users[2]._id,
      product: products[17]._id,
      isVerifiedPurchase: true,
      comment: "Top quality, highly satisfied.",
      rating: 5,
    },
    {
      user: users[3]._id,
      product: products[18]._id,
      isVerifiedPurchase: false,
      comment: "Arrived late, but product is fine.",
      rating: 4,
    },
    {
      user: users[4]._id,
      product: products[19]._id,
      isVerifiedPurchase: true,
      comment: "Packaging was excellent, product intact.",
      rating: 5,
    },
    {
      user: users[0]._id,
      product: products[20]._id,
      isVerifiedPurchase: false,
      comment: "Too small compared to description.",
      rating: 2,
    },
    {
      user: users[1]._id,
      product: products[21]._id,
      isVerifiedPurchase: true,
      comment: "Durable and looks stylish in my home.",
      rating: 5,
    },
    {
      user: users[2]._id,
      product: products[22]._id,
      isVerifiedPurchase: true,
      comment: "Good for the price, does its job.",
      rating: 4,
    },
    {
      user: users[3]._id,
      product: products[23]._id,
      isVerifiedPurchase: false,
      comment: "The product arrived broken.",
      rating: 1,
    },
    {
      user: users[4]._id,
      product: products[24]._id,
      isVerifiedPurchase: true,
      comment: "Very convenient and easy to install.",
      rating: 5,
    },
    {
      user: users[0]._id,
      product: products[25]._id,
      isVerifiedPurchase: true,
      comment: "Good purchase, fits perfectly.",
      rating: 4,
    },
    {
      user: users[1]._id,
      product: products[26]._id,
      isVerifiedPurchase: true,
      comment: "Looks elegant and performs well.",
      rating: 5,
    },
    {
      user: users[2]._id,
      product: products[27]._id,
      isVerifiedPurchase: false,
      comment: "Not worth the price.",
      rating: 2,
    },
    {
      user: users[3]._id,
      product: products[28]._id,
      isVerifiedPurchase: true,
      comment: "Really happy with the quality.",
      rating: 5,
    },
    {
      user: users[4]._id,
      product: products[5]._id,
      isVerifiedPurchase: true,
      comment: "Better than expected, fast shipping.",
      rating: 5,
    },
    {
      user: users[0]._id,
      product: products[6]._id,
      isVerifiedPurchase: false,
      comment: "Stopped working after two weeks.",
      rating: 1,
    },
    {
      user: users[1]._id,
      product: products[7]._id,
      isVerifiedPurchase: true,
      comment: "Nice design, works properly.",
      rating: 4,
    },
    {
      user: users[2]._id,
      product: products[8]._id,
      isVerifiedPurchase: true,
      comment: "Perfect for my needs.",
      rating: 5,
    },
    {
      user: users[3]._id,
      product: products[9]._id,
      isVerifiedPurchase: true,
      comment: "Okay but nothing special.",
      rating: 3,
    },
    {
      user: users[4]._id,
      product: products[0]._id,
      isVerifiedPurchase: false,
      comment: "Color is not as advertised.",
      rating: 2,
    },
    {
      user: users[0]._id,
      product: products[1]._id,
      isVerifiedPurchase: true,
      comment: "Very efficient, saves me time.",
      rating: 5,
    },
    {
      user: users[1]._id,
      product: products[2]._id,
      isVerifiedPurchase: true,
      comment: "Sturdy and reliable performance.",
      rating: 5,
    },
    {
      user: users[2]._id,
      product: products[3]._id,
      isVerifiedPurchase: false,
      comment: "Overpriced for the quality.",
      rating: 2,
    },
    {
      user: users[3]._id,
      product: products[4]._id,
      isVerifiedPurchase: true,
      comment: "Very happy, exactly as shown.",
      rating: 5,
    },
    {
      user: users[4]._id,
      product: products[10]._id,
      isVerifiedPurchase: true,
      comment: "This product made my life easier.",
      rating: 5,
    },
  ];

  process.exit();
};
seedData();

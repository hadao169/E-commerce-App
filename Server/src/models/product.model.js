import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    tags: { type: [String], default: ["new arrival"] },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL"],
      default: [],
    },
    colors: {
      type: [String],
      enum: ["Red", "Blue", "Green", "Black", "White"],
      default: [],
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    numSales: {
      type: Number,
      required: true,
      default: 0,
    },
    rateDistribution: {
      type: Map,
      of: Number,
      default: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// productSchema.methods.calculateAvgRating = function () {
//   const distribution = this.rateDistribution;

//   console.log("Rate Distribution:", distribution);
//   // Tổng số rating
//   const totalRatings = Object.values(distribution).reduce(
//     (sum, count) => sum + count,
//     0
//   );

//   if (totalRatings === 0) return 0;

//   // Tính tổng điểm: (1*count1 + 2*count2 + 3*count3 + 4*count4 + 5*count5)
//   const weightedSum = Object.entries(distribution).reduce(
//     (sum, [rating, count]) => {
//       return sum + Number(rating) * count;
//     },
//     0
//   );

//   // Tính trung bình và làm tròn đến 1 chữ số thập phân
//   return Number((weightedSum / totalRatings).toFixed(1));
// };

// // Middleware để tự động cập nhật avgRating trước khi lưu
// productSchema.pre("save", async function (next) {
//   if (this.isModified("rateDistribution")) {
//     this.avgRating = this.calculateAvgRating();
//   }
//   next();
// });

const Product = mongoose.model("Product", productSchema);
export default Product;

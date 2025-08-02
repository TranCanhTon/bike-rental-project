const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    type: {
      type: String,
      enum: ["mountain", "road", "electric"],
      required: [true, "Please provide bike type"],
    },
    hourlyRate: {
      type: Number,
      required: [true, "Please provide product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Cant be over 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/dog.jpeg",
    },
    location: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

BikeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

BikeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.model("Review").deleteMany({ product: this._id });
  }
);

module.exports = mongoose.model("Bike", BikeSchema);

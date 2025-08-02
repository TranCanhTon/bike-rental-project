const Review = require("../models/Review");
const User = require("../models/User");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const productExist = await Product.findOne({ _id: productId });

  if (!productExist) {
    throw new CustomError.NotFoundError("No product with thy id");
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError("Already submitted review");
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json(review);
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name type hourlyRate",
  });
  if (!reviews) {
    throw new CustomError.NotFoundError(`No review found`);
  }
  res.status(StatusCodes.OK).json(reviews);
};

const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id).populate("user");
  if (!review) {
    throw new CustomError.NotFoundError(`No review found with thy id: ${id}`);
  }
  res.status(StatusCodes.OK).json(review);
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { title, rating, comment } = req.body;
  const review = await Review.findById(id);
  if (!review) {
    throw new CustomError.NotFoundError(`No review found with thy id: ${id}`);
  }
  review.title = title;
  review.rating = rating;
  review.comment = comment;

  checkPermissions(req.user, review.user);
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    throw new CustomError.NotFoundError(`No review found with thy id: ${id}`);
  }
  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "It's deleted" });
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};

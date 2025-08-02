const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router
  .get("/", getAllReviews)
  .post("/", authenticateUser, createReview)
  .patch("/:id", authenticateUser, updateReview)
  .get("/:id", getSingleReview)
  .delete("/:id", authenticateUser, deleteReview);

module.exports = router;

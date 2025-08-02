const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllBikes,
  getSingleBike,
  createBike,
  updateBike,
  deleteBike,
  uploadImage,
} = require("../controllers/productController");

const { getSingleProductReviews } = require("../controllers/reviewController");

router
  .get("/", authenticateUser, getAllBikes)
  .post("/", authenticateUser, createBike)
  .post("/uploadImage", authenticateUser, uploadImage)
  .get("/:id", authenticateUser, getSingleBike)
  .patch("/:id", authenticateUser, updateBike)
  .delete("/:id", authenticateUser, deleteBike)
  .get("/:id/reviews", getSingleProductReviews);

module.exports = router;

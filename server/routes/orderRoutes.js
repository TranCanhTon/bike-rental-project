const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

router
  .get("/", authenticateUser, authorizePermissions("admin"), getAllOrders)
  .post("/", authenticateUser, createOrder)
  .get("/myOrders", authenticateUser, getCurrentUserOrders)
  .get("/:id", authenticateUser, getSingleOrder)
  .patch("/:id", authenticateUser, updateOrder);

module.exports = router;

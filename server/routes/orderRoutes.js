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
  .patch("/:id", authenticateUser, updateOrder)
  .get("/:id", authenticateUser, getSingleOrder);

module.exports = router;

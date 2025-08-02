const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  changePassword,
} = require("../controllers/userController");

router
  .get(
    "/",
    authenticateUser,
    authorizePermissions("admin", "user"),
    getAllUsers
  )
  .get("/profile", authenticateUser, showCurrentUser)
  .patch("/changePassword", authenticateUser, changePassword)
  .patch(
    "/:id",
    authenticateUser,
    authorizePermissions("admin", "user"),
    updateUser
  )
  .get("/:id", authenticateUser, getSingleUser);

module.exports = router;

const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getSingleUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUser,
  updatePassword,
  forgotPasswordToken,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/refresh-token", handleRefreshToken);
router.get("/logout-user", logoutUser);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;

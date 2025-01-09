const express = require("express");
const { register, login, forgotPassword, resetPassword, updateUser, deleteUser } = require("../controllers/authController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-user", protect, updateUser);
router.delete("/delete-user", protect, deleteUser);

module.exports = router;

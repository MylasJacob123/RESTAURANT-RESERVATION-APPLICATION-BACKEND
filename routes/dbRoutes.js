const express = require("express");
const {
  getUsers,
  getUserById,
  getRestaurants,
  getRestaurantsByAdmin,
  getRestaurantById,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getReservations,
  addReservation,
  updateReservation,
  checkAvailableSlots,
  deleteReservation,
  createPayment,
  capturePayment,
  getReviews,
  addReview,
} = require("../controllers/dbController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const {
  validateRestaurant,
  handleRestaurantValidationErrors,
  validateReservation,
  handleReservationValidationErrors,
} = require("../middleware/dbMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);
router.get("/users/:id", protect, getUserById);

// RESTAURANT ROUTES
router.get("/get-restaurants", getRestaurants);
router.get("/get-restaurants/admin/:adminId", getRestaurantsByAdmin);
router.get("/get-restaurants/:id", getRestaurantById);
router.post(
  "/add-restaurant",
  protect,
  adminOnly,
  upload.single("image"),
  validateRestaurant,
  handleRestaurantValidationErrors,
  addRestaurant
);
router.put(
  "/update-restaurant/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateRestaurant
);
router.get("/get-restaurants/:restaurantId/slots/:date", protect, checkAvailableSlots);
router.delete("/delete-restaurant/:id", protect, adminOnly, deleteRestaurant);

// RESERVATION ROUTES
router.get("/get-reservations", getReservations);
router.post(
  "/add-reservation",
  protect,
  validateReservation,
  handleReservationValidationErrors,
  addReservation
);
router.put("/update-reservation/:id", protect, updateReservation);
router.delete("/delete-reservation/:id", protect, deleteReservation);

// PAYMENT ROUTES
router.post("/create-payment", protect, createPayment);
router.post("/capture-payment/:orderId", protect, capturePayment);

//REVIEW ROUTES
router.get("/get-reviews/:restaurantId", getReviews);
router.post("/add-review", protect, addReview);

module.exports = router;

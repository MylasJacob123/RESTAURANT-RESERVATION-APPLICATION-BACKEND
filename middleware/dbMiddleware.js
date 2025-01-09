const { body, validationResult } = require("express-validator");

//////////////////////// RESTAURANT INPUT VALIDATION ////////////////////////

const validateRestaurant = [
  body("name")
    .notEmpty()
    .withMessage("Restaurant name is required")
    .isString()
    .withMessage("Restaurant name must be a string"),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string"),
  body("cuisine")
    .notEmpty()
    .withMessage("Cuisine is required")
    .isString()
    .withMessage("Cuisine must be a string"),
  body("admin")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isMongoId()
    .withMessage("Invalid admin ID format"),
];

const handleRestaurantValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//////////////////////// RESERVATION INPUT VALIDATION ////////////////////////

const validateReservation = [
  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid restaurant ID format"),
  body("date")
    .notEmpty()
    .withMessage("Reservation date is required")
    .isISO8601()
    .withMessage(
      "Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)"
    ),
  body("status")
    .optional()
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("Invalid reservation status"),
];

const handleReservationValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRestaurant,
  handleRestaurantValidationErrors,
  validateReservation,
  handleReservationValidationErrors,
};

const restaurant = require("../models/restaurant");
const reservation = require("../models/reservation");

//////////////////////// RESTAURANT FUNCTIONS ////////////////////////

const getRestaurants = async (req, res) => {
  try {
    // console.log("Fetching all restaurants...");
    const restaurants = await restaurant.find().populate("admin");
    // console.log("Restaurants fetched successfully:", restaurants);
    res.json(restaurants);
  } catch (error) {
    // console.error("Error fetching restaurants:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, description, reservationSlots, admin } =
      req.body;

    // console.log("Received data to add restaurant:", req.body);

    if (!name || !location || !cuisine || !admin) {
      // console.log("Validation error: Missing required fields");
      return res
        .status(400)
        .json({ error: "Name, location, cuisine, and admin are required." });
    }

    const newRestaurant = new restaurant({
      name,
      location,
      cuisine,
      description,
      reservationSlots,
      admin,
    });

    // console.log("Creating new restaurant:", newRestaurant);

    const savedRestaurant = await newRestaurant.save();
    // console.log("Restaurant saved successfully:", savedRestaurant);
    res.status(201).json(savedRestaurant);
  } catch (error) {
    // console.error("Error adding restaurant:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cuisine, description, reservationSlots, admin } =
      req.body;

    // console.log("Request to update restaurant with ID:", id);
    // console.log("Update data:", req.body);

    const restaurantToUpdate = await restaurant.findById(id);
    if (!restaurantToUpdate) {
      // console.log("Restaurant not found with ID:", id);
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (name) restaurantToUpdate.name = name;
    if (location) restaurantToUpdate.location = location;
    if (cuisine) restaurantToUpdate.cuisine = cuisine;
    if (description) restaurantToUpdate.description = description;
    if (reservationSlots)
      restaurantToUpdate.reservationSlots = reservationSlots;
    if (admin) restaurantToUpdate.admin = admin;

    // console.log("Updated restaurant object before saving:", restaurantToUpdate);

    const updatedRestaurant = await restaurantToUpdate.save();
    // console.log("Restaurant updated successfully:", updatedRestaurant);
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    // console.error("Error updating restaurant:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log("Request to delete restaurant with ID:", id);

    const deletedRestaurant = await restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      // console.log("Restaurant not found with ID:", id);
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // console.log("Restaurant deleted successfully:", deletedRestaurant);
    res
      .status(200)
      .json({ message: "Restaurant deleted successfully", deletedRestaurant });
  } catch (error) {
    // console.error("Error deleting restaurant:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//////////////////////// RESERVATION FUNCTIONS ////////////////////////

const getReservations = async (req, res) => {
  try {
    // console.log("Fetching all reservations...");
    const reservations = await reservation
      .find()
      .populate("user")
      .populate("restaurant");

    if (!reservations || reservations.length === 0) {
      // console.log("No reservations found");
      return res.status(404).json({ message: "No reservations found" });
    }

    // console.log("Reservations fetched successfully:", reservations);
    res.status(200).json(reservations);
  } catch (error) {
    // console.error("Error fetching reservations:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const addReservation = async (req, res) => {
  try {
    const { user, restaurant: restaurantId, date, status } = req.body;

    // console.log("Received data to add reservation:", req.body);

    if (!user || !restaurantId || !date) {
      // console.log("Validation error: Missing required fields");
      return res
        .status(400)
        .json({ error: "User, restaurant, and date are required." });
    }

    // console.log("Checking if restaurant exists with ID:", restaurantId);

    const foundRestaurant = await restaurant.findById(restaurantId);
    if (!foundRestaurant) {
      // console.log("Restaurant not found with ID:", restaurantId);
      return res.status(404).json({ error: "Restaurant not found." });
    }

    // Check if a reservation already exists for the same user, restaurant, and date
    const existingReservation = await reservation.findOne({
      user,
      restaurant: restaurantId,
      date,
    });

    if (existingReservation) {
      return res.status(400).json({
        error: "A reservation already exists for this user, restaurant, and date.",
      });
    }

    const newReservation = new reservation({
      user,
      restaurant: restaurantId,
      date,
      status: status || "pending",
    });

    // console.log("Creating new reservation:", newReservation);

    const savedReservation = await newReservation.save();
    // console.log("Reservation saved successfully:", savedReservation);
    res.status(201).json(savedReservation);
  } catch (error) {
    // console.error("Error adding reservation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, restaurant: restaurantId, date, status } = req.body;

    // console.log("Request received to update reservation:", id);
    // console.log("Request body:", req.body);

    const reservationToUpdate = await reservation.findById(id);
    if (!reservationToUpdate) {
      // console.log("Reservation not found with ID:", id);
      return res
        .status(404)
        .json({
          error: "Reservation not found. Invalid reservation ID provided.",
        });
    }
    // console.log("Reservation found:", reservationToUpdate);

    if (user) {
      // console.log("Updating user:", user);
      reservationToUpdate.user = user;
    }

    if (restaurantId) {
      // console.log("Checking restaurant ID:", restaurantId);
      const foundRestaurant = await restaurant.findById(restaurantId);
      if (!foundRestaurant) {
        // console.log("Restaurant not found with ID:", restaurantId);
        return res.status(404).json({
          error: `Restaurant not found. Invalid restaurant ID: ${restaurantId}`,
        });
      }
      // console.log("Restaurant found:", foundRestaurant);
      reservationToUpdate.restaurant = restaurantId;
    }

    if (date) {
      // console.log("Updating date to:", date);
      reservationToUpdate.date = date;
    }

    if (status) {
      // console.log("Updating status to:", status);
      reservationToUpdate.status = status;
    }

    // console.log("Final reservation object before saving:", reservationToUpdate);

    const updatedReservation = await reservationToUpdate.save();
    // console.log("Reservation successfully updated:", updatedReservation);

    res.status(200).json(updatedReservation);
  } catch (error) {
    // console.error("Error while updating reservation:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log("Received request to delete reservation with ID:", id);

    const deletedReservation = await reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      // console.log("No reservation found with the given ID:", id);
      return res.status(404).json({ error: "Reservation not found" });
    }

    // console.log("Reservation deleted successfully:", deletedReservation);
    res
      .status(200)
      .json({ message: "Reservation deleted successfully", deletedReservation });
  } catch (error) {
    // console.error("Error deleting reservation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getReservations,
  addReservation,
  updateReservation,
  deleteReservation
};

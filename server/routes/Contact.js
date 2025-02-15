const express = require("express");
const router = express.Router();
const { contactUsController } = require("../controllers/ContactUs");

// Check if the controller is defined
if (!contactUsController) {
  throw new Error("contactUsController is not defined. Please ensure it is exported from '../controllers/ContactUs'.");
}

// Define the route for contacting
router.post("/contact", contactUsController);

module.exports = router;

const express = require("express");
const router = express.Router();
const giftCardController = require("../controllers/giftCardController");
const authController = require("../controllers/authController");

//! All Admin Operations
// Create a Gift Card
router
  .route("/admin/create")
  .post(authController.isAdmin, giftCardController.createGiftCard);

// Get All Gift Card
router
  .route("/admin/showAll")
  .get(authController.isAdmin, giftCardController.getAllGiftCards);

// Delete Gift Card
router
  .route("/admin/:code/delete")
  .delete(authController.isAdmin, giftCardController.deleteGiftCard);

// Update Gift Card
router
  .route("/admin/:code/update")
  .patch(authController.isAdmin, giftCardController.updateGiftCard);

// Validate gift code
// router
//   .route("/admin/:code/validate")
//   .get(authController.isAdmin, giftCardController.validateGiftCard);

// Empty route
router.route("/").get((req, res) => {
  res.send("Welcome to the homepage!");
});

module.exports = router;

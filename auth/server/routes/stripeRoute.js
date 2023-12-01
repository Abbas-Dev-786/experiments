const express = require("express");
const { createPaymentIntent } = require("../controllers/stripeController");

const router = express.Router();

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.get("/create-payment-intent", createPaymentIntent);

module.exports = router;

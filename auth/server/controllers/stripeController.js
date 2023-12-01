const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { data } = require("./dataController");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = catchAsync(async (req, res) => {
  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create

  //   const product = data.filter((el) => el.id === req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "INR",
    amount: 5000,
    // automatic_payment_methods: { enabled: true },
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports.webhook = async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!");
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  }
  res.sendStatus(200);
};

const express = require("express");
const passport = require("passport");
const { login, register, test } = require("../controllers/authController");

const router = express.Router();

router.post("/auth/login", login);

router.post("/auth/register", register);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  test
);

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/success",
//     failedRedirect: "/failed",
//   })
// );

// router.get("/success", (req, res) => {
//   res.status(200).json({ status: "success", user: req.user });
// });

// router.get("/failed", (req, res) => {
//   res
//     .status(400)
//     .json({ status: "fail", message: "google authentication failed" });
// });

module.exports = router;

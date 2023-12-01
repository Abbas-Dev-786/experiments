const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

const userRouter = require("./routes/userRoute");
const dataRouter = require("./routes/dataRoute");
const stripeRouter = require("./routes/stripeRoute");
const meetingRouter = require("./routes/meetingRoute");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const { passportGoogleAuth } = require("./passport");

const app = express();

app.use(passport.initialize());
passportGoogleAuth();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.includes("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/tr", stripeRouter);
app.use("/api/v1/meetings", meetingRouter);

app.all("*", (req, _, next) => {
  next(new AppError(`the route ${req.originalUrl} does not exists`, 400));
});

app.use(globalErrorHandler);

module.exports = app;

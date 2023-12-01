const AppError = require("../utils/AppError");

const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);

    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field email. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((v) => v.message);
  return new AppError(`Validation error:- ${errors.join(", ")}.`, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

module.exports = (err, req, res, next) => {
  err.statusCode ||= 400;
  err.status ||= "fail";

  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    if (err.name === "ValidationError") error = handleValidationError(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendProdError(error, res);
  }
};

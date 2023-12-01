const express = require("express");
const { getData } = require("../controllers/dataController");
const AppError = require("../utils/AppError");

const router = express.Router();

router.get("/", getData);

module.exports = router;

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const data = [
  { name: "mercedes", price: 5000, id: 1 },
  { name: "BMW", price: 7000, id: 2 },
  { name: "Audi", price: 3000, id: 3 },
  { name: "Bugati", price: 9000, id: 4 },
];

module.exports.getData = (req, res) => {
  res.status(200).json({ status: "success", results: data.length, data });
};

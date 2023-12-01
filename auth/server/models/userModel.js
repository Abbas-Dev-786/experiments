const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "user must have firstName"],
    },
    lastName: {
      type: String,
      required: [true, "user must have lastName"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "user must have email"],
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "user must have password"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "manager"],
        default: "user",
        message: "role can be a user, admin or manager.",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePasswords = async function (
  enteredPassword,
  storedPassword
) {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

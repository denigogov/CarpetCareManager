const express = require("express");
const router = express.Router();

const database = require("../database/userQueries");
const { validateUsers } = require("../validators");
const { hashpassword, verifyPassword, verifyToken } = require("../Auth");

router
  .get("/count", verifyToken, database.userOrderCount)
  .get("/", verifyToken, database.getAllUsers)
  .get("/:id", verifyToken, database.getUsersById)
  .post("/", verifyToken, hashpassword, validateUsers, database.createUser)
  .put("/:id", verifyToken, database.updateUsers)
  .delete("/:id", database.deleteUsers);

module.exports = router;

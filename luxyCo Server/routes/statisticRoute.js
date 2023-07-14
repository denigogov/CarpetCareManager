const express = require("express");
const router = express.Router();

const database = require("../database/statistic");
const { validateUsers } = require("../validators");
const { hashpassword, verifyPassword, verifyToken } = require("../Auth");

router.get("/ordersByDay", verifyToken, database.ordersByDay);

module.exports = router;

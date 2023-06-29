const express = require("express");
const router = express.Router();

const database = require("../database/tableQueries");
const { validateUsers } = require("../validators");
const { hashpassword, verifyPassword, verifyToken } = require("../Auth");

router.get("/departments", verifyToken, database.tableDepartments);

module.exports = router;

const express = require("express");
const router = express.Router();

const database = require("../database/tableQueries");
const { validateUsers } = require("../validators");
const { hashpassword, verifyPassword, verifyToken } = require("../Auth");

router
  .get("/departments", verifyToken, database.tableDepartments)
  .get("/orders/", verifyToken, database.tableOrders)
  .get("/orderStatus/", verifyToken, database.tableOrderStatus)
  .get("/customers", verifyToken, database.tableCustomers)
  .get("/services", verifyToken, database.tableServices)
  .get("/orderServices", verifyToken, database.tableOrderServices)
  .post("/orderServices", verifyToken, database.postOrderServices);

module.exports = router;

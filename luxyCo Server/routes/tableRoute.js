const express = require("express");
const router = express.Router();

const database = require("../database/tableQueries");
const { validateUsers } = require("../validators");
const { hashpassword, verifyPassword, verifyToken } = require("../Auth");

router
  .get("/departments", verifyToken, database.tableDepartments)

  .get("/orders", verifyToken, database.tableOrders)
  .post("/orders", verifyToken, database.createNewOrder)
  .delete("/orders/:id", verifyToken, database.deleteOrders)

  .get("/orderStatus", verifyToken, database.tableOrderStatus)
  .get("/services", verifyToken, database.tableServices)
  .get("/orderServices", verifyToken, database.tableOrderServices)
  .post("/orderServices", verifyToken, database.postOrderServices);

module.exports = router;

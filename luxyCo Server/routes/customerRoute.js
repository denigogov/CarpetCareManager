const express = require("express");
const router = express.Router();

const database = require("../database/customers");
const { hashpassword, verifyPassword, verifyToken } = require("../Auth");

router
  .get("/", verifyToken, database.tableCustomers)
  .post("/", verifyToken, database.createNewCustomer)
  .get("/:id", verifyToken, database.getCustomerById)
  .put("/:id", verifyToken, database.updateCustomer)
  .delete("/:id", verifyToken, database.deleteCustomer)
  .get("/details/:id", verifyToken, database.getCustomerOrders);

module.exports = router;

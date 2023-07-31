const express = require('express');
const router = express.Router();

const database = require('../database/tableQueries');
const { validateUsers } = require('../validators');
const { hashpassword, verifyPassword, verifyToken } = require('../Auth');

router
  .get('/departments', verifyToken, database.tableDepartments)
  .get('/orders/scheduled', verifyToken, database.orderScheduledDate)

  .get('/orders', verifyToken, database.tableOrders)
  .post('/orders', verifyToken, database.createNewOrder)
  .delete('/orders/:id', verifyToken, database.deleteOrders)
  .put('/orders/:id', verifyToken, database.updateOrder)
  .get('/orders/:id', verifyToken, database.getOrderById)

  .get('/orderStatus', verifyToken, database.tableOrderStatus)
  .put('/orderStatus/:id', verifyToken, database.updateOrderStatus)
  .get('/services', verifyToken, database.tableServices)
  .get('/orderServices', verifyToken, database.tableOrderServices)
  .post('/orderServices', verifyToken, database.postOrderServices);

module.exports = router;

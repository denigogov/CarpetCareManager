const express = require('express');
const router = express.Router();

const database = require('../database/tableQueries');
const { validateUsers } = require('../validators');
const { verifyToken } = require('../Auth');

router
  .get('/departments', verifyToken, database.tableDepartments)
  .get('/orders/scheduled', verifyToken, database.orderScheduledDate)

  .get('/orders', verifyToken, database.tableOrders)
  .get('/orders/:id', verifyToken, database.getOrderById)
  .post('/orders', verifyToken, database.createNewOrder)
  .delete('/orders/:id', verifyToken, database.deleteOrders)
  .put('/orders/:id', verifyToken, database.updateOrder)

  .get('/orderStatus', verifyToken, database.tableOrderStatus)
  .put('/orderStatus/:id', verifyToken, database.updateOrderStatus)

  .get('/services', verifyToken, database.tableServices)
  .post('/services', verifyToken, database.createNewService)
  .put('/services/:id', verifyToken, database.updateTableServices)
  .delete('/services/:id', verifyToken, database.deleteTableServices)

  .get('/orderServices', verifyToken, database.tableOrderServices)
  .post('/orderServices', verifyToken, database.postOrderServices)

  .get('/inventory', verifyToken, database.tableInventory)
  .post('/inventory', database.createNewInventory)

  .get('/inventorycategories', verifyToken, database.tableInvetoryCategories)
  .put(
    '/inventorycategories/:id',
    verifyToken,
    database.updateInventoryCategories
  )
  .delete(
    '/inventorycategories/:id',
    verifyToken,
    database.deleteTableInventoryCategory
  );

module.exports = router;

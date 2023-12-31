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
  .post('/orderStatus', verifyToken, database.createOrderStatus)
  .put('/orderStatusTable/:id', verifyToken, database.updateTableOrderStatus)
  .put('/orderStatus/:id', verifyToken, database.updateOrderStatus)
  .delete('/orderStatus/:id', verifyToken, database.deleteOrderStatus)

  .get('/services', verifyToken, database.tableServices)
  .post('/services', verifyToken, database.createNewService)
  .put('/services/:id', verifyToken, database.updateTableServices)
  .delete('/services/:id', verifyToken, database.deleteTableServices)

  .get('/inventory', verifyToken, database.tableInventory)
  .post('/inventory', verifyToken, database.createNewInventory)
  .put('/inventory/:id', verifyToken, database.updateInventory)
  .delete('/inventory/:id', verifyToken, database.deleteInventory)

  .get('/inventorycategories', verifyToken, database.tableInvetoryCategories)
  .post('/inventorycategories', verifyToken, database.createInventoryCategory)
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

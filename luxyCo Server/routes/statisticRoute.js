const express = require('express');
const router = express.Router();

const database = require('../database/statistic');
const { validateUsers } = require('../validators');
const { hashpassword, verifyPassword, verifyToken } = require('../Auth');

router
  .get('/ordersByDay', verifyToken, database.ordersByDay)
  .get('/ordersByMonth', verifyToken, database.orderStatByMonth)
  .get('/ordersByStatus', verifyToken, database.orderStatPerStatus)
  .get('/ordersByHourPerMonth', verifyToken, database.orderStatHourlyPerMonth);

module.exports = router;

const express = require('express');
const router = express.Router();

const database = require('../database/userQueries');

const {
  hashpassword,
  verifyPassword,
  verifyToken,

  sendUserInfo,
} = require('../Auth');

router
  .post('/', database.getUserByEmailWithPasswordAndPassToNext, verifyPassword)
  .get('/', verifyToken, database.getUserbyIdAndNext, sendUserInfo);

module.exports = router;

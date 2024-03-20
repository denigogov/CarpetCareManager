const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');

const database = require('../database/userQueries');
const { verifyPassword, verifyToken, sendUserInfo } = require('../Auth');

//block too many request !
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, // max request 4  (per 15 minutes)
  strictTransportSecurity: false,
  standardHeaders: true,
  legacyHeaders: false,
});

router
  .post(
    '/',
    // loginLimit,
    database.getUserByEmailWithPasswordAndPassToNext,
    verifyPassword
  )
  .get('/', verifyToken, database.getUserbyIdAndNext, sendUserInfo);

// Simulate a login request because backend server goes to sleep after 15 minutes of inactivity and takes some time to wake up -- I'm using free version of render ! just for showcase(portfolio project)
//every 12 minutes!
cron.schedule('*/12 * * * *', async () => {
  try {
    await fetch('https://carpetcare.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'demo',
        password: 'demo123',
      }),
    });
  } catch (error) {
    console.error('Error during scheduled login:', error.message);
  }
});

module.exports = router;

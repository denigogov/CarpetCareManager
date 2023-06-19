const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT ?? 4001;

const database = require("./database/database");
const { validateUsers } = require("./validators");
const { hashpassword, verifyPassword, verifyToken } = require("./Auth");

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on http://localhost:${port}/`);
  }
});

const welcome = (_, res) => {
  res.send(`welcome , owner Dejan Gogov`);
};
app.get("/users", database.userOrderCount);
app.get("/users/:id", database.getUsersById);
app.post("/users", hashpassword, validateUsers, database.createUser);

// Login
app.post(
  "/login",
  database.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.SERVER_PORT ?? 4001;

const userRoute = require("./routes/userRoute");
const loginRoute = require("./routes/loginRoute");
const tableRoute = require("./routes/tableRoute");
const customerRoute = require("./routes/customerRoute");
const statisticRoute = require("./routes/statisticRoute");

app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/table", tableRoute);
app.use("/customer", customerRoute);
app.use("/statistic", statisticRoute);

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

app.use("/", welcome);

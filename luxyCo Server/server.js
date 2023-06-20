const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT ?? 4001;

const userRoute = require("./routes/userRoute");
// const custumerRouter = require("./routes/custumerRoute");

app.use("/user", userRoute);
// app.use("/custumer", custumerRouter);

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

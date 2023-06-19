require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connecting with the database
database
  .getConnection()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(`someting happen ${err}`);
  });

const userOrderCount = (req, res) => {
  database
    .query(
      "SELECT custumers.id, custumers.first_name, custumers.last_name, COUNT(*) AS order_count FROM orders INNER JOIN custumers ON orders.custumer_id = custumers.id GROUP BY custumers.id, custumers.first_name, custumers.last_name HAVING COUNT(*) > 2 "
    )
    .then(([orders]) => {
      console.log(orders);
      res.json(orders);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([orders]) => {
      if (orders[0] != null) {
        res.json(orders[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const createUser = (req, res) => {
  const {
    department_id,
    first_name,
    last_name,
    password,
    street,
    phone_number,
    salary,
  } = req.body;

  database
    .query(
      "INSERT INTO users(department_id, first_name, last_name, password, street,phone_number,salary) VALUES (?, ?, ?, ?, ?, ? ,?)",
      [
        department_id,
        first_name,
        last_name,
        password,
        street,
        phone_number,
        salary,
      ]
    )
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { first_name } = req.body;
  console.log(first_name);

  database
    .query("SELECT * FROM users WHERE first_name = ?", [first_name])
    .then(([first_name]) => {
      console.log(first_name);
      if (first_name[0] != null) {
        req.user = first_name[0];

        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  userOrderCount,
  getUsersById,
  createUser,
  getUserByEmailWithPasswordAndPassToNext,
};

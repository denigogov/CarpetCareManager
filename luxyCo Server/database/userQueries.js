const database = require("./database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const getAllUsers = (_, res) => {
  database
    .query(
      "select users.id, first_name, last_name, department_name, salary, street from users left join departments on users.department_id = departments.id order by users.id asc"
    )
    .then(([user]) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(
      "SELECT users.id, first_name, last_name, password, street, phone_number, salary, department_id, department_name FROM users left JOIN departments ON users.department_id = departments.id WHERE users.id = ?",
      [id]
    )
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
      res.location(`/user/${result.insertId}`).sendStatus(201);
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
    .then(([users]) => {
      console.log(users);
      if (users[0] != null) {
        req.user = users[0];

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

// BUILDING PUT METHOD WITH USERS !!
const updateUsers = (req, res) => {
  const {
    department_id,
    first_name,
    last_name,
    password,
    street,
    phone_number,
    salary,
  } = req.body;
  const id = req.params.id;

  database
    .query(
      "UPDATE users SET department_id=?, first_name=?, last_name=?, password=?, street=?, phone_number=?, salary=? WHERE id=?",
      [
        department_id,
        first_name,
        last_name,
        password,
        street,
        phone_number,
        salary,
        id,
      ]
    )
    .then(([user]) => {
      if (!user.affectedRows) {
        res.status(404).send("error happen, please try again!");
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(500).send("error" + err);
    });
};
const deleteUsers = (req, res) => {
  const id = req.params.id;

  // Delete the associated orders
  const deleteOrdersQuery = "DELETE FROM orders WHERE user_id = ?";
  database
    .query(deleteOrdersQuery, [id])
    .then(() => {
      // Delete the user
      const deleteUserQuery = "DELETE FROM users WHERE id = ?";
      return database.query(deleteUserQuery, [id]);
    })
    .then(([user]) => {
      if (user.affectedRows) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send("Error deleting user", err);
    });
};

module.exports = {
  userOrderCount,
  getAllUsers,
  getUsersById,
  createUser,
  getUserByEmailWithPasswordAndPassToNext,
  updateUsers,
  deleteUsers,
};

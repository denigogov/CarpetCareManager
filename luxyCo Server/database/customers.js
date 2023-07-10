const database = require("./database");

const tableCustomers = (_, res) => {
  database
    .query("select * from  customers ORDER BY id DESC")
    .then(([customers]) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const createNewCustomer = (req, res) => {
  const { first_name, last_name, street, city, phone_number, postalCode } =
    req.body;

  database
    .query(
      "INSERT INTO customers(first_name, last_name, street, city, phone_number, postalCode) VALUES (?, ?, ?, ? ,?, ?)",
      [first_name, last_name, street, city, phone_number, postalCode]
    )
    .then(([customers]) => {
      res.location(`/table/customers/${customers.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Errora creating new customer");
    });
};

const deleteCustomer = (req, res) => {
  const id = req.params.id;

  database
    .query("DELETE FROM customers WHERE id = ?", [id])
    .then(([customer]) => {
      if (!customer.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(404).send("error deleting the customer", err);
    });
};

const updateCustomer = (req, res) => {
  const { first_name, last_name, street, city, phone_number, postalCode } =
    req.body;
  const id = req.params.id;

  database
    .query(
      "UPDATE customers SET first_name=?, last_name=?, street=?, city=?, phone_number=?,postalCode=? WHERE id=?",
      [first_name, last_name, street, city, phone_number, postalCode, id]
    )
    .then(([customer]) => {
      if (!customer.affectedRows) {
        res.status(404).send("error happen, please try again!");
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  tableCustomers,
  createNewCustomer,
  deleteCustomer,
  updateCustomer,
};

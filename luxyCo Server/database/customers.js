const database = require("./database");

const tableCustomers = (_, res) => {
  database
    .query("select * from  customers order by id desc")
    .then(([customers]) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getCustomerById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM customers  WHERE id = ?", [id])
    .then(([customer]) => {
      if (customer[0] != null) {
        res.json(customer[0]);
      } else {
        res.status(404).send("Customer Not Found");
      }
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
      res.status(500).send("Error creating new customer");
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

const getCustomerOrders = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(
      "SELECT customers.first_name, customers.last_name, customers.phone_number, customers.street, customers.city, customers.postalCode, order_services.m2, orders.order_date, orders.total_price, orders.delivery, orders.scheduled_date FROM orders INNER JOIN customers ON customers.id = orders.customer_id INNER JOIN order_services ON order_services.id = orders.orderService_id WHERE customers.id = ?",
      [id]
    )
    .then(([customerOrders]) => {
      if (customerOrders[0] != null) {
        res.json(customerOrders);
      } else {
        res.status(404).send("CustomerOrders Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  tableCustomers,
  getCustomerById,
  createNewCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomerOrders,
};

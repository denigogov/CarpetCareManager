const database = require('./database');

const tableCustomers = (_, res) => {
  database
    .query('select * from  customers order by id desc')
    .then(([customers]) => {
      res.json(customers);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getCustomerById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('SELECT * FROM customers  WHERE id = ?', [id])
    .then(([customer]) => {
      if (customer[0] != null) {
        res.json(customer[0]);
      } else {
        res.status(404).send('Customer Not Found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const createNewCustomer = (req, res) => {
  const { first_name, last_name, street, city, phone_number, postalCode } =
    req.body;

  database
    .query(
      'INSERT INTO customers(first_name, last_name, street, city, phone_number, postalCode) VALUES (?, ?, ?, ? ,?, ?)',
      [first_name, last_name, street, city, phone_number, postalCode]
    )
    .then(([customers]) => {
      res.location(`/table/customers/${customers.insertId}`).sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating new customer');
    });
};

const deleteCustomer = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM customers WHERE id = ?', [id])
    .then(([customer]) => {
      if (!customer.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(404).send('error deleting the customer', err);
    });
};

const updateCustomer = (req, res) => {
  const { first_name, last_name, street, city, phone_number, postalCode } =
    req.body;
  const id = req.params.id;

  database
    .query(
      'UPDATE customers SET first_name=?, last_name=?, street=?, city=?, phone_number=?,postalCode=? WHERE id=?',
      [first_name, last_name, street, city, phone_number, postalCode, id]
    )
    .then(([customer]) => {
      if (!customer.affectedRows) {
        res.status(404).send('error happen, please try again!');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getCustomerOrders = (req, res) => {
  const id = parseInt(req.params.id);

  // Converting the date to be +2 hours because of the ISO String problem
  database
    .query(
      `SELECT customers.first_name, 
      customers.last_name,
        orders_multiple.m2,  
        
        CONVERT_TZ(order_date, '+00:00', '+02:00') AS order_date,
        orders_multiple.total_price, 
        orders_multiple.delivery, 
        orders_multiple.scheduled_date,
        services.service_name,
        orders_multiple.pieces
        FROM orders_multiple 
        INNER JOIN customers ON customers.id = orders_multiple.customer_id 
        INNER JOIN services on services.id = service_id
      WHERE customers.id = ?
      order by order_date DESC`,
      [id]
    )
    .then(([customerOrders]) => {
      if (customerOrders[0] != null) {
        res.json(customerOrders);
      } else {
        res.status(404).send('CustomerOrders Not Found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
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

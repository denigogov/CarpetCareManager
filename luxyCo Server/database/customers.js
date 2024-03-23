const database = require('./database');
const { getFromDB } = require('./dbHelpers');

const tableCustomers = async (_, res) => {
  try {
    await getFromDB(
      _,
      res,
      null, // reqParams
      null, // reqBody
      'SELECT * FROM customers ORDER BY id DESC',
      'Retrieving Customers Error'
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Query Error');
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    await getFromDB(
      req,
      res,
      id,
      null,
      'SELECT * FROM customers WHERE id = ?',
      'Retrieving Single Customer Data Error'
    );
  } catch (err) {
    res.status(500).send('Database Query Error'.err);
  }
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

const getCustomerOrders = async (req, res) => {
  try {
    const { id } = req.params;

    await getFromDB(
      req,
      res,
      id,
      null,
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
      'Retrieving Customers Order Error'
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Query Error');
  }
};

module.exports = {
  tableCustomers,
  getCustomerById,
  createNewCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomerOrders,
};

const database = require("./database");

const tableDepartments = (_, res) => {
  database
    .query("select * from  departments")
    .then(([department]) => {
      res.json(department);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const createNewOrder = (req, res) => {
  const {
    customer_id,
    user_id,
    total_price,
    delivery,
    scheduled_date,
    orderService_id,
  } = req.body;

  database
    .query(
      "INSERT INTO orders(customer_id, user_id, total_price, delivery, orderService_id,scheduled_date) VALUES (?, ?, ?, ? ,?,?)",
      [
        customer_id,
        user_id,
        total_price,
        delivery,
        orderService_id,
        scheduled_date,
      ]
    )
    .then(([order]) => {
      res.location(`/table/orders/${order.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating new order");
    });
};

const tableOrders = (req, res) => {
  const { date } = req.query;

  database
    .query(
      `SELECT 
      orders.id, 
      users.username,
      customers.first_name,
      customers.last_name,
      customers.phone_number,
      customers.street,
      status_name,
      CONVERT_TZ(order_date, '+00:00', '+02:00') AS order_date,
      total_price , 
      delivery,
      scheduled_date,city,
      pieces as carpet_pieces,
      services.service_price,m2  ,pieces FROM orders

      left join users on orders.user_id = users.id 
      left join customers on orders.customer_id = customers.id
      inner join order_status on orders.order_status_id = order_status.id
      INNER JOIN order_services ON orders.orderService_id = order_services.id
      INNER JOIN services ON order_services.service_id = services.id
   
  
      WHERE order_date LIKE CONCAT(?, '%')    ORDER BY id DESC;`,

      [date]
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

const tableOrderStatus = (_, res) => {
  database
    .query("select * from  order_status")
    .then(([orderStatus]) => {
      res.json(orderStatus);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const tableCustomers = (_, res) => {
  database
    .query("select * from  customers")
    .then(([customers]) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postTableCustomers = (req, res) => {
  const { first_name, last_name, street, city, phone_number } = req.body;

  database
    .query(
      "INSERT INTO customers(first_name, last_name, street, city, phone_number) VALUES (?, ?, ?, ? ,?)",
      [first_name, last_name, street, city, phone_number]
    )
    .then(([customers]) => {
      res.location(`/table/customers/${customers.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Errora creating new customer");
    });
};

const tableServices = (_, res) => {
  database
    .query("select * from  services")
    .then(([services]) => {
      res.json(services);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const tableOrderServices = (_, res) => {
  database
    .query("select * from  order_services")
    .then(([orderServices]) => {
      res.json(orderServices);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postOrderServices = (req, res) => {
  const { id, service_id, m2, pieces } = req.body;

  database
    .query(
      "INSERT INTO order_services(id,service_id, m2, pieces) VALUES (?,?, ?, ?)",
      [id, service_id, m2, pieces]
    )
    .then(([result]) => {
      res.location(`/table/orderServices/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Errora creating new user");
    });
};

module.exports = {
  tableDepartments,
  createNewOrder,
  tableOrders,
  tableOrderStatus,
  tableCustomers,
  tableServices,
  tableOrderServices,
  postOrderServices,
  postTableCustomers,
};

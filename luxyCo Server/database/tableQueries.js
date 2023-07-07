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
      scheduled_date,
      pieces as carpet_pieces,
      services.service_price,m2 FROM orders

      left join users on orders.user_id = users.id 
      inner join customers on orders.customer_id = customers.id
      inner join order_status on orders.order_status_id = order_status.id
      INNER JOIN order_services ON orders.orderService_id = order_services.id
      INNER JOIN services ON order_services.service_id = services.id
      WHERE order_date LIKE CONCAT(?, '%')`,

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
  const { service_id, m2, pieces } = req.body;

  database
    .query(
      "INSERT INTO order_services(service_id, m2, pieces) VALUES (?, ?, ?)",
      [service_id, m2, pieces]
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
  tableOrders,
  tableOrderStatus,
  tableCustomers,
  tableServices,
  tableOrderServices,
  postOrderServices,
};

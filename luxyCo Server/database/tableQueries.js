const database = require('./database');

const tableDepartments = (_, res) => {
  database
    .query('select * from  departments')
    .then(([department]) => {
      res.json(department);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
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
      'INSERT INTO orders(customer_id, user_id, total_price, delivery, orderService_id,scheduled_date) VALUES (?, ?, ?, ? ,?,?)',
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
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating new order');
    });
};

const tableOrders = (req, res) => {
  const { date } = req.query;

  database
    .query(
      `
      SELECT
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
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from the database');
    });
};

const deleteOrders = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM orders WHERE id = ?', [id])
    .then(([order]) => {
      if (!order.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(404).send('error deleting the order', err);
    });
};

const updateOrder = (req, res) => {
  const { total_price, order_status_id, delivery, scheduled_date, m2, pieces } =
    req.body;
  const id = req.params.id;

  database
    .query(
      `UPDATE orders
      JOIN order_services ON orders.orderService_id = order_services.id
      SET 
          total_price=?,
          order_status_id=?,
          delivery=?,
          scheduled_date=?,
          m2=?,
          pieces=?
      WHERE orders.id=?`,
      [total_price, order_status_id, delivery, scheduled_date, m2, pieces, id]
    )
    .then(([order]) => {
      if (!order.affectedRows) {
        res.status(404).send('error happen, please try again!');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);
  // Converting the date to be +2 hours because of the ISO String problem
  database
    .query(
      `
    SELECT
    orders.id,
    users.username,
    customers.first_name,
    customers.last_name,
    customers.phone_number,
    customers.street,
    status_name,
    order_status.id as order_status_id,
    CONVERT_TZ(order_date, '+00:00', '+02:00') AS order_date,
    total_price ,
    delivery,
    CONVERT_TZ(scheduled_date, '+00:00', '+02:00') AS scheduled_date,
    city,
    postalCode,
    pieces as carpet_pieces,
    services.service_price,
    m2,
    pieces
    FROM orders

    left join users on orders.user_id = users.id
    left join customers on orders.customer_id = customers.id
    inner join order_status on orders.order_status_id = order_status.id
    INNER JOIN order_services ON orders.orderService_id = order_services.id
    INNER JOIN services ON order_services.service_id = services.id

    WHERE orders.id = ?  `,

      [id]
    )
    .then(([order]) => {
      if (order[0] != null) {
        res.json(order[0]);
      } else {
        res.status(404).send('Order Not Found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const tableOrderStatus = (_, res) => {
  database
    .query('select * from  order_status')
    .then(([orderStatus]) => {
      res.json(orderStatus);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const tableServices = (_, res) => {
  database
    .query('select * from  services')
    .then(([services]) => {
      res.json(services);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const tableOrderServices = (_, res) => {
  database
    .query('select * from  order_services')
    .then(([orderServices]) => {
      res.json(orderServices);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const postOrderServices = (req, res) => {
  const { id, service_id, m2, pieces } = req.body;

  database
    .query(
      'INSERT INTO order_services(id,service_id, m2, pieces) VALUES (?,?, ?, ?)',
      [id, service_id, m2, pieces]
    )
    .then(([result]) => {
      res.location(`/table/orderServices/${result.insertId}`).sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Errora creating new user');
    });
};

const updateOrderStatus = (req, res) => {
  const { order_status_id } = req.body;
  const id = req.params.id;

  database
    .query(`UPDATE orders SET  order_status_id=? WHERE orders.id=?`, [
      order_status_id,
      id,
    ])
    .then(([order]) => {
      if (!order.affectedRows) {
        res.status(404).send('error happen, please try again!');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const orderScheduledDate = (req, res) => {
  const { startDate, endDate } = req.query;

  database
    .query(
      `
      SELECT 
      orders.id,
      first_name,
      last_name,
      m2,
      pieces,
      total_price,
      status_name,
      service_name,
      CONVERT_TZ(scheduled_date, '+00:00', '+02:00') AS scheduled_date
      FROM orders 
      inner join customers on orders.customer_id = customers.id
      inner join order_services on orderService_id = order_services.id
      inner join services on services.id = order_services.service_id
      inner join order_status on order_status_id = order_status.id
      WHERE scheduled_date BETWEEN  ? AND ? `,
      [startDate, endDate]
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving order from the database');
    });
};

module.exports = {
  tableDepartments,
  createNewOrder,
  tableOrders,
  tableOrderStatus,
  tableServices,
  tableOrderServices,
  postOrderServices,
  deleteOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  orderScheduledDate,
};

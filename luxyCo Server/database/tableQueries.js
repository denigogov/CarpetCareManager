const database = require('./database');

// const createOrderMultiple = (req, res) => {
// const orders = req.body; // Assumes req.body is an array of order objects [{ name, price }, ...]

// if (!Array.isArray(orders)) {
//   return res.status(400).send('Invalid input format');
// }

// const values = orders.map(order => [order.name, order.price]);

// database
//   .query('INSERT INTO multiorders (name, price) VALUES ?', [values])
//   .then(result => {
//     res.location(`/table/multiorder/${result.insertId}`).sendStatus(201);
//   })
//   .catch(err => {
//     console.error(err);
//     res.status(500).send('Error creating new orders');
//   });
// };

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
  const orders = req.body;

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).send('Invalid input format');
  }

  const values = orders.map(order => [
    order.customer_id,
    order.user_id,
    order.service_id, // Replace with your service_id field
    order.scheduled_date,
    order.total_price,
    order.m2,
    order.pieces,
    order.delivery,
  ]);

  const query =
    'INSERT INTO orders_multiple (customer_id, user_id, service_id, scheduled_date, total_price, m2, pieces, delivery) VALUES ?';

  database
    .query(query, [values])
    .then(result => {
      console.log(result);
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating new orders');
    });
};

// GOTOVO !!!!
const tableOrders = (req, res) => {
  const { date } = req.query;

  database
    .query(
      `
      select   
      orders_multiple.id,
      users.username,
      customers.first_name,
      customers.last_name,
      customers.phone_number,
      customers.street,
      status_name,
      service_name,
      CONVERT_TZ(order_date, '+00:00', '+02:00') AS order_date,
      total_price ,
      delivery,
      scheduled_date,city,
      pieces as carpet_pieces,
      services.service_price,m2  ,pieces FROM orders_multiple
      left join customers on orders_multiple.customer_id = customers.id
      left join users on orders_multiple.user_id = users.id
      left join order_status on orders_multiple.order_status_id = order_status.id
      left join services on orders_multiple.service_id = services.id

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

// GOTOVO !!!!
const deleteOrders = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM orders_multiple WHERE id = ?', [id])
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

// GOTOVO !!!!
const updateOrder = (req, res) => {
  const { total_price, order_status_id, delivery, scheduled_date, m2, pieces } =
    req.body;
  const id = req.params.id;

  database
    .query(
      `UPDATE orders_multiple
      SET 
          total_price=?,
          order_status_id=?,
          delivery=?,
          scheduled_date=?,
          m2=?,
          pieces=?
      WHERE orders_multiple.id=?`,
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

// GOTOVO !!!!
const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);
  // Converting the date to be +2 hours because of the ISO String problem
  database
    .query(
      `
      select
      orders_multiple.id,
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
      FROM   orders_multiple
      left join customers on orders_multiple.customer_id = customers.id
      left join users on orders_multiple.user_id = users.id
      left join order_status on orders_multiple.order_status_id = order_status.id
      left join services on orders_multiple.service_id = services.id

    WHERE orders_multiple.id = ?  `,

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

const deleteOrderStatus = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM order_status WHERE id = ?', [id])
    .then(([orderStatus]) => {
      if (!orderStatus.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(404).send('error deleting the orderStatus', err);
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

const updateTableServices = (req, res) => {
  const { service_price, service_name } = req.body;
  const id = req.params.id;

  database
    .query(
      `update services set service_name = ? ,service_price = ? where id = ?`,
      [service_name, service_price, id]
    )
    .then(([service]) => {
      if (!service.affectedRows) {
        res.status(404).send('error happen, please try again!');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const deleteTableServices = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM services WHERE id = ?', [id])
    .then(([services]) => {
      if (!services.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(404).send('error deleting the service', err);
    });
};

const createNewService = (req, res) => {
  const { service_name, service_price } = req.body;

  database
    .query('INSERT INTO services( service_name, service_price) VALUES (?, ?)', [
      service_name,
      service_price,
    ])
    .then(([service]) => {
      res.location(`/table/services/${service.insertId}`).sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating new order');
    });
};

// GOTOVO !!!!
const updateOrderStatus = (req, res) => {
  const { order_status_id } = req.body;
  const id = req.params.id;

  database
    .query(
      `UPDATE orders_multiple SET  order_status_id=? WHERE orders_multiple.id=?`,
      [order_status_id, id]
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

const orderScheduledDate = (req, res) => {
  const { startDate, endDate } = req.query;

  database
    .query(
      `
      select
      orders_multiple.id,
      customers.first_name,
      customers.last_name,
      m2,
      pieces,
      total_price,
      status_name,
      service_name,
      CONVERT_TZ(scheduled_date, '+00:00', '+02:00') AS scheduled_date
      FROM orders_multiple 
      left join customers on orders_multiple.customer_id = customers.id
      left join order_status on orders_multiple.order_status_id = order_status.id
      left join services on orders_multiple.service_id = services.id


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

// TABLE INVENTORY
const tableInventory = (_, res) => {
  database
    .query(
      `SELECT inventory.id,inventory_categories.id as category_id, article_number,article_name,details,quantity,location,price,date_entry,category_name FROM carpet.inventory
    left join inventory_categories on category_id = inventory_categories.id`
    )
    .then(([inventory]) => {
      res.json(inventory);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving inventory from database');
    });
};

const createNewInventory = (req, res) => {
  const {
    article_number,
    article_name,
    details,
    quantity,
    location,
    price,
    category_id,
  } = req.body;

  database
    .query(
      'INSERT INTO inventory(article_number, article_name, details,quantity, location,price, category_id) VALUES (?, ?, ?, ? ,?,?,?)',
      [
        article_number,
        article_name,
        details,
        quantity,
        location,
        price,
        category_id,
      ]
    )
    .then(([inventory]) => {
      res.location(`/table/inventory/${inventory.insertId}`).sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating new inventory');
    });
};

const updateInventory = (req, res) => {
  const { article_name, details, quantity, location, price, category_id } =
    req.body;
  const id = req.params.id;

  database
    .query(
      `UPDATE inventory SET article_name =?,details =?,quantity =? ,location =?,price =?,category_id =? WHERE id= ?`,
      [article_name, details, quantity, location, price, category_id, id]
    )
    .then(([inventory]) => {
      if (!inventory.affectedRows) {
        res
          .status(404)
          .send('error happen updating Inventory, please try again!');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const deleteInventory = (req, res) => {
  const id = req.params.id;

  database
    .query('DELETE FROM inventory WHERE id = ?', [id])
    .then(([inventory]) => {
      if (!inventory.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(404).send('error deleting the inventory', err);
    });
};

// TABLE INVENTORY-Categories
const tableInvetoryCategories = (_, res) => {
  database
    .query(`SELECT * from inventory_categories`)
    .then(([categories]) => {
      res.json(categories);
    })
    .catch(err => {
      console.error(err);
      res
        .status(500)
        .send('Error retrieving inventory categories from database');
    });
};

const createInventoryCategory = (req, res) => {
  const { category_name } = req.body;

  database
    .query('INSERT INTO inventory_categories(category_name) VALUES (?)', [
      category_name,
    ])
    .then(([category]) => {
      console.log(category);
      res
        .location(`/table/inventorycategories/${category.insertId}`)
        .sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating new inventory category');
    });
};

const updateInventoryCategories = (req, res) => {
  const { category_name } = req.body;
  const id = req.params.id;

  database
    .query(
      `UPDATE inventory_categories SET category_name = ? WHERE inventory_categories.id= ?`,
      [category_name, id]
    )
    .then(([category]) => {
      if (!category.affectedRows) {
        res.status(404).send('error happen, please try again!');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const deleteTableInventoryCategory = (req, res) => {
  const id = req.params.id;

  database
    .query(
      'DELETE FROM inventory_categories WHERE inventory_categories.id = ?',
      [id]
    )
    .then(([category]) => {
      if (!category.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(404).send('error deleting the category', err);
    });
};

module.exports = {
  tableDepartments,
  createNewOrder,
  tableOrders,
  tableOrderStatus,
  deleteOrderStatus,
  tableServices,
  deleteOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  orderScheduledDate,
  updateTableServices,
  deleteTableServices,
  createNewService,
  tableInventory,
  tableInvetoryCategories,
  createNewInventory,
  createInventoryCategory,
  updateInventoryCategories,
  deleteTableInventoryCategory,
  updateInventory,
  deleteInventory,
};

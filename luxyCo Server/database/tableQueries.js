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
      `SELECT orders.id, users.username, custumers.first_name, custumers.last_name, custumers.street, status_name, order_date, carpet_pieces,total_price,m2 ,delivery FROM orders
      left join users on orders.user_id = users.id 
      inner join custumers on orders.custumer_id = custumers.id
      inner join order_status on orders.order_status_id = order_status.id
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

module.exports = {
  tableDepartments,
  tableOrders,
  tableOrderStatus,
};

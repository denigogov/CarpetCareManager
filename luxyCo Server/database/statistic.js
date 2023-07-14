const database = require("./database");

const ordersByDay = (_, res) => {
  database
    .query(
      `SELECT all_days.day_of_week, order_count, total_m2
      FROM (
          SELECT 'Monday' AS day_of_week
          UNION SELECT 'Tuesday'
          UNION SELECT 'Wednesday'
          UNION SELECT 'Thursday'
          UNION SELECT 'Friday'
          UNION SELECT 'Saturday'
      ) AS all_days
      LEFT JOIN (
          SELECT DATE_FORMAT(orders.order_date, '%W') AS day_of_week, COUNT(orders.id) AS order_count
          FROM orders
          GROUP BY day_of_week
      ) AS order_counts ON all_days.day_of_week = order_counts.day_of_week
      LEFT JOIN (
          SELECT SUM(order_services.m2) AS total_m2
          FROM orders
          INNER JOIN order_services ON order_services.id = orders.orderService_id
      ) AS total_m2_query ON 1=1;`
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const totalm2 = (_, res) => {
  database
    .query(
      "SELECT SELECT SUM(order_services.m2) as total_m2 FROM orders inner join order_services on order_services.id = orders.orderService_id"
    )
    .then(([m2]) => {
      res.json(m2);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  ordersByDay,
  totalm2,
};

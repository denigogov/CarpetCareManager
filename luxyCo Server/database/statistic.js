const database = require("./database");

const ordersByDay = (_, res) => {
  database
    .query(
      `SELECT
      all_days.day_of_week,
      IFNULL(current_month.order_count, 0) AS current_month_order_count,
      IFNULL(current_month.total_m2, 0) AS current_month_total_m2,
      IFNULL(current_month.total_price, 0) AS current_month_total_price,
      IFNULL(total.order_count, 0) AS total_order_count,
      IFNULL(total.total_m2, 0) AS total_total_m2,
      IFNULL(total.total_price, 0) AS total_total_price
  FROM (
      SELECT 'Monday' AS day_of_week
      UNION SELECT 'Tuesday'
      UNION SELECT 'Wednesday'
      UNION SELECT 'Thursday'
      UNION SELECT 'Friday'
      UNION SELECT 'Saturday'
  ) AS all_days
  INNER JOIN (
      SELECT
          DATE_FORMAT(orders.order_date, '%W') AS day_of_week,
          COUNT(orders.id) AS order_count,
          SUM(order_services.m2) AS total_m2,
          SUM(orders.total_price) AS total_price
      FROM orders
      INNER JOIN order_services ON order_services.id = orders.orderService_id
      WHERE DATE_FORMAT(orders.order_date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m')
      GROUP BY day_of_week
  ) AS current_month ON all_days.day_of_week = current_month.day_of_week
  INNER JOIN (
      SELECT
          DATE_FORMAT(orders.order_date, '%W') AS day_of_week,
          COUNT(orders.id) AS order_count,
          SUM(order_services.m2) AS total_m2,
          SUM(orders.total_price) AS total_price
      FROM orders
      INNER JOIN order_services ON order_services.id = orders.orderService_id
      GROUP BY day_of_week
  ) AS total ON all_days.day_of_week = total.day_of_week;
  `
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  ordersByDay,
};

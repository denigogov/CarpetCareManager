const database = require('./database');

const ordersByDay = (_, res) => {
  database
    .query(
      `SELECT
      DATE_FORMAT(orders.order_date, '%W') AS day_of_week,
      COUNT(*) AS total_orders,
      SUM(order_services.m2) AS total_m2,
      SUM(orders.total_price) AS total_price,
      SUM(CASE WHEN DATE_FORMAT(orders.order_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN 1 ELSE 0 END) AS current_month_orders,
      SUM(CASE WHEN DATE_FORMAT(orders.order_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN order_services.m2 ELSE 0 END) AS current_month_m2,
      SUM(CASE WHEN DATE_FORMAT(orders.order_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN orders.total_price ELSE 0 END) AS current_month_total_price
  FROM orders
  INNER JOIN order_services ON order_services.id = orders.orderService_id
  GROUP BY day_of_week;
  `
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const orderStatByMonth = (_, res) => {
  database
    .query(
      `SELECT
      DATE_FORMAT(orders.order_date, '%M') AS month,
      COUNT(*) AS total_orders,
      SUM(order_services.m2) AS total_m2,
      SUM(orders.total_price) AS total_sales
  FROM orders
  INNER JOIN order_services ON order_services.id = orders.orderService_id
  GROUP BY month
  ORDER BY FIELD(month,
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December')
  `
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const orderStatPerStatus = (_, res) => {
  database
    .query(
      `SELECT
      (SELECT COUNT(*) / COUNT(DISTINCT customer_id) FROM orders) AS average_order_frequency,
      (SELECT AVG(DATEDIFF(last_purchase_date, first_purchase_date)) FROM (SELECT customer_id, MIN(order_date) AS first_purchase_date, MAX(order_date) AS last_purchase_date FROM orders GROUP BY customer_id) AS customer_purchase_dates) AS average_ordering_time,
      order_status_id,
      COUNT(*) AS orders
  FROM
      carpet.orders
  
  GROUP BY
      order_status_id;
  `
    )
    .then(([orderStatus]) => {
      res.json(orderStatus);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const orderStatHourlyPerMonth = (_, res) => {
  database
    .query(
      `SELECT
      all_hours.hour_of_day,
      COUNT(orders.id) AS total_orders
  FROM
      (
          SELECT 0 AS hour_of_day
          UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
          UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
          UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
          UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16
          UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
          UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
      ) AS all_hours
  LEFT JOIN
      orders ON HOUR(orders.order_date) = all_hours.hour_of_day
            AND MONTH(orders.order_date) = MONTH(CURDATE())
            AND YEAR(orders.order_date) = YEAR(CURDATE())
  GROUP BY
      all_hours.hour_of_day
  ORDER BY
      all_hours.hour_of_day;
  `
    )
    .then(([orders]) => {
      res.json(orders);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

module.exports = {
  ordersByDay,
  orderStatByMonth,
  orderStatPerStatus,
  orderStatHourlyPerMonth,
};

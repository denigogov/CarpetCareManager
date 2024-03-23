const { getFromDB } = require('./dbHelpers');

const ordersByDay = async (_, res) => {
  try {
    await getFromDB(
      null,
      res,
      null,
      null,
      `SELECT
      DATE_FORMAT(orders_multiple.order_date, '%W') AS day_of_week,
      COUNT(*) AS total_orders,
      SUM(orders_multiple.m2) AS total_m2,
      SUM(orders_multiple.total_price) AS total_price,
      SUM(CASE WHEN DATE_FORMAT(orders_multiple.order_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN 1 ELSE 0 END) AS current_month_orders,
      SUM(CASE WHEN DATE_FORMAT(orders_multiple.order_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN orders_multiple.m2 ELSE 0 END) AS current_month_m2,
      SUM(CASE WHEN DATE_FORMAT(orders_multiple.order_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN orders_multiple.total_price ELSE 0 END) AS current_month_total_price
    FROM orders_multiple
    GROUP BY day_of_week
    ORDER BY CASE
      WHEN day_of_week = 'Monday' THEN 1
      WHEN day_of_week = 'Tuesday' THEN 2
      WHEN day_of_week = 'Wednesday' THEN 3
      WHEN day_of_week = 'Thursday' THEN 4
      WHEN day_of_week = 'Friday' THEN 5
      WHEN day_of_week = 'Saturday' THEN 6
      WHEN day_of_week = 'Sunday' THEN 7
      ELSE 8  
    END;
  `,
      'Retrieving Orders By Day Error'
    );
  } catch (err) {
    console.error(error);
    res.status(500).send('Database Query Error');
  }
};

const orderStatByMonth = async (_, res) => {
  try {
    await getFromDB(
      null,
      res,
      null,
      null,
      `SELECT
    DATE_FORMAT(orders_multiple.order_date, '%M') AS month,
    COUNT(*) AS total_orders,
    SUM(orders_multiple.m2) AS total_m2,
    SUM(orders_multiple.total_price) AS total_sales
    FROM orders_multiple
    GROUP BY month
    ORDER BY FIELD(month,
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December')`,
      'Retrieving Order Statistic by Month Error'
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Query Error');
  }
};

const orderStatPerStatus = async (_, res) => {
  try {
    await getFromDB(
      null,
      res,
      null,
      null,
      `SELECT
    (SELECT COUNT(*) / COUNT(DISTINCT customer_id) FROM orders_multiple) AS average_order_frequency,
    (SELECT AVG(DATEDIFF(last_purchase_date, first_purchase_date)) FROM (SELECT customer_id, MIN(order_date) AS first_purchase_date, MAX(order_date) AS last_purchase_date FROM orders_multiple GROUP BY customer_id) AS customer_purchase_dates) AS average_ordering_time,
    order_status_id,
    COUNT(*) AS orders
FROM
    orders_multiple

GROUP BY
    order_status_id
`,
      'Retrieving order Statistic Per Status Error'
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Query Error');
  }
};

const orderStatHourlyPerMonth = async (_, res) => {
  try {
    await getFromDB(
      null,
      res,
      null,
      null,
      `SELECT
    all_hours.hour_of_day,
    COUNT(orders_multiple.id) AS total_orders
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
orders_multiple ON HOUR(orders_multiple.order_date) = all_hours.hour_of_day
          AND MONTH(orders_multiple.order_date) = MONTH(CURDATE())
          AND YEAR(orders_multiple.order_date) = YEAR(CURDATE())
GROUP BY
    all_hours.hour_of_day
ORDER BY
    all_hours.hour_of_day;
`,
      'Retrieving Order Statistic by Hour per Month  Error'
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Query Error');
  }
};

module.exports = {
  ordersByDay,
  orderStatByMonth,
  orderStatPerStatus,
  orderStatHourlyPerMonth,
};

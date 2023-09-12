import '../../sass/dashboard/_numericStatsBox.scss';
import NumericStatsView from './NumericStatsView';

const NumericStatsBox = ({ token, statisticOrderByDay }) => {
  console.log(statisticOrderByDay);
  // Data for CHART JS
  const orderStatisticTotal = {
    labels: statisticOrderByDay?.map(label => label.day_of_week),
    datasets: [
      {
        label: 'orders counter per day',
        data: statisticOrderByDay?.map(label => label.total_orders),
        backgroundColor: ['rgba(245, 92, 132)'],
        borderColor: ['rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const orderStatisticByMonth = {
    labels: statisticOrderByDay?.map(label => label.day_of_week),
    datasets: [
      {
        label: 'orders counter per day',
        data: statisticOrderByDay?.map(label => label.current_month_orders),
        backgroundColor: ['rgba(245, 92, 132)'],
        borderColor: ['rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const totalM2monthly = statisticOrderByDay?.reduce(
    (acc, { current_month_m2 }) => acc + +current_month_m2,
    0
  );
  const totalM2Year = statisticOrderByDay?.reduce(
    (acc, { total_m2 }) => acc + +total_m2,
    0
  );

  const totalSalesYear = statisticOrderByDay?.reduce(
    (acc, { total_price }) => acc + +total_price,
    0
  );
  const totalOrderMonthly = statisticOrderByDay?.reduce(
    (acc, { current_month_orders }) => acc + +current_month_orders,
    0
  );
  const totalOrderYear = statisticOrderByDay?.reduce(
    (acc, { total_orders }) => acc + total_orders,
    0
  );
  const totalSalesMonth = statisticOrderByDay?.reduce(
    (acc, { current_month_total_price }) => acc + +current_month_total_price,
    0
  );

  const allStatisticCalculated = [
    {
      totalM2Year: totalM2Year,
      totalOrderYear: totalOrderYear,
      totalSalesYear: totalSalesYear,
      totalM2monthly: totalM2monthly,
      totalOrderMonthly: totalOrderMonthly,
      totalSalesMonth: totalSalesMonth,
    },
  ];

  return (
    <div>
      <NumericStatsView
        token={token}
        chartData={orderStatisticTotal}
        chartData1={orderStatisticByMonth}
        allStatisticCalculated={allStatisticCalculated}
      />
    </div>
  );
};

export default NumericStatsBox;

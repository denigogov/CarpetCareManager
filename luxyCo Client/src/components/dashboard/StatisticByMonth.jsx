import { Line } from 'react-chartjs-2';
// Don't remove it (chart.js/auto), its required to be imported this is how chart.js works
import { Chart as chartjs } from 'chart.js/auto';
import '../../sass/dashboard/_statisticByMonth.scss';

const StatisticByMonth = ({ statisticOrderByMonth }) => {
  const statisticByMonthChart = {
    labels: statisticOrderByMonth.map(title => title.month),
    datasets: [
      {
        data: statisticOrderByMonth.map(data => data.total_orders),
        label: 'Total Orders',
        borderColor: ['rgba(255, 99, 132, 1)'],
        backgroundColor: ['rgba(245, 92, 132)'],
        borderWidth: 1,
        fill: false,
      },

      {
        data: statisticOrderByMonth.map(data => data.total_m2),
        label: 'Total m²',
        borderColor: ['rgba(52, 152, 219, 1)'],
        backgroundColor: ['rgba(52, 152, 219, 1)'],
        borderWidth: 1,
        fill: false,
      },

      {
        data: statisticOrderByMonth.map(data => data.total_sales),
        label: 'Total Sales € ',
        borderColor: ['rgba(46, 204, 113, 1)'],
        backgroundColor: ['rgba(46, 204, 113, 1)'],
        borderWidth: 1,
        fill: false,
      },
    ],
    options: {
      scales: {
        y: {
          stacked: true,
        },
      },
    },
  };

  return (
    <div className="statisticByMonth--wrap">
      <div>
        <p> StatisticByMonth</p>
      </div>
      <div className="perMonthLineChart">
        <Line data={statisticByMonthChart} />
      </div>
    </div>
  );
};

export default StatisticByMonth;

import { Line } from "react-chartjs-2";
// Don't remove it (chart.js/auto), its required to be imported this is how chart.js works
import { Chart as chartjs } from "chart.js/auto";
import "../../sass/dashboard/_customerOrderStat.scss";
const HoursStatisticChart = ({ statisticOrderByHour }) => {
  // Taking out only the name of the month for the line chart
  const monthName = new Intl.DateTimeFormat(new Date(), {
    month: "long",
  }).format(new Date());

  const statisticByMonthChart = {
    labels: statisticOrderByHour.map((hour) => hour.hour_of_day),
    datasets: [
      {
        data: statisticOrderByHour.map((hour) => hour.total_orders),
        label: `Orders Per Hour -- ${monthName}`,
        backgroundColor: ["rgba(245, 92, 132)"],
        borderColor: ["rgba(255, 99, 132, 0.6)"],
        borderWidth: 1,
        tension: 0.5,
      },
    ],
  };

  const option = {
    responsive: true,
    // MaintainAspectRation set to false to be able to add scss property
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="perHourChart">
      <Line data={statisticByMonthChart} options={option} />
    </div>
  );
};

export default HoursStatisticChart;

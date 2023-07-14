import "../../sass/dashboard/_numericStatsBox.scss";
import { Line } from "react-chartjs-2";
// Don't remove it (chart.js/auto), its required to be imported this is how chart.js works
import { Chart as chartjs } from "chart.js/auto";

const NumericStatsBox = ({ chartData, totalM2 }) => {
  return (
    <div className="numericStats--wrap">
      <div className="numericStats-box--container">
        <div className="totalM2">
          <p>Total Area</p>
          <p>{totalM2[0]}</p>
        </div>
        <div className="totalSales">
          <p>Total Sales</p>
          <p>10000$</p>
        </div>
        <div className="totalOrders">
          <p>Number of Orders</p>
          <p>150</p>
        </div>
      </div>

      <div className="numerStats--chart">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default NumericStatsBox;

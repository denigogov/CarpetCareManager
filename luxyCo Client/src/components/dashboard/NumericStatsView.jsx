import '../../sass/dashboard/_numericStatsBox.scss';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
// Don't remove it (chart.js/auto), its required to be imported this is how chart.js works
import { Chart as chartjs } from 'chart.js/auto';

const NumericStatsView = ({
  chartData,
  chartData1,
  allStatisticCalculated,
}) => {
  const [selectedOption, setSelectedOption] = useState('MonthlyStats');

  return (
    <div className="numericStats--wrap">
      <div className="numericStats-box--container">
        <div>
          <p className="total--subtitle-value">Period</p>
          <select
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            <option value="MonthlyStats">CurrentMonth Insights</option>
            <option value="total">Full-Year Insights</option>
          </select>
        </div>

        <div className="totalM2">
          <p className="total--subtitle-value">Total Area</p>
          <p className="total-subtitle">
            {selectedOption === 'MonthlyStats'
              ? allStatisticCalculated[0].totalM2monthly
              : allStatisticCalculated[0].totalM2Year}{' '}
            m²
          </p>
        </div>

        <div className="totalSales">
          <p className="total--subtitle-value"> Total Sales</p>
          <p className="total-subtitle">
            {selectedOption === 'MonthlyStats'
              ? allStatisticCalculated[0].totalSalesMonth.toFixed(2)
              : allStatisticCalculated[0].totalSalesYear.toFixed(2)}{' '}
            €
          </p>
        </div>

        <div className="totalOrders">
          <p className="total--subtitle-value">Number of Orders</p>
          <p className="total-subtitle">
            {selectedOption === 'MonthlyStats'
              ? allStatisticCalculated[0].totalOrderMonthly
              : allStatisticCalculated[0].totalOrderYear}
          </p>
        </div>
      </div>

      <div className="numerStats--chart">
        {selectedOption === 'MonthlyStats' ? (
          <Line data={chartData1} />
        ) : (
          <Line data={chartData} />
        )}
      </div>
    </div>
  );
};

export default NumericStatsView;

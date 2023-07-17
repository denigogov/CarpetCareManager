import '../../sass/dashboard/_dashboard.scss';
import NumericStatsBox from '../../components/dashboard/NumericStatsBox';
import Calculator from '../../components/dashboard/Calculator';
import {
  fetchOrderStatisticByDay,
  fetchOrderStatisticByHour,
  fetchOrderStatisticByMonth,
  fetchOrderStatisticByStatus,
} from '../../api';
import useSWR, { useSWRConfig } from 'swr';
import StatisticByMonth from '../../components/dashboard/StatisticByMonth';
import StatisticByServices from '../../components/dashboard/CustomerOrderStat';
import HoursStatisticChart from '../../components/dashboard/HoursStatisticChart';
import CustomerOrderStat from '../../components/dashboard/CustomerOrderStat';

const Dashboard = ({ token }) => {
  const {
    data: statisticOrderByDay,
    error: statisticOrderByDayError,
    isLoading: statisticOrderByDayLoading,
  } = useSWR(['statisticOrderByDay', token], () =>
    fetchOrderStatisticByDay(token)
  );

  const {
    data: statisticOrderByMonth,
    error: statisticOrderByMonthError,
    isLoading: statisticOrderByMonthLoading,
  } = useSWR(['statisticOrderByMonth', token], () =>
    fetchOrderStatisticByMonth(token)
  );

  const {
    data: statisticOrderByStatus,
    error: statisticOrderByStatusError,
    isLoading: statisticOrderByStatusLoading,
  } = useSWR(['statisticOrderByStatus', token], () =>
    fetchOrderStatisticByStatus(token)
  );

  const {
    data: statisticOrderByHour,
    error: statisticOrderByHourError,
    isLoading: statisticOrderByHourLoading,
  } = useSWR(['statisticOrderByHour', token], () =>
    fetchOrderStatisticByHour(token)
  );

  if (statisticOrderByDayError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (statisticOrderByHourError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (statisticOrderByMonthError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (statisticOrderByStatusError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (
    statisticOrderByDayLoading ||
    statisticOrderByMonthLoading ||
    statisticOrderByStatusLoading ||
    statisticOrderByHourLoading
  )
    return <h3>loading...</h3>;

  return (
    <div className="dashboard--container">
      {/* showing total orders.... */}
      <div className="numericStats--box">
        <NumericStatsBox
          token={token}
          statisticOrderByDay={statisticOrderByDay}
        />
      </div>

      <div className="calculator">
        <Calculator token={token} />
      </div>
      <div className="statisticByMonth">
        <StatisticByMonth statisticOrderByMonth={statisticOrderByMonth} />
      </div>
      <div className="today-statistic--wrap">
        <CustomerOrderStat statisticOrderByStatus={statisticOrderByStatus} />
        <HoursStatisticChart statisticOrderByHour={statisticOrderByHour} />
      </div>
    </div>
  );
};

export default Dashboard;

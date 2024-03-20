import "../../sass/dashboard/_dashboard.scss";
import NumericStatsBox from "../../components/dashboard/NumericStatsBox";
import Calculator from "../../components/dashboard/Calculator";
import {
  fetchOrderStatisticByDay,
  fetchOrderStatisticByHour,
  fetchOrderStatisticByMonth,
  fetchOrderStatisticByStatus,
} from "../../api";
import useSWR, { useSWRConfig } from "swr";
import StatisticByMonth from "../../components/dashboard/StatisticByMonth";
import StatisticByServices from "../../components/dashboard/CustomerOrderStat";
import HoursStatisticChart from "../../components/dashboard/HoursStatisticChart";
import CustomerOrderStat from "../../components/dashboard/CustomerOrderStat";
import LoadingView from "../../components/LoadingView";
import ErrorDisplayView from "../../components/ErrorDisplayView";
const Dashboard = ({ token }) => {
  const {
    data: statisticOrderByDay,
    error: statisticOrderByDayError,
    isLoading: statisticOrderByDayLoading,
  } = useSWR(["statisticOrderByDay", token], () =>
    fetchOrderStatisticByDay(token)
  );

  const {
    data: statisticOrderByMonth,
    error: statisticOrderByMonthError,
    isLoading: statisticOrderByMonthLoading,
  } = useSWR(["statisticOrderByMonth", token], () =>
    fetchOrderStatisticByMonth(token)
  );

  const {
    data: statisticOrderByStatus,
    error: statisticOrderByStatusError,
    isLoading: statisticOrderByStatusLoading,
  } = useSWR(["statisticOrderByStatus", token], () =>
    fetchOrderStatisticByStatus(token)
  );

  const {
    data: statisticOrderByHour,
    error: statisticOrderByHourError,
    isLoading: statisticOrderByHourLoading,
  } = useSWR(["statisticOrderByHour", token], () =>
    fetchOrderStatisticByHour(token)
  );

  if (
    statisticOrderByDayError ||
    statisticOrderByHourError ||
    statisticOrderByMonthError ||
    statisticOrderByStatusError
  )
    return (
      <ErrorDisplayView
        errorMessage={"faild to fetch"}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );

  if (
    statisticOrderByDayLoading ||
    statisticOrderByMonthLoading ||
    statisticOrderByStatusLoading ||
    statisticOrderByHourLoading
  )
    return <LoadingView />;

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

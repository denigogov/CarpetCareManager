import useSWR, { useSWRConfig } from 'swr';
import NumericStatsBox from '../../components/dashboard/NumericStatsBox';
import { fetchOrderStatisticByDay } from '../../api';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import LoadingView from '../../components/LoadingView';
import { useAuth } from '../../helpers/Auth';

const Analytics = () => {
  const { token } = useAuth();
  const {
    data: statisticOrderByDay,
    error: statisticOrderByDayError,
    isLoading: statisticOrderByDayLoading,
  } = useSWR(['statisticOrderByDayTEST', token], () =>
    fetchOrderStatisticByDay(token)
  );

  if (statisticOrderByDayError)
    <ErrorDisplayView
      errorMessage={'faild to fetch'}
      navigateTo1="/dashboard"
      navigateTo2="/order"
    />;

  if (statisticOrderByDayLoading) return <LoadingView />;
  return (
    <div>
      <div className="numericStats--box">
        <NumericStatsBox statisticOrderByDay={statisticOrderByDay} />
      </div>
    </div>
  );
};

export default Analytics;

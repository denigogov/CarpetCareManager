import LoadingView from '../../components/LoadingView';
import '../../sass/delivery/_delivery.scss';
import ScanOrder from '../../components/delivery/ScanOrder';
import SearchOrderNav from '../../components/delivery/SearchOrderNav';
import SearchOrderView from '../../components/delivery/SearchOrderView';
import useSWR from 'swr';
import { fetchOrderStatus, fetchOrdersBySchedueledDate } from '../../api';
import { useState } from 'react';

const Delivery = ({ token }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchByStatus, setSearchByStatus] = useState('all');
  const [inputSearchValue, setInputSearchValue] = useState('');

  const formattedDateLocal = date => {
    if (!date || !(date instanceof Date)) {
      return '';
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  };

  // Fetching the orderStatus!
  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(['orderStatus', token], () => fetchOrderStatus(token));

  const {
    data: ordersBySchedueledDate,
    error: ordersBySchedueledDateError,
    isLoading: ordersBySchedueledDateLoading,
  } = useSWR(['ordersByScheduledDate', token, startDate, endDate], () =>
    fetchOrdersBySchedueledDate(
      formattedDateLocal(startDate),
      formattedDateLocal(endDate),
      token
    )
  );

  if (ordersBySchedueledDateError || orderStatusError)
    return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (ordersBySchedueledDateLoading || orderStatusLoading)
    return <LoadingView />;

  console.log(ordersBySchedueledDate);

  return (
    <div className="delivery--container">
      <div className="delivery__container--scan">
        <div className="delivery--scan">
          <ScanOrder token={token} orderStatus={orderStatus} />
        </div>

        <div>something else</div>
      </div>
      <div className="searchOrderNav">
        <SearchOrderNav
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          endDate={endDate}
          orderStatus={orderStatus}
          setSearchByStatus={setSearchByStatus}
          setInputSearchValue={setInputSearchValue}
        />
        <SearchOrderView
          ordersBySchedueledDate={ordersBySchedueledDate}
          searchByStatus={searchByStatus}
          inputSearchValue={inputSearchValue}
        />
      </div>
    </div>
  );
};

export default Delivery;

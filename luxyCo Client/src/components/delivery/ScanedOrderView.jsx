import '../../sass/delivery/scanedOrderView.scss';
import useSWR, { useSWRConfig } from 'swr';
import LoadingView from '../LoadingView';
import { useRef, useState } from 'react';

const ScanedOrderView = ({ fetchedOrderById, token }) => {
  const [orderStatusId, setOrderStatusId] = useState(null);
  const [error, setError] = useState('');
  const [updateSuccessful, setUpdateSuccessful] = useState('');

  // fn to transform the date time
  const formatedDate = dateToTransform => {
    return new Date(new Date(dateToTransform))
      .toISOString()
      .replaceAll('-', '.')
      .replace('T', ' ');
  };

  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(['orderStatus', token]);

  if (orderStatusError) return <h6>{error.message}</h6>;
  if (orderStatusLoading) return <LoadingView />;

  const filteredStatus = orderStatus.filter(
    status => status.status_name !== fetchedOrderById.status_name
  );

  const handleUpdateStatus = e => {
    const updateOrderStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/table/orderStatus/${fetchedOrderById.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ order_status_id: orderStatusId }),
          }
        );

        console.log(res);

        if (res.ok) {
          setUpdateSuccessful('Order updated. Success!');
          setError('');
        } else {
          throw new Error();
        }
      } catch (error) {
        setError(`Error Updating Order ${error}`);
      }
    };

    updateOrderStatus();
  };

  return (
    <div className="scanedOrderView">
      <div className="orderScan__customer-personalData">
        <p>
          {fetchedOrderById.first_name
            ? `${fetchedOrderById.first_name}  ${fetchedOrderById.last_name}`
            : 'user deleted'}{' '}
        </p>

        <p>
          {fetchedOrderById.street
            ? `${fetchedOrderById.street}  ${fetchedOrderById?.city ?? ''} ${
                fetchedOrderById?.postalCode ?? ''
              }`
            : 'no street added'}
        </p>
      </div>

      <div className="orderScan__wrap">
        <div className="orderScan-detailsLeft">
          <p>
            Order Date:{' '}
            <span>
              {formatedDate(fetchedOrderById.order_date).slice(0, 19)}
            </span>
          </p>

          <p>
            Scheduled Date:{' '}
            <span>
              {' '}
              {formatedDate(fetchedOrderById.scheduled_date).slice(0, 10)}
            </span>
          </p>
          <p>
            Delivery: <span>{fetchedOrderById.delivery ? 'Yes' : 'No'}</span>
          </p>

          <p>
            Order Status:
            <span>
              {' '}
              <select onChange={e => setOrderStatusId(e.target.value)}>
                <option value={fetchedOrderById.order_status_id}>
                  {fetchedOrderById.status_name}
                </option>
                {filteredStatus.map((status, i) => {
                  return (
                    <option key={i} value={status.id}>
                      {status.status_name}
                    </option>
                  );
                })}
              </select>
            </span>
          </p>
        </div>

        <div className="orderScan-detailsRight">
          <p>
            m²: <span> {fetchedOrderById?.m2 ?? 'no size added'}</span>
          </p>
          <p>
            Pieces: <span>{fetchedOrderById?.pieces ?? 'no pieces added'}</span>
          </p>
          <p>
            Price:{' '}
            <span>{fetchedOrderById?.total_price ?? 'no price added'} €</span>
          </p>
          {orderStatusId && <button onClick={handleUpdateStatus}>save</button>}
        </div>
      </div>
      <p className="errorMessage">{error}</p>
      <p className="successfulMessage">{updateSuccessful}</p>
    </div>
  );
};

export default ScanedOrderView;

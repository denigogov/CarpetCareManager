import { useLoaderData } from 'react-router-dom';
import '../../sass/order/_editOrder.scss';
import useSWR, { useSWRConfig } from 'swr';

import { useEffect, useRef, useState } from 'react';
import EditOrderOwnerView from '../../components/order/EditOrderOwnerView';
import EditOrderUserView from '../../components/order/EditOrderUserView';
import ApiSendRequestMessage from '../../components/ApiSendRequestMessage';
import { handlePostPutDeleteRequest } from '../../handleRequests';

const EditOrder = ({ token, userInfo }) => {
  const fetchOrderById = useLoaderData(token);
  const { mutate } = useSWRConfig();
  const [error, setError] = useState('');
  const [updateSuccessful, setUpdateSuccessful] = useState('');

  const orderStatusRef = useRef(null);
  const totalPriceRef = useRef();
  const m2Ref = useRef(null);
  const deliveryRef = useRef(null);
  const piecesRef = useRef(null);
  const orderUpdateDataRef = useRef(null);

  useEffect(() => {
    if (updateSuccessful) {
      const timer = setTimeout(() => {
        setUpdateSuccessful('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccessful]);

  const formatedDate = new Date(
    new Date(fetchOrderById.scheduled_date).getTime()
  )
    .toISOString()
    .slice(0, 10);

  // set user to be able to select date min. today
  const today = new Date().toISOString().split('T')[0];

  // In case we don't update the scheduled date
  const [scheduledDate, setScheduleDate] = useState(formatedDate);

  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(['orderStatus', token]);

  if (orderStatusError) return <h6>{error.message}</h6>;
  if (orderStatusLoading) return <h3>loading...</h3>;

  // Removing the status which is the same as the current one!!
  const orderStatusConfig = orderStatus.filter(
    status => status.status_name !== fetchOrderById.status_name
  );

  const handleUpdateUser = e => {
    e.preventDefault();

    const updatedData = {
      // combine chaining operator and nullish coalescing setting default data if there is no value ... we need this because of the component EditOrderUserView only owner can update some of the values
      total_price: totalPriceRef.current?.value ?? fetchOrderById.total_price,
      m2: m2Ref.current?.value ?? fetchOrderById.m2,
      delivery: deliveryRef.current?.value ?? fetchOrderById.delivery,

      pieces: piecesRef.current.value,
      scheduled_date: scheduledDate,
      order_status_id: orderStatusRef.current.value,
    };

    orderUpdateDataRef.current = updatedData;

    handlePostPutDeleteRequest(
      '/table/orders/',
      fetchOrderById.id,
      'PUT',
      token,
      orderUpdateDataRef.current,
      'Error Updating Order',
      setError,
      setUpdateSuccessful,
      mutate,
      'http://localhost:4000/http://localhost:4000/table/orders',
      'Order updated.'
    );
  };

  return (
    <div className="editOrderContainer">
      <p>Update Order</p>
      <p className="customerSubtitle--name">
        Order ID: <span style={{ fontWeight: '600' }}>{fetchOrderById.id}</span>
      </p>

      <div
        className="editOrder--wrap"
        style={{
          gridTemplateColumns: userInfo.department === 2 ? '1fr 1fr' : '1fr',
        }}
      >
        <div>
          <EditOrderUserView
            fetchOrderById={fetchOrderById}
            orderStatusConfig={orderStatusConfig}
            setScheduleDate={setScheduleDate}
            orderStatusRef={orderStatusRef}
            piecesRef={piecesRef}
            formatedDate={formatedDate}
            today={today}
          />
        </div>

        <div className="editOrder--ownerView">
          {userInfo.department === 2 && (
            <EditOrderOwnerView
              fetchOrderById={fetchOrderById}
              totalPriceRef={totalPriceRef}
              deliveryRef={deliveryRef}
              m2Ref={m2Ref}
            />
          )}
        </div>
      </div>
      <button type="submit" onClick={handleUpdateUser}>
        update order
      </button>

      <ApiSendRequestMessage success={updateSuccessful} errorMessage={error} />
    </div>
  );
};

export default EditOrder;

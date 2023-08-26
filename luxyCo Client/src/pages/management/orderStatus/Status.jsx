import useSWR, { useSWRConfig } from 'swr';
import OrderStatusView from '../../../components/management/orderStatus/OrderStatusView';
import { useState } from 'react';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';

const OrderStatus = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: errorStatusLoading,
  } = useSWR(['tableOrderService', token]);

  const { mutate } = useSWRConfig();

  const handleEditRequest = e => {};

  const handleDeleteRequest = async e => {
    const confirmDelete = confirm(
      `Please confirm if you want to delete this status "${e.status_name}"`
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `http://localhost:4000/table/orderStatus/${e.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          mutate(['tableOrderService', token]);
          setSuccess('service deleted');
          setErrorMessage('');
        } else {
          throw new Error();
        }
      } catch (error) {
        setErrorMessage(`delete faild ${error}`);
      }
    }
  };

  return (
    <div>
      <OrderStatusView
        orderStatusData={orderStatus}
        handleEditRequest={handleEditRequest}
        handleDeleteRequest={handleDeleteRequest}
      />

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default OrderStatus;

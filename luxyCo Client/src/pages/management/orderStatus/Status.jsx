import useSWR, { useSWRConfig } from 'swr';
import OrderStatusView from '../../../components/management/orderStatus/OrderStatusView';
import { useEffect, useState } from 'react';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';
import ErrorDisplayView from '../../../components/ErrorDisplayView';
import LoadingView from '../../../components/LoadingView';
import { handlePostPutDeleteRequest } from '../../../handleRequests';

const OrderStatus = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const { mutate } = useSWRConfig();
  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: errorStatusLoading,
  } = useSWR(['tableOrderService', token]);

  if (orderStatusError)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/delivery"
      />
    );
  if (errorStatusLoading) return <LoadingView />;

  const handleUpdateBtn = async e => {
    const confirmUpdate = confirm(
      `Please confirm if you want to update this status "${e.status_name}"`
    );
    if (confirmUpdate) {
      handlePostPutDeleteRequest(
        '/table/orderStatusTable/',
        e.id,
        'PUT',
        token,
        { status_name: updatedStatus },
        'update faild',
        setErrorMessage,
        setSuccess,
        mutate,
        'tableOrderService',
        'service updated'
      );
    }
  };

  const handleDeleteRequest = async e => {
    const confirmDelete = confirm(
      `Please confirm if you want to delete this status "${e.status_name}"`
    );

    if (confirmDelete) {
      handlePostPutDeleteRequest(
        '/table/orderStatus/',
        e.id,
        'DELETE',
        token,
        null,
        'delete faild',
        setErrorMessage,
        setSuccess,
        mutate,
        'tableOrderService',
        'service deleted'
      );
    }
  };

  return (
    <div>
      <OrderStatusView
        orderStatusData={orderStatus}
        handleDeleteRequest={handleDeleteRequest}
        handleUpdateBtn={handleUpdateBtn}
        setUpdatedStatus={setUpdatedStatus}
      />

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default OrderStatus;

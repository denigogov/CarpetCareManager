import UpdateInventoryView from '../../../components/management/inventory/UpdateInventoryView';
import { useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import ErrorDisplayView from '../../../components/ErrorDisplayView';
import LoadingView from '../../../components/LoadingView';
import { useEffect, useState } from 'react';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';
import { handlePostPutDeleteRequest } from '../../../handleRequests';

const UpdateInventory = ({ token }) => {
  const selectedInventoryID = useParams();

  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const { mutate } = useSWRConfig();
  const {
    data: inventory,
    error: inventoryError,
    isLoading: inventoryLoading,
  } = useSWR(['inventory', token]);

  const { data: inventoryCategory } = useSWR(['inventoryCategory', token]);

  if (inventoryError)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );
  if (inventoryLoading) return <LoadingView />;

  const selectedInventoryData = inventory.filter(
    i => i.id === +selectedInventoryID.id
  );

  const filteredInventoryCategory = inventoryCategory.filter(
    i => i.id !== selectedInventoryData[0].category_id
  );

  const updateSend = async sendData => {
    handlePostPutDeleteRequest(
      '/table/inventory/',
      selectedInventoryID.id,
      'PUT',
      token,
      sendData,
      'updating inventory faild, please try again',
      setErrorMessage,
      setSuccess,
      mutate,
      'inventory',
      'inventory updated'
    );
  };

  return (
    <div className="updateInventory-wrap">
      <UpdateInventoryView
        selectedInventoryData={...selectedInventoryData[0]}
        selectedInventoryID={selectedInventoryID}
        inventoryCategory={filteredInventoryCategory}
        formSubmitUpdate={updateSend}
      />

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default UpdateInventory;

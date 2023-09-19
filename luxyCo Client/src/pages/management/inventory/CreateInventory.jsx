import CreateInventoryView from '../../../components/management/inventory/CreateInventoryView';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';
import { handlePostPutDeleteRequest } from '../../../handleRequests';

const CreateInventory = ({ token }) => {
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showQRCode, setShowQRcode] = useState(false);

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const { data: inventoryCategories } = useSWR(['inventoryCategory', token]);

  const handleCreateInventory = async inputData => {
    handlePostPutDeleteRequest(
      '/table/inventory/',
      null,
      'POST',
      token,
      inputData,
      'please try again',
      setErrorMessage,
      setSuccess,
      mutate,
      'inventory',
      'Inventory created!',
      setShowQRcode(true)
    );
  };

  return (
    <div>
      <ApiSendRequestMessage errorMessage={errorMessage} success={success} />
      <CreateInventoryView
        inventoryCategories={inventoryCategories}
        handleCreateInventory={handleCreateInventory}
        showQRCode={showQRCode}
      />
    </div>
  );
};

export default CreateInventory;

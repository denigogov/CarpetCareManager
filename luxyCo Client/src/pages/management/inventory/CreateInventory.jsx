import CreateInventoryView from '../../../components/management/inventory/CreateInventoryView';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';

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
    try {
      const res = await fetch(`http://localhost:4000/table/inventory/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputData),
      });

      if (res.ok) {
        mutate(['inventory', token]);
        setErrorMessage('');
        setSuccess('Inventory created!');
        setShowQRcode(true);
      } else {
        throw new Error('upps');
      }
    } catch (err) {
      setErrorMessage(`${err.message}, please try again`);
    }
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

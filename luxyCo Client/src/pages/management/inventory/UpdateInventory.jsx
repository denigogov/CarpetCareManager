import UpdateInventoryView from '../../../components/management/inventory/UpdateInventoryView';
import { useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import ErrorDisplayView from '../../../components/ErrorDisplayView';
import LoadingView from '../../../components/LoadingView';
import { useEffect, useState } from 'react';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';

const UpdateInventory = ({ token }) => {
  const selectedInventoryID = useParams();

  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [disableForm, setDisableForm] = useState(false);

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
    try {
      const response = await fetch(
        `http://localhost:4000/table/inventory/${selectedInventoryID.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendData),
        }
      );

      if (response.ok) {
        mutate(['inventory', token]);
        setSuccess('inventory updated');
        setErrorMessage('');
        setDisableForm(true);
      } else {
        throw new Error();
      }
    } catch (err) {
      setErrorMessage(`updating inventory faild, please try again, ${err}`);
    }
  };

  return (
    <div>
      <UpdateInventoryView
        selectedInventoryID={selectedInventoryID}
        selectedInventoryData={...selectedInventoryData[0]}
        inventoryCategory={filteredInventoryCategory}
        formSubmitUpdate={updateSend}
        disableForm={disableForm}
      />

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default UpdateInventory;

import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import LoadingView from '../../components/LoadingView';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import PriceView from '../../components/management/price/PriceView';

const Price = ({ token }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteService, setDeleteService] = useState(null);

  const { mutate } = useSWRConfig();

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['tableServices', token]);

  // POST REQUEST
  const handleUpdateOrder = async () => {
    const sendUpdate = {
      service_name: serviceName,
      service_price: servicePrice,
    };

    const confirmDelete = confirm(
      `Please confirm if you want to update this service ${selectedService.service_name}.`
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `http://localhost:4000/table/services/${selectedService.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendUpdate),
          }
        );

        if (res.ok) {
          mutate(`http://localhost:4000/table/services`);
          setSuccess('service updated');
          setErrorMessage('');
        } else {
          throw new Error();
        }
      } catch (error) {
        setErrorMessage(`update faild, please try again ${error}`);
      }
    }
  };

  // DELETE REQUEST
  const handleDeleteService = async () => {
    const confirmDelete = confirm(
      `Please confirm if you want to delete this service ${deleteService.service_name}.`
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `http://localhost:4000/table/services/${deleteService.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          mutate(`http://localhost:4000/table/services`);
          setSuccess('service deleted'), setErrorMessage('');
        } else {
          throw new Error();
        }
      } catch (error) {
        setErrorMessage(`delete faild ${error}`);
      }
    }
  };

  if (servicesError)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );
  if (servicesLoading) return <LoadingView />;

  return (
    <div>
      <PriceView
        handleUpdateOrder={handleUpdateOrder}
        tableServices={services}
        setSelectedService={setSelectedService}
        setServiceName={setServiceName}
        setServicePrice={setServicePrice}
        errorMessage={errorMessage}
        success={success}
        setSuccess={setSuccess}
        setDeleteService={setDeleteService}
        handleDeleteService={handleDeleteService}
      />
    </div>
  );
};

export default Price;

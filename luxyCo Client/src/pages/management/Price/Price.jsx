import useSWR, { useSWRConfig } from 'swr';
import { useEffect, useState } from 'react';
import LoadingView from '../../../components/LoadingView';
import ErrorDisplayView from '../../../components/ErrorDisplayView';
import PriceView from '../../../components/management/price/PriceView';
import { handlePostPutDeleteRequest } from '../../../handleRequests';
import { useAuth } from '../../../helpers/Auth';

const BASE_URL = import.meta.env.VITE_API_URL;
const Price = () => {
  const { token } = useAuth();

  const [selectedService, setSelectedService] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

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

    const confirmUpdate = confirm(
      `Please confirm if you want to update this service ${selectedService.service_name}.`
    );

    if (confirmUpdate) {
      handlePostPutDeleteRequest(
        '/table/services/',
        selectedService.id,
        'PUT',
        token,
        sendUpdate,
        'update faild, please try again',
        setErrorMessage,
        setSuccess,
        mutate,
        `${BASE_URL}/table/services`,
        'service updated'
      );
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
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default Price;

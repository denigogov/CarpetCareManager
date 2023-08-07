import useSWR, { useSWRConfig } from 'swr';
import LoadingView from '../../components/LoadingView';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import PriceView from '../../components/management/price/PriceView';
import { useEffect, useState } from 'react';

const Price = ({ token }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState();

  const { mutate } = useSWRConfig();

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['tableServices', token]);

  const handleUpdateOrder = () => {
    const sendUpdate = {
      service_name: serviceName,
      service_price: servicePrice,
    };

    const updateOrderStatus = async () => {
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
          // handle response
        } else {
          throw new Error();
        }
      } catch (error) {
        // setError(`Error Updating Order ${error}`);
        console.error('madafaka');
      }
    };

    updateOrderStatus();
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
      />
    </div>
  );
};

export default Price;

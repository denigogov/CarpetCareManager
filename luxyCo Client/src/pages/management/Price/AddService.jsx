import { useEffect, useState } from 'react';
import CreateServiceView from '../../../components/management/price/CreateServiceView';
import { useSWRConfig } from 'swr';
import { handlePostPutDeleteRequest } from '../../../handleRequests';
import { useAuth } from '../../../helpers/Auth';

export default function AddService() {
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleCreateService = async inputData => {
    handlePostPutDeleteRequest(
      '/table/services/',
      null,
      'POST',
      token,
      inputData,
      'please try again',
      setErrorMessage,
      setSuccess,
      mutate,
      'tableServices',
      'service created!'
    );
  };

  return (
    <div className="addService">
      <CreateServiceView
        handleCreateService={handleCreateService}
        errorMessage={errorMessage}
        success={success}
      />
    </div>
  );
}

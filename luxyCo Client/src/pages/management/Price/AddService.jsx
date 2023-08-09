import { useEffect, useState } from 'react';
import CreateServiceView from '../../../components/management/price/CreateServiceView';
import useSWR, { useSWRConfig } from 'swr';

export default function AddService({ token }) {
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
    try {
      const res = await fetch(`http://localhost:4000/table/services/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputData),
      });

      if (res.ok) {
        mutate(['tableServices', token]);
        setErrorMessage('');
        setSuccess('service created!');
      } else {
        throw new Error();
      }
    } catch (error) {
      setErrorMessage(`${error.message}, please try again`);
    }
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

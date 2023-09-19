import { useEffect, useRef, useState } from 'react';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';
import '../../../sass/management/inventory/_createNewInventoryCategory.scss';
import { useSWRConfig } from 'swr';
import { handlePostPutDeleteRequest } from '../../../handleRequests';
import { useNavigate } from 'react-router-dom';

const CreateNewCategory = ({ token, setPopupOpen }) => {
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const categoryNameRef = useRef(null);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
        navigate('/management/inventory');
        setPopupOpen(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleCategoryRequest = async () => {
    handlePostPutDeleteRequest(
      '/table/inventorycategories/',
      null,
      'POST',
      token,
      {
        category_name: categoryNameRef.current.value,
      },
      'creating new category faild, please try again',
      setErrorMessage,
      setSuccess,
      mutate,
      'inventoryCategory',
      'category created'
    );
  };

  return (
    <div className="createNewCategory">
      {!success && (
        <div className="createNewCategory">
          <p>Create New Category</p>
          <input type="text" ref={categoryNameRef} required />
          <button onClick={handleCategoryRequest}>crete category</button>
        </div>
      )}
      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default CreateNewCategory;

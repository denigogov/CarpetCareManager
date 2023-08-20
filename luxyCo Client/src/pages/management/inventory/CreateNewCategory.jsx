import { useRef, useState } from 'react';
import ApiSendRequestMessage from '../../../components/ApiSendRequestMessage';
import '../../../sass/management/inventory/_createNewInventoryCategory.scss';
import { useSWRConfig } from 'swr';

const CreateNewCategory = ({ token }) => {
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categoryNameRef = useRef(null);
  const { mutate } = useSWRConfig();

  const handleCategoryRequest = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/table/inventorycategories/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category_name: categoryNameRef.current.value,
          }),
        }
      );

      if (res.ok) {
        mutate(['inventoryCategory', token]);
        setSuccess('category created');
        setErrorMessage('');
      } else {
        throw new Error();
      }
    } catch (error) {
      setErrorMessage(`creating new category faild, please try again ${error}`);
    }
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

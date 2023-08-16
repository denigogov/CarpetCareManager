import '../../../sass/management/inventory/_inventoryCategoryView.scss';
import ApiSendRequestMessage from '../../ApiSendRequestMessage';
import deleteUserIcon from '../../../assets/deleteIcon.svg';
import { useRef, useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';

const InventoryCategoryView = ({ inventoryCategories, token }) => {
  const [updateCategory, setUpdateCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  const { mutate } = useSWRConfig();

  const categoryNameRef = useRef(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleUpdateCategory = i => {
    setUpdateCategory(i.id);
  };

  const handleUpdateRequest = async () => {
    setUpdateCategory(false);

    const confirmUpdate = confirm(
      `Please confirm if you want to update this service.`
    );

    if (confirmUpdate) {
      try {
        const res = await fetch(
          ` http://localhost:4000/table/inventorycategories/${updateCategory}`,
          {
            method: 'PUT',
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

  //   DELETE REQUEST
  const handleDeleteRequest = async i => {
    const confirmUpdate = confirm(
      `Please confirm if you want to delete this category ${i.category_name}.`
    );

    if (confirmUpdate) {
      try {
        const res = await fetch(
          ` http://localhost:4000/table/inventorycategories/${i.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          mutate(['inventoryCategory', token]);
          setSuccess('service deleted');
          setErrorMessage('');
        } else {
          throw new Error();
        }
      } catch (error) {
        setErrorMessage(`delete faild, please try again ${error}`);
      }
    }
  };

  return (
    <div className="inventoryCategoryView--container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventoryCategories.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>

              {updateCategory !== i.id ? (
                <td>{i.category_name}</td>
              ) : (
                <td>
                  <input
                    type="text"
                    defaultValue={i.category_name}
                    ref={categoryNameRef}
                  />
                </td>
              )}
              <td>
                {updateCategory !== i.id ? (
                  <button onClick={() => handleUpdateCategory(i)}>edit</button>
                ) : (
                  <button
                    className="updateInventoryCategBtn"
                    onClick={handleUpdateRequest}
                  >
                    update
                  </button>
                )}
              </td>
              <td>
                <img
                  src={deleteUserIcon}
                  alt="delete category icon"
                  onClick={() => handleDeleteRequest(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ApiSendRequestMessage errorMessage={errorMessage} success={success} />
    </div>
  );
};

export default InventoryCategoryView;

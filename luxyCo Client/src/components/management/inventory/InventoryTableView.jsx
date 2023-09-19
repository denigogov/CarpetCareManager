import { useEffect, useState } from 'react';
import '../../../sass/management/inventory/_inventoryTableView.scss';
import editIcon from '../../../assets/updateIcon.svg';
import deleteIcon from '../../../assets/deleteIcon.svg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ApiSendRequestMessage from '../../ApiSendRequestMessage';
import { useSWRConfig } from 'swr';

const InventoryTableView = ({
  inventory,
  formatedDate,
  handleSelectedInventory,
  token,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate } = useSWRConfig();

  const handleClickInventory = i => {
    handleSelectedInventory(i);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  const popupWindow = () => {
    setPopupOpen(e => !e);
    navigate('/management/inventory/');
  };

  const handleDeleteRequest = async i => {
    const confirmMessage = confirm(
      `Please confirm if you want to delete this inventory "${i.article_name}"`
    );

    if (confirmMessage) {
      try {
        const res = await fetch(
          `http://localhost:4000/table/inventory/${i.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          mutate(['inventory', token]);
          setSuccess('service deleted');
          setErrorMessage('');
        } else {
          throw new Error();
        }
      } catch (error) {
        setErrorMessage(`delete faild ${error}`);
      }
    }
  };
  return (
    <div className="inventoryTable">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Location</th>
            <th>Price</th>
            <th>Entry Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(i => (
            <tr key={i.id}>
              <td
                onClick={() => handleClickInventory(i)}
                style={{ cursor: 'pointer' }}
              >
                {i.article_number}
              </td>
              <td>{i?.article_name ?? 'name not provided'}</td>
              <td>{i?.details ?? 'details not provided'}</td>
              <td>{i?.quantity ?? 'quanitiy not provided'}</td>
              <td>{i?.category_name ?? 'category deleted'}</td>
              <td>{i?.location ?? 'location not provided'}</td>
              <td>{i?.price ?? 'price not provided'} €</td>
              <td>{formatedDate(i.date_entry).slice(0, 10)}</td>

              <td onClick={() => setPopupOpen(e => !e)}>
                <Link to={`/management/inventory/updateInventory/${i.id}`}>
                  <img src={editIcon} alt="edit inventory icon" />
                </Link>
              </td>

              <td>
                <img
                  src={deleteIcon}
                  alt="edit inventory icon"
                  onClick={() => handleDeleteRequest(i)}
                />
              </td>
            </tr>
          ))}
          {!inventory.length && (
            <tr>
              <td colSpan="11">No inventory found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp" onClick={e => e.stopPropagation()}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default InventoryTableView;

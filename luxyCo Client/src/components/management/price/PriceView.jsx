import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../../sass/management/price/_priceView.scss';
import useSWR, { useSWRConfig } from 'swr';
import deleteUserIcon from '../../../assets/deleteIcon.svg';
import addIcon from '../../../assets/addIcon.svg';
import ApiSendRequestMessage from '../../ApiSendRequestMessage';
import { handlePostPutDeleteRequest } from '../../../handleRequests';

const PriceView = ({
  token,
  tableServices,
  setSelectedService,
  setServiceName,
  setServicePrice,
  handleUpdateOrder,
  success,
  setSuccess,
  errorMessage,
  setErrorMessage,
}) => {
  const [editService, setEditService] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleEditClick = service => {
    setEditService(service);
    setSelectedService(service);
    // creating as default values!
    setServiceName(service.service_name);
    setServicePrice(service.service_price);
  };

  const handleUpdateClick = () => {
    handleUpdateOrder();
    setEditService(false);
  };

  const handleDeleteClick = async service => {
    if (service.id === 4) {
      setErrorMessage('You cannot delete this service.');
      return;
    }

    const confirmDelete = confirm(
      `Please confirm if you want to delete this service ${service.service_name}.`
    );

    if (confirmDelete) {
      handlePostPutDeleteRequest(
        '/table/services/',
        service.id,
        'DELETE',
        token,
        null,
        'delete faild',
        setErrorMessage,
        setSuccess,
        mutate,
        'tableServices',
        'service deleted'
      );

      // Leave as REFERENCES!

      // try {
      //   const res = await fetch(
      //     `http://localhost:4000/table/services/${service.id}`,
      //     {
      //       method: 'DELETE',
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   if (res.ok) {
      //     mutate(['tableServices', token]);
      //     setSuccess('service deleted');
      //     setErrorMessage('');
      //   } else {
      //     throw new Error();
      //   }
      // } catch (error) {
      //   setErrorMessage(`delete faild ${error}`);
      // }
    }
  };

  // Event handler stop bubbling
  const preventPropagation = event => {
    event.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen(x => !x);
    navigate('/management/price');
  };

  return (
    <div className="priceTable">
      <table>
        <thead>
          <tr>
            <th>
              <Link
                style={{ color: 'black' }}
                to={`/management/price/addService/`}
                onClick={() => setPopupOpen(x => !x)}
              >
                <img src={addIcon} alt="plus icon" /> add service
              </Link>
            </th>

            <th>service name</th>
            <th>service price</th>
            <th>update</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {tableServices.map((service, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {editService === service ? (
                  <input
                    type="text"
                    defaultValue={service.service_name}
                    onChange={e => {
                      setServiceName(e.target.value);
                    }}
                  />
                ) : (
                  service.service_name
                )}
              </td>
              <td>
                {editService === service ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={service.service_price}
                    onChange={e => {
                      setServicePrice(e.target.value);
                    }}
                  />
                ) : (
                  `${service.service_price} €`
                )}
              </td>
              <td>
                {editService === service ? (
                  <button className="updateBtn" onClick={handleUpdateClick}>
                    update
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(service)}>edit</button>
                )}
              </td>

              <td>
                <img
                  src={deleteUserIcon}
                  alt="delete service icon"
                  onClick={() => handleDeleteClick(service)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ApiSendRequestMessage errorMessage={errorMessage} success={success} />

      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp smallPopup" onClick={preventPropagation}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default PriceView;

import { useEffect, useState } from 'react';
import '../../../sass/management/price/_priceView.scss';
import deleteUserIcon from '../../../assets/deleteIcon.svg';

const PriceView = ({
  tableServices,
  setSelectedService,
  setServiceName,
  setServicePrice,
  handleUpdateOrder,
  success,
  errorMessage,
  setSuccess,
  setDeleteService,
  handleDeleteService,
}) => {
  const [editService, setEditService] = useState(false);

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

  const handleDeleteClick = service => {
    handleDeleteService();
    setDeleteService(service);
  };

  return (
    <div className="priceTable">
      <table>
        <thead>
          <tr>
            <th>service name</th>
            <th>service price</th>
            <th>update</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {tableServices.map((service, i) => (
            <tr key={i}>
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
                  service.service_price
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

      <div className="showMessage">
        {errorMessage && (
          <p className="errorMessage error">
            <strong>Warning !</strong> {errorMessage}
          </p>
        )}
        {success && (
          <p className="successfulMessage success">
            <strong>Success !</strong> {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceView;

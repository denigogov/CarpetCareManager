import { useState } from 'react';
import '../../../sass/management/price/_priceView.scss';

const PriceView = ({
  tableServices,
  setSelectedService,
  setServiceName,
  setServicePrice,
  handleUpdateOrder,
}) => {
  const [editService, setEditService] = useState(false);

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
                  <button onClick={handleUpdateClick}>update</button>
                ) : (
                  <button onClick={() => handleEditClick(service)}>edit</button>
                )}
              </td>
              <td>remove</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceView;

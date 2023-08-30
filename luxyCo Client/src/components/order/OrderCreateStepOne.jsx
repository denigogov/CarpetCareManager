import { useRef, useState } from 'react';
import '../../sass/order/_orderCreateStepOne.scss';

const OrderCreate = ({ services, setm2, setServiceTypeId, setPieces }) => {
  const takePiecesRef = useRef(null);

  const filteredServices = services.filter(service => service.id !== 4);

  const selectService = e => {
    const selectedService = JSON.parse(e.target.value);
    setServiceTypeId(selectedService.id);
  };

  return (
    <div className="OrderCreateStepOne">
      <form className="orderInput--wrap">
        <select onChange={selectService}>
          <option value="">Service Type</option>
          {filteredServices.map(service => (
            <option value={JSON.stringify(service)} key={service.id}>
              {service.service_name}
            </option>
          ))}
        </select>

        <input
          required
          placeholder="carpet size in m²"
          type="number"
          min="0"
          onChange={e => setm2(e.target.value)}
        />

        <input
          required
          type="number"
          min="0"
          onChange={e => setPieces(e.target.value)}
          placeholder="add carpet pieces"
        />
      </form>
    </div>
  );
};

export default OrderCreate;

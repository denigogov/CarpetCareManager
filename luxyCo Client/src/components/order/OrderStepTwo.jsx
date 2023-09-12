import { useRef, useState } from 'react';
import addIcon from '../../assets/addIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import '../../sass/order/_orderCreateStepOne.scss';

const OrderStepTwo = ({
  services,
  data,
  setData,

  setDeliveryPrice,
}) => {
  const filteredServices = services.filter(service => {
    if (service.service_name === 'Delivery') {
      setDeliveryPrice(service.service_price);
      return false; // Excluding the 'Delivery' service from the filteredServices array and setDeliveryPrice for calculte the final total_price
    }

    return true;
  });

  const addProduct = () => {
    setData([...data, { m2: 0, pieces: 0, service_id: '' }]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...data];
    onChangeVal[i][name] = value;

    setData(onChangeVal);
  };

  const handleDelete = i => {
    const deleteValue = [...data];
    deleteValue.splice(i, 1);
    setData(deleteValue);
  };

  const selectService = (e, i) => {
    const selectedService = JSON.parse(e.target.value);

    const serviceId = selectedService.id;
    setData(data => {
      const newData = [...data];
      newData[i].service_id = serviceId;

      return newData;
    });
  };

  return (
    <div className="OrderCreateStepOne">
      <form className="orderInput--wrap">
        <img
          className="clickedAddIcon"
          style={{ width: '30px', cursor: 'pointer' }}
          src={addIcon}
          alt="add new product"
          onClick={addProduct}
        />
        {data.map((arr, i) => (
          <div className="stepOneFlex" key={i}>
            <select
              defaultValue={arr.service_id}
              name="service_id"
              onChange={e => selectService(e, i)}
            >
              <option>Service Type</option>
              {filteredServices.map(service => (
                <option
                  value={JSON.stringify(service)}
                  key={service.id}
                  onChange={handleChange}
                >
                  {service.service_name}
                </option>
              ))}
            </select>

            <input
              required
              placeholder="carpet size in m²"
              type="number"
              min="0"
              name="m2"
              value={arr.m2}
              onChange={e => handleChange(e, i)}
            />

            <input
              required
              type="number"
              min="0"
              name="pieces"
              placeholder="add carpet pieces"
              value={arr.pieces}
              onChange={e => handleChange(e, i)}
            />

            <p className="currentPrice">price: {arr.total_price} €</p>

            <img
              src={deleteIcon}
              alt="test"
              style={{ width: '1.95rem', cursor: 'pointer' }}
              onClick={() => handleDelete(i)}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default OrderStepTwo;

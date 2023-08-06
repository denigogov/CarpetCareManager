import { useState } from 'react';
import { fetchTableServices } from '../../api';
import '../../sass/dashboard/_calculator.scss';
import useSWR, { useSWRConfig } from 'swr';
import LoadingView from '../LoadingView';
import ErrorDisplayView from '../ErrorDisplayView';

const Calculator = ({ token }) => {
  const [selectedService, setSelectedService] = useState(0);
  const [delivery, setDelivery] = useState(false);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['services', token], () => fetchTableServices(token));

  if (servicesError)
    return (
      <ErrorDisplayView
        errorMessage={'torta'}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );
  if (servicesLoading) return <LoadingView />; //I need to add loading component!

  const selectService = e => {
    setSelectedService(JSON.parse(e.target.value));
  };

  const deliveryPrice = services
    .filter(service => {
      return service.service_name === 'Delivery';
    })
    .map(service => service.service_price);

  const totalM2 = length * width;
  const price = totalM2 ? totalM2 * selectedService : 0.0;
  const totalPrice = delivery ? price + +deliveryPrice[0] : price;

  const serviceWithOutDelivery = services.filter(
    service => service.service_name !== 'Delivery'
  );

  return (
    <div className="calculator--container">
      <div className="calculator--title">
        Personalized carpet measurement calculator for seamless accuracy.
      </div>
      <div className="calculator-wrap">
        <form>
          <input
            type="number"
            placeholder="Lenght"
            onChange={e => setLength(e.target.value)}
            min="0"
            step=".01"
          />

          <input
            type="number"
            placeholder="width"
            onChange={e => setWidth(e.target.value)}
            min="0"
            step=".01"
          />

          <select onChange={selectService}>
            <option>Service Type</option>
            {serviceWithOutDelivery.map(service => (
              <option
                value={JSON.stringify(service.service_price)}
                key={service.id}
              >
                {service.service_name}
              </option>
            ))}
          </select>

          <label>
            delivery
            <input
              type="checkbox"
              onChange={e => setDelivery(e.target.checked)}
            />
          </label>
        </form>

        <div className="showPriceCalculator">
          <p className="resultTitle--calculator">total price</p>
          <p className="result--calculator">
            € {Math.trunc(totalPrice)}.
            <span>{(totalPrice % 1).toFixed(2).slice(2)}</span>
          </p>
          <br />

          <p className="resultTitle--calculator">total m²</p>
          <p className="result--calculator">
            {totalM2.toFixed(2)}
            <span> m²</span>
          </p>
        </div>
      </div>
      <div className="calculator--footer">
        {/* Placeholder to add content under calculator! */}
      </div>
    </div>
  );
};

export default Calculator;

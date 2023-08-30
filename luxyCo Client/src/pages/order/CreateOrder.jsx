import { fetchTableCustomers, fetchTableServices } from '../../api';
import useSWR, { useSWRConfig } from 'swr';
import OrderCreateStepOne from '../../components/order/OrderCreateStepOne';
import LoadingView from '../../components/LoadingView';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import { useState } from 'react';
import addIcon from '../../assets/addIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import truckIcon from '../../assets/truck-tick-svgrepo-com.svg';

const CreateOrder = ({ token, userInfo }) => {
  const [m2, setm2] = useState(0);
  const [delivery, setDelivery] = useState(false);
  const [pieces, setPieces] = useState(0);
  const [serviceTypeId, setServiceTypeId] = useState(null);
  const [stepOneComponents, setStepOneComponents] = useState([]);
  const [stepOneData, setStepOneData] = useState([]);

  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useSWR(['customers', token], () => fetchTableCustomers(token), {
    refreshInterval: 1000, // Refresh data every 1 seconds
  });

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['services', token], () => fetchTableServices(token));

  if (customersError)
    return (
      <ErrorDisplayView
        errorMessage={'faild to fetch'}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );

  if (servicesError)
    return (
      <ErrorDisplayView
        errorMessage={'faild to fetch'}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );

  if (customersLoading || servicesLoading) return <LoadingView />; //I need to add loading component!

  // const deliveryPrice = services
  //   .filter(service => service.id === 4)
  //   .map(service => service.service_price);

  // const priceCalculate = servicePrice ? servicePrice * m2 : 0.0;

  // const totalPrice = delivery
  //   ? priceCalculate + +deliveryPrice[0]
  //   : priceCalculate;

  const handleStepOne = e => {
    e.preventDefault();

    console.log(stepOneData);
  };

  const addProduct = () => {
    const newData = { m2, pieces, serviceTypeId };
    setStepOneData([...stepOneData, newData]);

    const newComponent = (
      <OrderCreateStepOne
        services={services}
        setm2={setm2}
        setServiceTypeId={setServiceTypeId}
        setPieces={setPieces}
      />
    );

    setStepOneComponents([...stepOneComponents, newComponent]);
  };

  // BUGBUGBUGBUG
  const removeProduct = id => {
    const updatedComponents = stepOneComponents.filter(
      component => component.key !== id
    );
    setStepOneComponents(updatedComponents);

    const updatedData = stepOneData.filter(data => data.id !== id);
    setStepOneData(updatedData);
  };

  return (
    <div className="createOrder--container">
      <p className="createOrder--title">Create Order</p>
      <div className="createOrder--wrap">
        <div className="stepOne">
          <img
            className="clickedAddIcon"
            onClick={addProduct}
            style={{ width: '30px', cursor: 'pointer' }}
            src={addIcon}
            alt="add new product"
          />

          <OrderCreateStepOne
            services={services}
            setm2={setm2}
            setServiceTypeId={setServiceTypeId}
            setPieces={setPieces}
          />
        </div>
        {stepOneComponents.map((component, i) => (
          <div key={i} className="stepOne">
            {component}
            <button
              onClick={() => removeProduct(component)}
              className="removeProductButton"
            >
              <img
                style={{ width: '27px', cursor: 'pointer' }}
                src={deleteIcon}
                alt="delete product icon"
              />
            </button>
          </div>
        ))}
        <div className="totalPrice">
          <img
            className="deliveryIcon"
            onClick={() => setDelivery(!delivery)}
            src={truckIcon}
            style={
              delivery
                ? {
                    width: '40px',
                    filter:
                      'invert(53%) sepia(91%) saturate(339%) hue-rotate(68deg) brightness(94%) contrast(91%)',
                  }
                : {
                    width: '40px',
                    filter:
                      'invert(13%) sepia(96%) saturate(7483%) hue-rotate(327deg) brightness(85%) contrast(101%)',
                  }
            }
          />
          {/* <p className="totalPriceSum">price: {totalPrice.toFixed(2)} €</p> */}
          <button onClick={handleStepOne} className="stepOneBtn">
            next
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateOrder;

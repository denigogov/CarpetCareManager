import { fetchTableCustomers, fetchTableServices } from '../../api';
import useSWR, { useSWRConfig } from 'swr';
import { format } from 'date-fns';

import LoadingView from '../../components/LoadingView';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import { useEffect, useState } from 'react';

import truckIcon from '../../assets/truck-tick-svgrepo-com.svg';
import OrderStepOne from '../../components/order/OrderStepOne';
import OrderStepTwo from '../../components/order/OrderStepTwo';
import OrderStepThree from '../../components/order/OrderStepThree';
import ApiSendRequestMessage from '../../components/ApiSendRequestMessage';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { handlePostPutDeleteRequest } from '../../handleRequests';

const CreateOrder = ({ token, userInfo }) => {
  const navigate = useNavigate();
  const [setPopupOpen] = useOutletContext();

  const [deliveryPrice, setDeliveryPrice] = useState('');

  const [stepTwo, setStepTwo] = useState(false);
  const [showStepThree, setShowStepThree] = useState(false);
  const [orderSend, setOrderSend] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccessful, setOrderSuccessful] = useState('');

  const [delivery, setDelivery] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [newCustomerID, setNewCustomerID] = useState('');
  const [dateForrmated, setDateForrmated] = useState('');

  const [data, setData] = useState([
    {
      m2: 0,
      pieces: 0,
      service_id: '',
    },
  ]);

  useEffect(() => {
    if (orderSuccessful) {
      const timer = setTimeout(() => {
        setOrderSuccessful('');
        setPopupOpen(false);
        navigate('/order');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccessful]);

  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useSWR(['customers', token], () => fetchTableCustomers(token));

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['services', token], () => fetchTableServices(token));

  if (servicesError || customersError)
    return (
      <ErrorDisplayView
        errorMessage={'faild to fetch'}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );

  if (customersLoading || servicesLoading) return <LoadingView />;

  const updatedData = data.map(item => {
    // matching the ID from all services with current to take out the price and create total_price of the current service !
    const service = services.find(s => s.id === item.service_id);

    return {
      ...item,
      customer_id: selectedUser.id ? +selectedUser.id : +newCustomerID + 1,
      user_id: +userInfo.id,
      delivery: delivery,
      scheduled_date: dateForrmated
        ? dateForrmated
        : format(new Date(), 'yyyy/MM/dd'),
      total_price: service
        ? (service.service_price * item.m2).toFixed(2)
        : '0.00',
    };
  });

  const totalPrice = updatedData
    .map(arr => arr.total_price)
    .reduce((acc, mov) => +acc + +mov, 0);

  const sendOrder = () => {
    const createOrder = () => {
      handlePostPutDeleteRequest(
        '/table/orders',
        null,
        'POST',
        token,
        updatedData,
        'Error creating order',
        setError,
        setOrderSuccessful,
        null,
        null,
        'Order added',
        setOrderSend(true)
      );
    };
    createOrder();
  };

  return (
    <div className="createOrder--container">
      {orderSend || (
        <div>
          <p className="createOrder--title">Create Order</p>
          <div className="createOrder--wrap">
            <OrderStepOne
              customers={customers}
              token={token}
              userInfo={userInfo}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setNewCustomerID={setNewCustomerID}
              setStepTwo={setStepTwo}
            />
            {(stepTwo || selectedUser) && (
              <div
                style={
                  showStepThree
                    ? {
                        transition: 'all 0.4s linear',
                        transform: 'scale(0.8)',
                        marginTop: '-40px',
                      }
                    : { transition: 'all 0.4s linear' }
                }
              >
                <OrderStepTwo
                  services={services}
                  data={updatedData}
                  setData={setData}
                  setDeliveryPrice={setDeliveryPrice}
                />
              </div>
            )}
            {showStepThree && data.length && (
              <OrderStepThree setDateForrmated={setDateForrmated} />
            )}
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
              <p className="totalPriceSum">
                price:{' '}
                {delivery
                  ? (totalPrice + +deliveryPrice).toFixed(2)
                  : totalPrice.toFixed(2)}
                €
              </p>

              {showStepThree || (
                <div>
                  {(stepTwo || selectedUser) && (
                    <button
                      className="stepOneBtn"
                      onClick={() => setShowStepThree(true)}
                    >
                      next
                    </button>
                  )}
                </div>
              )}

              {showStepThree && (
                <div>
                  <button onClick={sendOrder} className="sendOrderBtn">
                    create order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ApiSendRequestMessage success={orderSuccessful} errorMessage={error} />
    </div>
  );
};
export default CreateOrder;

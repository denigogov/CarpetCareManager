import { Outlet, NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

import addIcon from '../../assets/addIcon.svg';
import calendarIcon from '../../assets/calendarIcon.svg';
import '../../sass/order/_order.scss';

import OrderView from '../../components/order/OrderView';
import useSWR, { useSWRConfig } from 'swr';
import { fetchOrdersByDate, fetchOrderStatus } from '../../api';
import SelectedOrderInfo from '../../components/order/SelectedOrderInfo';
import LoadingView from '../../components/LoadingView';

const Order = ({ token, userInfo }) => {
  const [wishDate, setWishDate] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState('all');
  const [searchOrder, setSearchOrder] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);

  // selected order RENDER THE ORDER INFO !! STILL IN PROGRESS SOME FIELDS NEED TO BE REMOVE FROM THE TABLE AND TO BE ADDED IN SELECTED ORDER INFO
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const formattedDate = format(wishDate, 'yyyy-MM-dd');

  const {
    data: orderStatusData,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(['orderStatus', token], () => fetchOrderStatus(token));

  // RENDER ALL DATA BY DATE!! I added data to be refresh every 5 secound for the user to be able to see all updates in real time and not skipping order
  const { data, error, isLoading } = useSWR(
    [formattedDate, token],
    () => fetchOrdersByDate(formattedDate, token),
    {
      refreshInterval: 5000, // Refresh data every 5 seconds
    }
  );

  if (error) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (orderStatusError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (isLoading || orderStatusLoading) return <LoadingView />; //I need to add loading component!

  const selectOptions = e => {
    setOrderStatus(e.target.value);
  };

  const popupWindow = () => {
    setPopupOpen(x => !x);
    navigate('/order');
  };

  const preventPropagation = e => {
    e.stopPropagation();
  };

  const handleSelectedOrder = data => {
    setSelectedOrder(data);
  };

  const handleDeleteOrder = id => {
    const deleteOrder = async () => {
      try {
        const confirmDelete = confirm(
          `Please confirm if you want to delete this order with ID ${id} all data from this order will be permanently deleted!`
        );

        if (confirmDelete) {
          await fetch(`http://localhost:4000/table/orders/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          mutate('http://localhost:4000/table/orders');
        }
      } catch (error) {
        console.error('Error deleting order', error);
      }
    };
    deleteOrder();
  };

  return (
    <div className="order">
      <nav className="createOrder--nav">
        <ul>
          <NavLink to="createOrder" onClick={() => setPopupOpen(x => !x)}>
            <li>
              <img
                src={addIcon}
                alt="add new order img"
                style={{ width: '35px' }}
              />
              <p>add order</p>
            </li>
          </NavLink>

          <li>
            <input
              type="search"
              placeholder="search for order "
              className="orderSearchInput"
              onChange={e => setSearchOrder(e.target.value)}
            />
          </li>

          <li>
            <img src={calendarIcon} alt="calendar icon" />
            <DatePicker
              selected={wishDate}
              onChange={setWishDate}
              closeOnScroll={true}
            />
          </li>

          <li>
            <select>
              <option value="">order by period</option>
              <option value="">week</option>
              <option value="">month</option>
            </select>
          </li>

          <li>
            <select onChange={selectOptions}>
              <option value="all">order by status</option>
              <option defaultValue="all">all</option>
              {orderStatusData.map(status => {
                return <option key={status.id}>{status.status_name}</option>;
              })}
            </select>
          </li>
        </ul>
      </nav>

      <div className="orderView">
        <OrderView
          data={data}
          orderStatus={orderStatus}
          searchOrder={searchOrder}
          handleSelectedOrder={handleSelectedOrder}
          userInfo={userInfo}
          handleDeleteOrder={handleDeleteOrder}
          setPopupOpen={setPopupOpen}
        />
        {selectedOrder && <SelectedOrderInfo selectedOrder={selectedOrder} />}
      </div>
      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp" onClick={preventPropagation}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default Order;

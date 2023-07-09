import { Outlet, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import addIcon from "../../assets/addIcon.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import "../../sass/order/_order.scss";

import OrderView from "../../components/order/OrderView";
import useSWR, { useSWRConfig } from "swr";
import { fetchOrdersByDate, fetchOrderStatus } from "../../api";
import SelectedOrderInfo from "../../components/order/SelectedOrderInfo";

const Order = ({ token }) => {
  const [wishDate, setWishDate] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState("all");
  const [searchOrder, setSearchOrder] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  // Time calc. because with toISOString I'm couple of hours behind !!
  // const timezoneOffset = wishDate.getTimezoneOffset() * 60000;
  // const adjustedDate = new Date(wishDate.getTime() - timezoneOffset);
  // const formattedDate = adjustedDate.toISOString().slice(0, 10);

  const formattedDate = format(wishDate, "yyyy-MM-dd");

  const {
    data: orderStatusData,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(["orderStatus", token], () => fetchOrderStatus(token));

  // RENDER ALL DATA BY DATE!!
  const { data, error, isLoading } = useSWR(
    [formattedDate, token],
    () => fetchOrdersByDate(formattedDate, token),
    {
      refreshInterval: 5000, // Refresh data every 5 seconds
    }
  );

  if (error) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (orderStatusError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (isLoading || orderStatusLoading) return <h3>loading...</h3>; //I need to add loading component!

  const selectOptions = (e) => {
    setOrderStatus(e.target.value);
  };

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigate("/order");
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSelectedOrder = (data) => {
    setSelectedOrder(data);
  };

  return (
    <div className="order">
      <nav className="createOrder--nav">
        <ul>
          <NavLink to="createOrder" onClick={() => setPopupOpen((x) => !x)}>
            <li>
              <img
                src={addIcon}
                alt="add new order img"
                style={{ width: "35px" }}
              />
              <p>add order</p>
            </li>
          </NavLink>

          <li>
            <input
              type="search"
              placeholder="search for order "
              className="orderSearchInput"
              onChange={(e) => setSearchOrder(e.target.value)}
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
            <select name="" id="">
              <option value="">order by period</option>
              <option value="">week</option>
              <option value="">month</option>
            </select>
          </li>

          <li>
            <select name="" id="" onChange={selectOptions}>
              <option value="all">order by status</option>
              <option defaultValue="all">all</option>
              {orderStatusData.map((status) => {
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

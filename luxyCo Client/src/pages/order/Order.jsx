import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import addIcon from "../../assets/addIcon.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import "../../sass/order/_order.scss";

import OrderView from "../../components/order/OrderView";
import useSWR, { useSWRConfig } from "swr";
import { fetchOrdersByDate, fetchOrderStatus } from "../../api";
import SelectedOrderInfo from "../../components/order/SelectedOrderInfo";
import LoadingView from "../../components/LoadingView";
import ErrorDisplayView from "../../components/ErrorDisplayView";
import CreateOrder from "./CreateOrder";
import { handlePostPutDeleteRequest } from "../../handleRequests";
import ApiSendRequestMessage from "../../components/ApiSendRequestMessage";

const Order = ({ token, userInfo }) => {
  const [wishDate, setWishDate] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState("all");
  const [searchOrder, setSearchOrder] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  // selected order RENDER THE ORDER INFO !! STILL IN PROGRESS SOME FIELDS NEED TO BE REMOVE FROM THE TABLE AND TO BE ADDED IN SELECTED ORDER INFO
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const formattedDate = format(wishDate, "yyyy-MM-dd");

  const {
    data: orderStatusData,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(["orderStatus", token], () => fetchOrderStatus(token));

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
  if (isLoading || orderStatusLoading) return <LoadingView />; //I need to add loading component!\

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

  const handleDeleteOrder = (id) => {
    const confirmDelete = confirm(
      `Please confirm if you want to delete this order with ID ${id} all data from this order will be permanently deleted!`
    );

    if (confirmDelete) {
      handlePostPutDeleteRequest(
        "/table/orders/",
        id,
        "DELETE",
        token,
        null,
        "Error deleting order",
        setErrorMessage,
        setSuccess,
        mutate,
        "https://carpetcare.onrender.com/table/orders",
        "Order Deleted"
      );
    }
  };

  const togglePopup = () => {
    setPopupOpen((x) => !x);
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
              // closeOnScroll={true}
            />
          </li>

          {/* for the future !  */}
          {/* <li>
            <select>
              <option value="">order by period</option>
              <option value="">week</option>
              <option value="">month</option>
            </select>
          </li> */}

          <li>
            <select onChange={selectOptions}>
              <option value="all">order by status</option>
              <option defaultValue="all">all</option>
              {orderStatusData?.map((status) => {
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
        <ApiSendRequestMessage success={success} errorMessage={errorMessage} />

        {selectedOrder && <SelectedOrderInfo selectedOrder={selectedOrder} />}
      </div>
      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp xlPopUp" onClick={preventPropagation}>
            <Outlet context={[setPopupOpen]} />
          </main>
        </div>
      )}
    </div>
  );
};

export default Order;

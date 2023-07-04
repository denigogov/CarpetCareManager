import { Outlet, NavLink, useLoaderData } from "react-router-dom";
import addIcon from "../../assets/addIcon.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import "../../sass/order/_order.scss";
import OrderView from "../../components/order/OrderView";
import useSWR, { useSWRConfig } from "swr";
import { fetchOrdersByData, fetchOrderStatus } from "../../api";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Order = ({ token }) => {
  const [wishDate, setWishDate] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState("all");
  const [searchOrder, setSearchOrder] = useState("");

  // Time calc. because with toISOString I'm couple of hours behind !!
  const timezoneOffset = wishDate.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(wishDate.getTime() - timezoneOffset);
  const formattedDate = adjustedDate.toISOString().slice(0, 10);

  const {
    data: orderStatusData,
    error: orderStatusError,
    isLoading: orderStatusLoading,
  } = useSWR(["orderStatus", token], () => fetchOrderStatus(token));

  // To Render ERROR ,DATA and WHEN DATA IS LOAD!
  const { data, error, isLoading } = useSWR([formattedDate, token], () =>
    fetchOrdersByData(formattedDate, token)
  );

  if (error) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (orderStatusError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (isLoading || orderStatusLoading) return <h3>loading...</h3>; //I need to add loading component!

  const selectOptions = (e) => {
    setOrderStatus(e.target.value);
  };

  return (
    <div className="order">
      <nav className="createOrder--nav">
        <ul>
          <NavLink to="createOrder">
            <li>
              <img
                src={addIcon}
                alt="add new order img"
                style={{ width: "35px" }}
              />
              add order
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
            <DatePicker selected={wishDate} onChange={setWishDate} />
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
        />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Order;

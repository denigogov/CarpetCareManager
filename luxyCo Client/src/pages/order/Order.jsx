import { Outlet, NavLink, useLoaderData } from "react-router-dom";
import addIcon from "../../assets/addIcon.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import "../../sass/order/_order.scss";
import OrderView from "../../components/order/OrderView";
import useSWR, { useSWRConfig } from "swr";
import { fetchOrdersByData } from "../../api";
import { useState } from "react";

const Order = ({ token }) => {
  const [wishDate, setWishDate] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(wishDate);

  const url = `http://localhost:4000/table/orders?date=${wishDate}`;
  // To Render ERROR ,DATA and WHEN DATA IS LOAD!
  const { data, error, isLoading } = useSWR(url, () =>
    fetchOrdersByData(url, token)
  );

  const inputData = (e) => {
    setWishDate(e.target.value);
  };

  if (error) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (isLoading) return <h3>loading...</h3>; //I need to add loading component!

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
              placeholder="Search Order"
              className="orderSearchInput"
            />
          </li>

          <li>
            <img src={calendarIcon} alt="calendar icon" />
            <input
              type="date"
              defaultValue={formattedDate}
              onChange={inputData}
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
            <select name="" id="">
              <option value="">order by status</option>
              <option value="">in progress</option>
              <option value="">recived ...</option>
            </select>
          </li>
        </ul>
      </nav>

      <div className="orderView">
        <OrderView data={data} />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Order;

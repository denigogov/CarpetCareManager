import { Outlet, NavLink } from "react-router-dom";
import addIcon from "../../assets/addIcon.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import "../../sass/order/_order.scss";
import OrderView from "../../components/order/OrderView";

const Order = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = year + "-" + month + "-" + day;

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
              create order
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
            <input type="date" defaultValue={formattedDate} />
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
        <OrderView />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Order;

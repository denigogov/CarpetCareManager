import { Outlet, NavLink } from "react-router-dom";
import "../../sass/management/_management.scss";
import userTieIcon from "../../assets/userTieIcon.svg";
import analyticsIcon from "../../assets/analyticsIcon.svg";
import expensesIcon from "../../assets/expensesIcon.svg";
import priceIcon from "../../assets/priceIcon.svg";
import inventory from "../../assets/inventory.svg";

const Management = () => {
  return (
    <div className="managment__navbar">
      <div className="managment-container">
        <ul>
          <NavLink to="users" className="navLink">
            users
            <li>
              <img src={userTieIcon} alt="userIcon" />
            </li>
          </NavLink>

          <NavLink to="analytics">
            analytics
            <li>
              <img src={analyticsIcon} alt="analytic icon" />
            </li>
          </NavLink>

          <NavLink to="expenses">
            expenses
            <li>
              <img src={expensesIcon} alt="expenses" />
            </li>
          </NavLink>

          <NavLink to="price">
            price
            <li>
              <img src={priceIcon} alt="priceIcon" />
            </li>
          </NavLink>

          <NavLink to="inventory">
            inventory
            <li>
              <img src={inventory} alt="inventory" />
            </li>
          </NavLink>
        </ul>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Management;

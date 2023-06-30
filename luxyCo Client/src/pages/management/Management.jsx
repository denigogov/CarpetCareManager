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
          <li>
            <NavLink
              to="users"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "activeLink-globaly"
                  : "navLink"
              }
            >
              <img src={userTieIcon} alt="userIcon" />
              users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="analytics"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "activeLink-globaly"
                  : "navLink"
              }
            >
              <img src={analyticsIcon} alt="analytic icon" /> analytics
            </NavLink>
          </li>

          <li>
            <NavLink
              to="expenses"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "activeLink-globaly"
                  : "navLink"
              }
            >
              <img src={expensesIcon} alt="expenses" />
              expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="price"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "activeLink-globaly"
                  : "navLink"
              }
            >
              <img src={priceIcon} alt="priceIcon" /> price
            </NavLink>
          </li>
          <li>
            <NavLink
              to="inventory"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "activeLink-globaly"
                  : "navLink"
              }
            >
              <img src={inventory} alt="inventory" />
              inventory
            </NavLink>
          </li>
        </ul>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Management;

import { Outlet, NavLink } from 'react-router-dom';
import '../../sass/management/_management.scss';
import userTieIcon from '../../assets/userTieIcon.svg';
import analyticsIcon from '../../assets/analyticsIcon.svg';
import expensesIcon from '../../assets/expensesIcon.svg';
import priceIcon from '../../assets/priceIcon.svg';
import inventory from '../../assets/inventory.svg';
import OrderStatusIcon from '../../assets/OrderStatus.svg';

import useSWR from 'swr';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import { fetchOrderStatus, fetchTableServices } from '../../api';
import LoadingView from '../../components/LoadingView';

const Management = ({ token }) => {
  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['tableServices', token], () => fetchTableServices(token));
  const {
    data: orderService,
    error: orderServiceError,
    isLoading: orderServiceLoading,
  } = useSWR(['tableOrderService', token], () => fetchOrderStatus(token));

  if (servicesError || orderServiceError)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );
  if (servicesLoading || orderServiceLoading) return <LoadingView />;

  return (
    <div className="managment__navbar">
      <div className="managment-container">
        <ul>
          <li>
            <NavLink
              to="users"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending'
                  : isActive
                  ? 'activeLink-globaly'
                  : 'navLink'
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
                  ? 'pending'
                  : isActive
                  ? 'activeLink-globaly'
                  : 'navLink'
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
                  ? 'pending'
                  : isActive
                  ? 'activeLink-globaly'
                  : 'navLink'
              }
            >
              <img src={expensesIcon} alt="expenses" />
              expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="orderStatus"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending'
                  : isActive
                  ? 'activeLink-globaly'
                  : 'navLink'
              }
            >
              <img src={OrderStatusIcon} alt="Order status Icon" />
              status
            </NavLink>
          </li>
          <li>
            <NavLink
              to="price"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending'
                  : isActive
                  ? 'activeLink-globaly'
                  : 'navLink'
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
                  ? 'pending'
                  : isActive
                  ? 'activeLink-globaly'
                  : 'navLink'
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

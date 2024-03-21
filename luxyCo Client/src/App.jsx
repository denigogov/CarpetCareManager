import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Login from './pages/Login';
import Root from './pages/Root';

const LazyDashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const LazyDelivery = React.lazy(() => import('./pages/delivery/Delivery'));

// Order Routes
import CreateOrder from './pages/order/CreateOrder';
const Order = React.lazy(() => import('./pages/order/Order'));
const EditOrder = React.lazy(() => import('./pages/order/EditOrder'));

// Contact Router Component
import CreateContact from './pages/contact/CreateContact';
const Contact = React.lazy(() => import('./pages/contact/Contact'));
const EditContact = React.lazy(() => import('./pages/contact/EditContact'));
const DetailsContact = React.lazy(() =>
  import('./pages/contact/DetailsContact')
);

// Managment routes!
const Management = React.lazy(() => import('./pages/management/Management'));
import Analytics from './pages/management/Analytics';
import Expenses from './pages/management/Expenses';

// Price Route
const Price = React.lazy(() => import('./pages/management/Price/Price'));
import AddService from './pages/management/Price/AddService';

// user routes
import CreateUser from './pages/management/CreateUser';
const Users = React.lazy(() => import('./pages/management/Users'));
const DetailsUser = React.lazy(() => import('./pages/management/DetailsUser'));
const EditUser = React.lazy(() => import('./pages/management/EditUser'));

// Inventory Route
const Inventory = React.lazy(() =>
  import('./pages/management/inventory/Inventory')
);
const OrderStatus = React.lazy(() =>
  import('./pages/management/orderStatus/Status')
);
import CreateInventory from './pages/management/inventory/CreateInventory';
import CreateNewCategory from './pages/management/inventory/CreateNewCategory';
import UpdateInventory from './pages/management/inventory/UpdateInventory';
import AddStatus from './pages/management/orderStatus/AddStatus';

import LoadingView from './components/LoadingView';
import ErrorDisplayView from './components/ErrorDisplayView';

import {
  fetchSingleUser,
  fetchTableDepartment,
  fetchTokenValidation,
  fetchSingleCustomer,
  fetchCustomerOrders,
  fetchOrderById,
} from './api';
import { useAuth } from './helpers/Auth';
import { RequireAuth } from './helpers/RequireAuth';
import RootRouter from './RootRouter';

const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (typeof auth.token === 'string' && auth.token.length) {
          const userData = await fetchTokenValidation(auth?.token);

          if (userData) {
            auth.info(userData);
          } else {
            auth.logout();
          }
        } else {
          auth.logout();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [auth.token]);

  return <div>{loading ? <p>loading...</p> : <RootRouter />}</div>;
};

export default App;

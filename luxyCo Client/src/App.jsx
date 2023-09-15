import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
  Navigate,
} from 'react-router-dom';
import useToken from './useToken';
import React, { useEffect, useState } from 'react';

import Login from './pages/Login';
import Root from './pages/Root';

// import Dashboard from './pages/dashboard/Dashboard';
const LazyDashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));

// Order Routes
import Order from './pages/order/Order';
import EditOrder from './pages/order/EditOrder';
import CreateOrder from './pages/order/CreateOrder';

import Delivery from './pages/delivery/Delivery';

// Contact Router Component
import Contact from './pages/contact/Contact';
import CreateContact from './pages/contact/CreateContact';
import EditContact from './pages/contact/EditContact';
import DetailsContact from './pages/contact/DetailsContact';
// Managment routes!
import Management from './pages/management/Management';
import Analytics from './pages/management/Analytics';
import Expenses from './pages/management/Expenses';

// Price Route
import Price from './pages/management/Price/Price';
import AddService from './pages/management/Price/AddService';

// Inventory Route

import Inventory from './pages/management/inventory/Inventory';

// user routes
import Users from './pages/management/Users';
import EditUser from './pages/management/EditUser';
import DetailsUser from './pages/management/DetailsUser';
import CreateUser from './pages/management/CreateUser';

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
import CreateInventory from './pages/management/inventory/CreateInventory';
import CreateNewCategory from './pages/management/inventory/CreateNewCategory';
import UpdateInventory from './pages/management/inventory/UpdateInventory';
import OrderStatus from './pages/management/orderStatus/Status';
import AddStatus from './pages/management/orderStatus/AddStatus';

const App = () => {
  const { token, setToken } = useToken(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const validateToken = async () => {
      if (typeof token === 'string') {
        const userInfos = await fetchTokenValidation(token);

        if (userInfos) setUserInfo(userInfos);
        else setToken('');
      }
    };
    validateToken();
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} setUserInfo={setUserInfo} />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root setToken={setToken} userInfo={userInfo} />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        {/* <Route path="dashboard" element={<Dashboard token={token} />} /> */}
        {/* JUST FOR TESTING PURPOSE IT SHOULD SPEED UP THE APP!!!! NEW NEW NEW  */}
        <Route
          path="dashboard"
          element={
            <React.Suspense fallback={<LoadingView />}>
              <LazyDashboard token={token} />
            </React.Suspense>
          }
        />
        <Route
          path="order"
          element={<Order token={token} userInfo={userInfo} />}
        >
          <Route
            path="createOrder"
            element={<CreateOrder token={token} userInfo={userInfo} />}
          />
          <Route
            path="edit/:id"
            element={<EditOrder token={token} userInfo={userInfo} />}
            loader={({ params }) => fetchOrderById({ params }, token)}
          />
        </Route>
        <Route path="/delivery" element={<Delivery token={token} />} />
        {/* CONTACT ROUTE */}
        <Route path="contact" element={<Contact token={token} />}>
          <Route path="addCustomer" element={<CreateContact token={token} />} />
          <Route
            path="edit/:id"
            element={<EditContact token={token} />}
            loader={({ params }) => fetchSingleCustomer({ params }, token)}
          />

          <Route
            path="details/:id"
            element={<DetailsContact token={token} />}
            loader={({ params }) => fetchCustomerOrders({ params }, token)}
            errorElement={
              // TESTING ERROR ELEMENT TO ADD NAVLINKS
              <ErrorDisplayView
                errorMessage="No Orders found for this user"
                navigateTo1="/dashboard"
                navigateTo2="/order"
              />
            }
          />
        </Route>
        {userInfo.department === 2 && (
          <Route path="management" element={<Management token={token} />}>
            <Route
              path="users"
              element={<Users token={token} userInfo={userInfo} />}
            >
              <Route
                path="edit/:id"
                element={<EditUser token={token} />}
                loader={({ params }) => fetchSingleUser({ params }, token)}
              />
              <Route
                path="details/:id"
                element={<DetailsUser token={token} />}
                loader={({ params }) => fetchSingleUser({ params }, token)}
              />
              <Route path="addUser" element={<CreateUser token={token} />} />
            </Route>

            <Route path="analytics" element={<Analytics token={token} />} />
            <Route path="expenses" element={<Expenses />} />

            <Route path="price" element={<Price token={token} />}>
              <Route path="addService" element={<AddService token={token} />} />
            </Route>
            <Route path="orderStatus" element={<OrderStatus token={token} />}>
              <Route
                path="createStatus"
                element={<AddStatus token={token} />}
              />
            </Route>

            <Route path="inventory" element={<Inventory token={token} />}>
              <Route
                path="add-inventory"
                element={<CreateInventory token={token} />}
              />

              <Route
                path="updateInventory/:id"
                element={<UpdateInventory token={token} />}
              />
              <Route
                path="addInventoryCategory"
                element={<CreateNewCategory token={token} />}
              />
            </Route>
          </Route>
        )}

        {/* BUG  THIS SHOULD BE ERROR ELEMENT BUT I ADDED BECAUSE PREVENTING ME USER LOGIN ERROR  BUG*/}
        {/* Mistake came from the user info in some point I'm losing the data from USERINFO and that way I have FLICKER PROBLEM with managment I need to fix prevent losing the data !!!!!! vazno */}
        <Route path="*" element={<p></p>}></Route>
        {/* <Route
          path="*"
          element={
            <ErrorDisplayView
              errorMessage="Page not found"
              navigateTo1={"order"}
            />
          }
        /> */}
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

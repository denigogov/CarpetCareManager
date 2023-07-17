import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
  Navigate,
} from 'react-router-dom';
import useToken from './useToken';
import { useEffect, useState } from 'react';

import Login from './pages/Login';
import Root from './pages/Root';
import Dashboard from './pages/dashboard/Dashboard';
// Order Routes
import Order from './pages/order/Order';
import CreateOrder from './pages/order/CreateOrder';

import Delivery from './pages/Delivery';

// Contact Router Component
import Contact from './pages/contact/Contact';
import CreateContact from './pages/contact/CreateContact';
import EditContact from './pages/contact/EditContact';
import DetailsContact from './pages/contact/DetailsContact';
// Managment routes!
import Management from './pages/management/Management';
import Analytics from './pages/management/Analytics';
import Expenses from './pages/management/Expenses';
import Price from './pages/management/Price';
import Inventory from './pages/management/Inventory';
// user routes
import Users from './pages/management/Users';
import EditUser from './pages/management/EditUser';
import DetailsUser from './pages/management/DetailsUser';
import CreateUser from './pages/management/CreateUser';

import ErrorDisplayView from './components/ErrorDisplayView';

import {
  fetchSingleUser,
  fetchTableDepartment,
  fetchTokenValidation,
  fetchSingleCustomer,
  fetchCustomerOrders,
} from './api';
import EditOrder from './pages/order/EditOrder';

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
  }, []);

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
        <Route path="dashboard" element={<Dashboard token={token} />} />
        <Route
          path="order"
          element={<Order token={token} userInfo={userInfo} />}
        >
          <Route
            path="createOrder"
            element={<CreateOrder token={token} userInfo={userInfo} />}
          />

          <Route path="edit/" element={<EditOrder token={token} />} />
        </Route>

        <Route path="delivery" element={<Delivery />} />

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
                navigateTo2="/order/createOrder"
              />
            }
          />
        </Route>

        {userInfo.department === 2 && (
          <Route path="management" element={<Management />}>
            <Route path="users" element={<Users token={token} />}>
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

            <Route path="analytics" element={<Analytics />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="price" element={<Price />} />
            <Route path="inventory" element={<Inventory />} />
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

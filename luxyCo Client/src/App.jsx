import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from "react-router-dom";
import useToken from "./useToken";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
// Order Routes
import Order from "./pages/order/Order";
import CreateOrder from "./pages/order/CreateOrder";

import Delivery from "./pages/Delivery";

// Contact Router Component
import Contact from "./pages/contact/Contact";
import CreateContact from "./pages/contact/CreateContact";
import EditContact from "./pages/contact/EditContact";
// Managment routes!
import Management from "./pages/management/Management";
import Analytics from "./pages/management/Analytics";
import Expenses from "./pages/management/Expenses";
import Price from "./pages/management/Price";
import Inventory from "./pages/management/Inventory";
// user routes
import Users from "./pages/management/Users";
import EditUser from "./pages/management/EditUser";
import DetailsUser from "./pages/management/DetailsUser";
import CreateUser from "./pages/management/CreateUser";

import {
  fetchSingleUser,
  fetchTableDepartment,
  fetchTokenValidation,
} from "./api";

const App = () => {
  const { token, setToken } = useToken(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const validateToken = async () => {
      if (typeof token === "string") {
        const userInfos = await fetchTokenValidation(token);

        if (userInfos) setUserInfo(userInfos);
        else setToken("");
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
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="order" element={<Order token={token} />}>
          <Route
            path="createOrder"
            element={<CreateOrder token={token} userInfo={userInfo} />}
          />
        </Route>
        <Route path="delivery" element={<Delivery />} />

        {/* CONTACT ROUTE */}
        <Route path="contact" element={<Contact token={token} />}>
          <Route path="addCustomer" element={<CreateContact token={token} />} />
          <Route path="edit/:id" element={<EditContact token={token} />} />
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
        <Route path="*" element={<p></p>}></Route>
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

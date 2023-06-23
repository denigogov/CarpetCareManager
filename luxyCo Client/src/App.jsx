import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import useToken from "./useToken";

import Login from "./pages/Login";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Delivery from "./pages/Delivery";
import Contact from "./pages/Contact";

import Management from "./pages/Management/Management";
import Users from "./pages/management/Users";
import Analytics from "./pages/management/Analytics";
import Expenses from "./pages/management/Expenses";
import Price from "./pages/management/Price";
import Inventory from "./pages/management/Inventory";
import { useState } from "react";

const App = () => {
  const { token, setToken } = useToken(null);
  const [userInfo, setUserInfo] = useState({});

  console.log(userInfo);

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
        <Route path="order" element={<Order />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="contact" element={<Contact />} />

        {userInfo.department === 2 && (
          <Route path="management" element={<Management />}>
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="price" element={<Price />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        )}
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

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Delivery from "./pages/Delivery";
import Contact from "./pages/Contact";
import Managment from "./pages/Managment";
import useToken from "./useToken";

const App = () => {
  const { token, setToken } = useToken(null);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="order" element={<Order />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="managment" element={<Managment />} />
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

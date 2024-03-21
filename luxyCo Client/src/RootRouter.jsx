import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useAuth } from './helpers/Auth';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Root from './pages/Root';
import { RequireAuth } from './helpers/RequireAuth';
import Order from './pages/order/Order';
import CreateOrder from './pages/order/CreateOrder';
import EditOrder from './pages/order/EditOrder';
import {
  fetchCustomerOrders,
  fetchOrderById,
  fetchOrdersById,
  fetchSingleCustomer,
} from './api';
import Delivery from './pages/delivery/Delivery';
import EditContact from './pages/contact/EditContact';
import CreateContact from './pages/contact/CreateContact';
import DetailsContact from './pages/contact/DetailsContact';
import ErrorDisplayView from './components/ErrorDisplayView';
import Contact from './pages/contact/Contact';

const RootRouter = () => {
  const auth = useAuth();

  const token = auth.token;
  const userInfo = auth.userInfo;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {auth.token ? null : <Route path="login" element={<Login />} />}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Root />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard token={token} />} />
          <Route path="dashboard" element={<Dashboard token={token} />} />

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
            <Route
              path="addCustomer"
              element={<CreateContact token={token} />}
            />
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
                <ErrorDisplayView
                  errorMessage="No Orders found for this user"
                  navigateTo1="/dashboard"
                  navigateTo2="/order"
                />
              }
            />
          </Route>
        </Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default RootRouter;

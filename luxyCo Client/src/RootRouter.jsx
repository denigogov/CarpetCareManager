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
  fetchSingleUser,
} from './api';
import Delivery from './pages/delivery/Delivery';
import EditContact from './pages/contact/EditContact';
import CreateContact from './pages/contact/CreateContact';
import DetailsContact from './pages/contact/DetailsContact';
import ErrorDisplayView from './components/ErrorDisplayView';
import Contact from './pages/contact/Contact';
import Management from './pages/management/Management';
import Users from './pages/management/Users';
import EditUser from './pages/management/EditUser';
import DetailsUser from './pages/management/DetailsUser';
import CreateUser from './pages/management/CreateUser';
import Analytics from './pages/management/Analytics';
import Expenses from './pages/management/Expenses';
import Price from './pages/management/Price/Price';
import AddService from './pages/management/Price/AddService';
import OrderStatus from './pages/management/orderStatus/Status';
import AddStatus from './pages/management/orderStatus/AddStatus';
import Inventory from './pages/management/inventory/Inventory';
import CreateInventory from './pages/management/inventory/CreateInventory';
import UpdateInventory from './pages/management/inventory/UpdateInventory';
import CreateNewCategory from './pages/management/inventory/CreateNewCategory';
import { OwnerAuth } from './helpers/OwnerAuth';

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

          {/* Manament Route */}
          <Route
            path="management"
            element={
              <OwnerAuth>
                <Management token={token} />
              </OwnerAuth>
            }
          >
            <Route
              index
              element={<Users token={token} userInfo={userInfo} />}
            />
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
        </Route>

        <Route
          key="notFound"
          path="*"
          element={<h1>Error</h1>}
          errorElement={<h4>HEllo</h4>}
        ></Route>
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

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import {
  fetchSingleUser,
  fetchTableDepartment,
  fetchSingleCustomer,
  fetchCustomerOrders,
  fetchOrderById,
} from './api';

import { useAuth } from './helpers/Auth';
import { RequireAuth } from './helpers/RequireAuth';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Root from './pages/Root';
import Order from './pages/order/Order';
import CreateOrder from './pages/order/CreateOrder';
import EditOrder from './pages/order/EditOrder';

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
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="order" element={<Order />}>
            <Route path="createOrder" element={<CreateOrder />} />
            <Route
              path="edit/:id"
              element={<EditOrder />}
              loader={({ params }) => fetchOrderById({ params }, token)}
            />
          </Route>

          <Route path="/delivery" element={<Delivery />} />

          {/* CONTACT ROUTE */}
          <Route path="contact" element={<Contact />}>
            <Route path="addCustomer" element={<CreateContact />} />
            <Route
              path="edit/:id"
              element={<EditContact />}
              loader={({ params }) => fetchSingleCustomer({ params }, token)}
            />

            <Route
              path="details/:id"
              element={<DetailsContact />}
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
            <Route index element={<Users />} />
            <Route path="users" element={<Users />}>
              <Route
                path="edit/:id"
                element={<EditUser />}
                loader={({ params }) => fetchSingleUser({ params }, token)}
              />
              <Route
                path="details/:id"
                element={<DetailsUser />}
                loader={({ params }) => fetchSingleUser({ params }, token)}
              />
              <Route path="addUser" element={<CreateUser />} />
            </Route>

            <Route path="analytics" element={<Analytics />} />
            <Route path="expenses" element={<Expenses />} />

            <Route path="price" element={<Price />}>
              <Route path="addService" element={<AddService />} />
            </Route>
            <Route path="orderStatus" element={<OrderStatus />}>
              <Route path="createStatus" element={<AddStatus />} />
            </Route>

            <Route path="inventory" element={<Inventory />}>
              <Route path="add-inventory" element={<CreateInventory />} />

              <Route path="updateInventory/:id" element={<UpdateInventory />} />
              <Route
                path="addInventoryCategory"
                element={<CreateNewCategory />}
              />
            </Route>
          </Route>
        </Route>

        {/* Need to change the url fix the view ! */}
        <Route
          key="notFound"
          path="*"
          element={
            <ErrorDisplayView
              errorMessage="URL Not Found"
              navigateTo1="/"
              navigateTo2="/dashboard"
            />
          }
          errorElement={
            <ErrorDisplayView
              errorMessage="URL Not Found"
              navigateTo1="/"
              navigateTo2="/dashboard"
            />
          }
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

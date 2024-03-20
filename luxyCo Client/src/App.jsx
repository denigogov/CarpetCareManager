import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useToken from "./useToken";
import React, { useEffect, useState } from "react";

import Login from "./pages/Login";
import Root from "./pages/Root";

const LazyDashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const LazyDelivery = React.lazy(() => import("./pages/delivery/Delivery"));

// Order Routes
import CreateOrder from "./pages/order/CreateOrder";
const Order = React.lazy(() => import("./pages/order/Order"));
const EditOrder = React.lazy(() => import("./pages/order/EditOrder"));

// Contact Router Component
import CreateContact from "./pages/contact/CreateContact";
const Contact = React.lazy(() => import("./pages/contact/Contact"));
const EditContact = React.lazy(() => import("./pages/contact/EditContact"));
const DetailsContact = React.lazy(() =>
  import("./pages/contact/DetailsContact")
);

// Managment routes!
const Management = React.lazy(() => import("./pages/management/Management"));
import Analytics from "./pages/management/Analytics";
import Expenses from "./pages/management/Expenses";

// Price Route
const Price = React.lazy(() => import("./pages/management/Price/Price"));
import AddService from "./pages/management/Price/AddService";

// user routes
import CreateUser from "./pages/management/CreateUser";
const Users = React.lazy(() => import("./pages/management/Users"));
const DetailsUser = React.lazy(() => import("./pages/management/DetailsUser"));
const EditUser = React.lazy(() => import("./pages/management/EditUser"));

// Inventory Route
const Inventory = React.lazy(() =>
  import("./pages/management/inventory/Inventory")
);
const OrderStatus = React.lazy(() =>
  import("./pages/management/orderStatus/Status")
);
import CreateInventory from "./pages/management/inventory/CreateInventory";
import CreateNewCategory from "./pages/management/inventory/CreateNewCategory";
import UpdateInventory from "./pages/management/inventory/UpdateInventory";
import AddStatus from "./pages/management/orderStatus/AddStatus";

import LoadingView from "./components/LoadingView";
import ErrorDisplayView from "./components/ErrorDisplayView";

import {
  fetchSingleUser,
  fetchTableDepartment,
  fetchTokenValidation,
  fetchSingleCustomer,
  fetchCustomerOrders,
  fetchOrderById,
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
          element={
            <React.Suspense fallback={<LoadingView />}>
              <Order token={token} userInfo={userInfo} />
            </React.Suspense>
          }
        >
          <Route
            path="createOrder"
            element={<CreateOrder token={token} userInfo={userInfo} />}
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<LoadingView />}>
                <EditOrder token={token} userInfo={userInfo} />
              </React.Suspense>
            }
            loader={({ params }) => fetchOrderById({ params }, token)}
          />
        </Route>
        <Route
          path="/delivery"
          element={
            <React.Suspense fallback={<LoadingView />}>
              <LazyDelivery token={token} />
            </React.Suspense>
          }
        />
        {/* CONTACT ROUTE */}
        <Route
          path="contact"
          element={
            <React.Suspense fallback={<LoadingView />}>
              <Contact token={token} />
            </React.Suspense>
          }
        >
          <Route path="addCustomer" element={<CreateContact token={token} />} />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<LoadingView />}>
                <EditContact token={token} />
              </React.Suspense>
            }
            loader={({ params }) => fetchSingleCustomer({ params }, token)}
          />

          <Route
            path="details/:id"
            element={
              <React.Suspense fallback={<LoadingView />}>
                <DetailsContact token={token} />
              </React.Suspense>
            }
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
        {(userInfo.department === 2 || userInfo.department === 3) && (
          <Route
            path="management"
            element={
              <React.Suspense fallback={<LoadingView />}>
                <Management token={token} />
              </React.Suspense>
            }
          >
            <Route
              index
              element={<Users token={token} userInfo={userInfo} />}
            />
            <Route
              path="users"
              element={
                <React.Suspense fallback={<LoadingView />}>
                  <Users token={token} userInfo={userInfo} />
                </React.Suspense>
              }
            >
              <Route
                path="edit/:id"
                element={
                  <React.Suspense fallback={<LoadingView />}>
                    <EditUser token={token} />
                  </React.Suspense>
                }
                loader={({ params }) => fetchSingleUser({ params }, token)}
              />
              <Route
                path="details/:id"
                element={
                  <React.Suspense fallback={<LoadingView />}>
                    <DetailsUser token={token} />
                  </React.Suspense>
                }
                loader={({ params }) => fetchSingleUser({ params }, token)}
              />
              <Route path="addUser" element={<CreateUser token={token} />} />
            </Route>

            <Route path="analytics" element={<Analytics token={token} />} />
            <Route path="expenses" element={<Expenses />} />

            <Route
              path="price"
              element={
                <React.Suspense fallback={<LoadingView />}>
                  <Price token={token} />
                </React.Suspense>
              }
            >
              <Route path="addService" element={<AddService token={token} />} />
            </Route>
            <Route
              path="orderStatus"
              element={
                <React.Suspense fallback={<LoadingView />}>
                  <OrderStatus token={token} />
                </React.Suspense>
              }
            >
              <Route
                path="createStatus"
                element={<AddStatus token={token} />}
              />
            </Route>

            <Route
              path="inventory"
              element={
                <React.Suspense fallback={<LoadingView />}>
                  <Inventory token={token} />
                </React.Suspense>
              }
            >
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

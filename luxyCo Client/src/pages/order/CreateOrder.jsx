import { useState } from "react";
import {
  fetchTableCustomers,
  fetchTableServices,
  fetchOrderServices,
} from "../../api";
import useSWR, { useSWRConfig } from "swr";
import OrderCreateStepOne from "../../components/order/OrderCreateStepOne";

const CreateOrder = ({ token, userInfo }) => {
  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: oorderStatusLoading,
  } = useSWR(["orderStatus", token]);

  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useSWR(["customers", token], () => fetchTableCustomers(token), {
    refreshInterval: 1000, // Refresh data every 1 seconds
  });

  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(["services", token], () => fetchTableServices(token));

  const {
    data: orderServices,
    error: orderServicesError,
    isLoading: orderServicesLoading,
  } = useSWR(["orderServices", token], () => fetchOrderServices(token), {
    refreshInterval: 1000, // Refresh data every 1 seconds
  });

  if (customersError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (servicesError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (orderServicesError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (customersLoading || servicesLoading || orderServicesLoading)
    return <h3>loading...</h3>; //I need to add loading component!

  return (
    <div className="createOrder--container">
      <h3>Create Order</h3>
      <div className="createOrder--wrap">
        <div>
          <OrderCreateStepOne
            services={services}
            orderServices={orderServices}
            token={token}
            customers={customers}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateOrder;

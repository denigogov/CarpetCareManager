export const fetchTokenValidation = async token => {
  try {
    const res = await fetch('http://localhost:4000/login/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success === true) return data.payload;
    else return null;
  } catch (err) {
    console.log(err, 'Token validation failed (Endpoint: /login).');
  }
};

// -===========================================================

const BASE_URL = 'http://localhost:4000'; // Your API base URL

export const fetchApi = async (endpoint, token) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// export const fetchSingleUser = async ({ params }, token) => {
//   try {
//     const { id } = params;

//     const res = await fetch(`http://localhost:4000/user/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) throw new Error();

//     return data;
//   } catch (error) {
//     throw Error(
//       'Something bad happen!! , Could not find the all users, please try later'
//     );
//   }
// };

export const fetchSingleUser = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/user/${id}`, token);
};

export const fetchTableDepartment = async token => {
  return fetchApi('/table/departments', token);
};

// export const fetchOrdersByDate = async (formattedDate, token) => {
//   const url = `http://localhost:4000/table/orders?date=${formattedDate}`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.json();
// };

export const fetchOrdersByDate = async (formattedDate, token) => {
  return fetchApi(`/table/orders?date=${formattedDate}`, token);
};

// export const fetchOrdersBySchedueledDate = async (
//   startDate,
//   endDate,
//   token
// ) => {
//   try {
//     const url = `http://localhost:4000/table/orders/scheduled/?startDate=${startDate}&endDate=${endDate}`;

//     const res = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error();
//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

export const fetchOrdersBySchedueledDate = async (
  startDate,
  endDate,
  token
) => {
  return fetchApi(
    `/table/orders/scheduled/?startDate=${startDate}&endDate=${endDate}`,
    token
  );
};

// export const fetchOrderStatus = async token => {
//   try {
//     const response = await fetch('http://localhost:4000/table/orderStatus', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error.message);
//   }
// };

export const fetchOrderStatus = async token => {
  return fetchApi(`/table/orderStatus`, token);
};

// export const fetchTableCustomers = async token => {
//   const response = await fetch('http://localhost:4000/customer', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// };

export const fetchTableCustomers = async token => {
  return fetchApi(`/customer`, token);
};

// export const fetchTableServices = async token => {
//   const response = await fetch('http://localhost:4000/table/services', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// };

export const fetchTableServices = async token => {
  return fetchApi(`/table/services`, token);
};

// export const fetchTableServicesUpdate = async ({ params }, token) => {
//   try {
//     const { id } = params;
//     const res = await fetch(`http://localhost:4000/customer/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error();

//     return data;
//   } catch (error) {
//     throw Error(
//       'Something bad happen!! , Could not find the selected customer, please try later'
//     );
//   }
// };

// FOR PUT REQUEST!
export const fetchTableServicesUpdate = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/customer/${id}`, token);
};

// export const fetchOrderServices = async token => {
//   const response = await fetch('http://localhost:4000/table/orderServices', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// };

export const fetchOrderServices = async token => {
  return fetchApi(`/table/orderServices`, token);
};

// export const fetchSingleCustomer = async ({ params }, token) => {
//   try {
//     const { id } = params;
//     const res = await fetch(`http://localhost:4000/customer/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error();

//     return data;
//   } catch (error) {
//     throw Error(
//       'Something bad happen!! , Could not find the selected customer, please try later'
//     );
//   }
// };

export const fetchSingleCustomer = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/customer/${id}`, token);
};

// export const fetchCustomerOrders = async ({ params }, token) => {
//   try {
//     const { id } = params;
//     const res = await fetch(`http://localhost:4000/customer/details/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error();

//     return data;
//   } catch (error) {
//     throw Error(
//       'Something bad happen!! , Could not find the selected customer, please try later'
//     );
//   }
// };

export const fetchCustomerOrders = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/customer/details/${id}`, token);
};

// STATISTIC APIS

// export const fetchOrderStatisticByDay = async token => {
//   const response = await fetch('http://localhost:4000/statistic/ordersByDay', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// };

export const fetchOrderStatisticByDay = async token => {
  return fetchApi(`/statistic/ordersByDay`, token);
};

// export const fetchOrderStatisticByMonth = async token => {
//   const response = await fetch(
//     'http://localhost:4000/statistic/ordersByMonth',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   const data = await response.json();
//   return data;
// };

export const fetchOrderStatisticByMonth = async token => {
  return fetchApi(`/statistic/ordersByMonth`, token);
};

// export const fetchOrderStatisticByStatus = async token => {
//   const response = await fetch(
//     'http://localhost:4000/statistic/ordersByStatus',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   const data = await response.json();
//   return data;
// };

export const fetchOrderStatisticByStatus = async token => {
  return fetchApi(`/statistic/ordersByStatus`, token);
};

// export const fetchOrderStatisticByHour = async token => {
//   const response = await fetch(
//     'http://localhost:4000/statistic/ordersByHourPerMonth',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   const data = await response.json();
//   return data;
// };

export const fetchOrderStatisticByHour = async token => {
  return fetchApi(`/statistic/ordersByHourPerMonth`, token);
};

// export const fetchOrderById = async ({ params }, token) => {
//   try {
//     const { id } = params;
//     const res = await fetch(`http://localhost:4000/table/orders/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error();
//     return data;
//   } catch (error) {
//     throw Error(
//       'Something bad happen!! , Could not find the selected order, please try later'
//     );
//   }
// };

export const fetchOrderById = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/table/orders/${id}`, token);
};

// Fetching orders by id ... I have 2 with the same endPoint but they are returning something different and they are made for different purpose
// export const fetchOrdersById = async (id, token) => {
//   try {
//     const res = await fetch(`http://localhost:4000/table/orders/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error();
//     return data;
//   } catch (error) {
//     throw new Error('Could not find the selected order, please try later');
//   }
// };

export const fetchOrdersById = async (id, token) => {
  return fetchApi(`/table/orders/${id}`, token);
};

// export const fetchTableInventory = async token => {
//   try {
//     const res = await fetch('http://localhost:4000/table/inventory', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();

//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

export const fetchTableInventory = async token => {
  return fetchApi(`/table/inventory`, token);
};

// export const fetchTableInventoryCategories = async token => {
//   try {
//     const res = await fetch('http://localhost:4000/table/inventorycategories', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();

//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

export const fetchTableInventoryCategories = async token => {
  return fetchApi(`/table/inventorycategories`, token);
};

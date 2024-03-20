export const fetchTokenValidation = async token => {
  try {
    const res = await fetch('https://carpetcare.onrender.com/login', {
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

const BASE_URL = 'https://carpetcare.onrender.com'; // Your API base URL

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

export const fetchSingleUser = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/user/${id}`, token);
};

export const fetchTableDepartment = async token => {
  return fetchApi('/table/departments', token);
};

export const fetchOrdersByDate = async (formattedDate, token) => {
  return fetchApi(`/table/orders?date=${formattedDate}`, token);
};

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

export const fetchOrderStatus = async token => {
  return fetchApi(`/table/orderStatus`, token);
};

export const fetchTableCustomers = async token => {
  return fetchApi(`/customer`, token);
};

export const fetchTableServices = async token => {
  return fetchApi(`/table/services`, token);
};

// FOR PUT REQUEST!
export const fetchTableServicesUpdate = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/customer/${id}`, token);
};

export const fetchOrderServices = async token => {
  return fetchApi(`/table/orderServices`, token);
};

export const fetchSingleCustomer = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/customer/${id}`, token);
};

export const fetchCustomerOrders = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/customer/details/${id}`, token);
};

// STATISTIC APIS

export const fetchOrderStatisticByDay = async token => {
  return fetchApi(`/statistic/ordersByDay`, token);
};

export const fetchOrderStatisticByMonth = async token => {
  return fetchApi(`/statistic/ordersByMonth`, token);
};

export const fetchOrderStatisticByStatus = async token => {
  return fetchApi(`/statistic/ordersByStatus`, token);
};

export const fetchOrderStatisticByHour = async token => {
  return fetchApi(`/statistic/ordersByHourPerMonth`, token);
};

export const fetchOrderById = async ({ params }, token) => {
  const { id } = params;
  return fetchApi(`/table/orders/${id}`, token);
};

// Fetching orders by id ... I have 2 with the same endPoint but they are returning something different and they are made for different purpose
export const fetchOrdersById = async (id, token) => {
  return fetchApi(`/table/orders/${id}`, token);
};

export const fetchTableInventory = async token => {
  return fetchApi(`/table/inventory`, token);
};

export const fetchTableInventoryCategories = async token => {
  return fetchApi(`/table/inventorycategories`, token);
};

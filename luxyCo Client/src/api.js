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
export const fetchSingleUser = async ({ params }, token) => {
  try {
    const { id } = params;

    const res = await fetch(`http://localhost:4000/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error();

    return data;
  } catch (error) {
    throw Error(
      'Something bad happen!! , Could not find the all users, please try later'
    );
  }
};

export const fetchTableDepartment = async token => {
  try {
    const res = await fetch(`http://localhost:4000/table/departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error();

    return data;
  } catch (error) {
    throw Error(
      'Something bad happen!! , Could not fetch the api , please try later'
    );
  }
};

export const fetchOrdersByDate = async (formattedDate, token) => {
  const url = `http://localhost:4000/table/orders?date=${formattedDate}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const fetchOrdersBySchedueledDate = async (
  startDate,
  endDate,
  token
) => {
  try {
    const url = `http://localhost:4000/table/orders/scheduled/?startDate=${startDate}&endDate=${endDate}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchOrderStatus = async token => {
  const response = await fetch('http://localhost:4000/table/orderStatus', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTableCustomers = async token => {
  const response = await fetch('http://localhost:4000/customer', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTableServices = async token => {
  const response = await fetch('http://localhost:4000/table/services', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const fetchOrderServices = async token => {
  const response = await fetch('http://localhost:4000/table/orderServices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchSingleCustomer = async ({ params }, token) => {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:4000/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error();

    return data;
  } catch (error) {
    throw Error(
      'Something bad happen!! , Could not find the selected customer, please try later'
    );
  }
};
export const fetchCustomerOrders = async ({ params }, token) => {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:4000/customer/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error();

    return data;
  } catch (error) {
    throw Error(
      'Something bad happen!! , Could not find the selected customer, please try later'
    );
  }
};

// STATISTIC APIS

export const fetchOrderStatisticByDay = async token => {
  const response = await fetch('http://localhost:4000/statistic/ordersByDay', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchOrderStatisticByMonth = async token => {
  const response = await fetch(
    'http://localhost:4000/statistic/ordersByMonth',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchOrderStatisticByStatus = async token => {
  const response = await fetch(
    'http://localhost:4000/statistic/ordersByStatus',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchOrderStatisticByHour = async token => {
  const response = await fetch(
    'http://localhost:4000/statistic/ordersByHourPerMonth',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchOrderById = async ({ params }, token) => {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:4000/table/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error();
    return data;
  } catch (error) {
    throw Error(
      'Something bad happen!! , Could not find the selected order, please try later'
    );
  }
};

// Fetching orders by id ...
export const fetchOrdersById = async (id, token) => {
  try {
    const res = await fetch(`http://localhost:4000/table/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error();
    return data;
  } catch (error) {
    throw new Error('Could not find the selected order, please try later');
  }
};

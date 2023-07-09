export const fetchTokenValidation = async (token) => {
  try {
    const res = await fetch("http://localhost:4000/login/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success === true) return data.payload;
    else return null;
  } catch (err) {
    console.log(err, "Token validation failed (Endpoint: /login).");
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
      "Something bad happen!! , Could not find the all users, please try later"
    );
  }
};

export const fetchTableDepartment = async (token) => {
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
      "Something bad happen!! , Could not fetch the api , please try later"
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

export const fetchOrderStatus = async (token) => {
  const response = await fetch("http://localhost:4000/table/orderStatus", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTableCustomers = async (token) => {
  const response = await fetch("http://localhost:4000/table/customers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTableServices = async (token) => {
  const response = await fetch("http://localhost:4000/table/services", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const fetchOrderServices = async (token) => {
  const response = await fetch("http://localhost:4000/table/orderServices", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

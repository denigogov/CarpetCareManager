// export const fetchTokenValidation = async (token) => {
//   try {
//     const res = await fetch("http://localhost:4000/login/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (data.success === true) return data.payload;
//     else return null;
//   } catch (err) {
//     console.log(err, "Token validation failed (Endpoint: /user/login).");
//   }
// };
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

export const fetchOrdersByData = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

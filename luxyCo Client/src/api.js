export const fetchTokenValidation = async (token) => {
  try {
    const res = await fetch("http://localhost:4000/user/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success === true) return data.payload;
    else return null;
  } catch (err) {
    console.log(err, "Token validation failed (Endpoint: /user/login).");
  }
};

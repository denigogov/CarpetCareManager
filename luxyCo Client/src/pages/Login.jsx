import "../sass/_login.scss";
import loginIcon from "../assets/icon-user.svg";
import PropTypes from "prop-types";
import { useState } from "react";

const Login = ({ setToken, setUserInfo }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginResponse = async (credentials) => {
    const response = await fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    setUserInfo(data);
    return data.token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginResponse({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="loginView">
      <div className="companyName">
        <p className="service">carpet cleaning manager</p>
        <p className="name">LuxyCo</p>
      </div>

      <img className="login-icon" src={loginIcon} alt="login-Icon" />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          className="login__username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="login__password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn">login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;

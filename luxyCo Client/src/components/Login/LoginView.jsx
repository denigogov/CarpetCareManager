import "../../sass/_loginView.scss";
import loginIcon from "../../assets/icon-user.svg";
import PropTypes from "prop-types";
import { useState } from "react";

const LoginView = ({ setToken }) => {
  const [first_name, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginResponse = async (credentials) => {
    return fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginResponse({
      first_name,
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
LoginView.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginView;

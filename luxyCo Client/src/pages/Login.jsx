import "../sass/_login.scss";
import loginIcon from "../assets/icon-user.svg";
import PropTypes from "prop-types";
import { useState } from "react";

const Login = ({ setToken, setUserInfo }) => {
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginResponse = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch(`https://carpetcare.onrender.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }
      setUserInfo(data);
      return data.token;
    } catch (error) {
      setError("Wrong password or username");
    } finally {
      setLoading(false);
    }
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
        <p className="service">Carpet Cleaning Management</p>
        <p className="name">LuxyCo</p>
      </div>

      <img className="login-icon" src={loginIcon} alt="login-Icon" />

      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          placeholder="username"
          defaultValue="demo"
          type="text"
          className="login__username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          disabled={loading}
          placeholder="password"
          defaultValue="demo123"
          type="password"
          className="login__password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => setLoading(true)} className="login-btn">
          Sign In
        </button>
      </form>

      {loading && (
        <div>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#da0063"
          >
            <g fill="none" fillRule="evenodd" strokeWidth="2">
              <circle cx="22" cy="22" r="1">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="0s"
                  dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="22" cy="22" r="1">
                <animate
                  attributeName="r"
                  begin="-0.9s"
                  dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="-0.9s"
                  dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>
      )}
      <p className="errorMessage">{error}</p>
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;

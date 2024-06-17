import '../sass/_login.scss';
import loginIcon from '../assets/icon-user.svg';
import { useState } from 'react';
import { useAuth } from '../helpers/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingRing from '../components/reusableComponent/LoadingRing';
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_API_URL;
const ALERT_TITLE = import.meta.env.VITE_ALERT_TITLE;
const ALERT_MESSAGE = import.meta.env.VITE_ALERT_MESSAGE;
const ALERT_ICON = import.meta.env.VITE_ALERT_ICON;

const Login = () => {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const succesMessageBtn = () => {
    return Swal.fire({
      title: ALERT_TITLE,
      html: ALERT_MESSAGE,
      position: 'center',
      icon: ALERT_ICON,
      iconColor: '#da0063',
      confirmButtonColor: '#da0063',
    });
  };

  const redirectPath = location.state?.path || '/';

  const loginResponse = async credentials => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }
      auth.info(data);

      return data.token;
    } catch (error) {
      setError('Wrong password or username');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    {
      ALERT_TITLE.length > 4 && (await succesMessageBtn());
    }
    const token = await loginResponse({
      username,
      password,
    });

    auth.login(token);
    navigate(redirectPath, { replace: true });
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
          onChange={e => setUsername(e.target.value)}
        />
        <input
          disabled={loading}
          placeholder="password"
          defaultValue="demo123"
          type="password"
          className="login__password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={() => setLoading(true)} className="login-btn">
          Sign In
        </button>
      </form>

      {loading && (
        <div>
          <LoadingRing />
        </div>
      )}
      <p className="errorMessage">{error}</p>
    </div>
  );
};

export default Login;

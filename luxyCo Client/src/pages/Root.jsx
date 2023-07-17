import { Outlet, NavLink, useNavigate, redirect } from 'react-router-dom';
import '../sass/_root.scss';
import appLogo from '../assets/appLogo.svg';
import githubIcon from '../assets/githubIcon.svg';
import linkedInIcon from '../assets/linkedInIcon.svg';

const Root = ({ setToken, userInfo }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className="rootContainer">
      <div className="navbarContainer">
        <div className="navbar-left">
          <div className="logo">
            <div className="appLogo ">
              <img
                src={appLogo}
                alt="app logo "
                onClick={() => navigate('/dashboard')}
              />
            </div>
          </div>
          <div className="userLoggedin">{userInfo.name}</div>
          <nav>
            <ul>
              <NavLink
                to="dashboard"
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'activeLink' : 'navLink'
                }
              >
                <li>
                  <i className="bx bx-grid-alt"></i>
                  Dashboard
                  {/* <span className="tooltip">Dashboard</span> */}
                </li>
              </NavLink>
              <NavLink
                to="order"
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'activeLink' : 'navLink'
                }
              >
                <li>
                  <i className="bx bxs-pen"></i>
                  Order
                  {/* <span className="tooltip">Order</span> */}
                </li>
              </NavLink>
              <NavLink
                to="delivery"
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'activeLink' : 'navLink'
                }
              >
                <li>
                  <i className="bx bxs-truck"></i>
                  Delivery
                  {/* <span className="tooltip">Delivery</span> */}
                </li>
              </NavLink>
              <NavLink
                to="contact"
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'activeLink' : 'navLink'
                }
              >
                <li>
                  <i className="bx bxs-contact"></i>
                  Contact
                  {/* <span className="tooltip">Contact</span> */}
                </li>
              </NavLink>
              {userInfo.department === 2 && (
                <NavLink
                  to="management"
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'activeLink' : 'navLink'
                  }
                >
                  <li>
                    <i className="bx bxs-folder-open"></i>
                    Management
                    {/* <span className="tooltip">Management</span> */}
                  </li>
                </NavLink>
              )}
            </ul>
          </nav>
          <footer id="footer">
            <div className="footer__icons">
              <a target="_blank" href="https://github.com/denigogov">
                <img
                  className="githubLogo"
                  src={githubIcon}
                  alt="github Logo"
                />
              </a>

              <a
                target="_blank"
                href="https://www.linkedin.com/in/dejan-gogov-571871270/"
              >
                <img
                  className="linkedInLogo"
                  src={linkedInIcon}
                  alt="linkedIn Logo"
                />
              </a>
            </div>
            <p>LuxyCo by Dejan Gogov</p>
          </footer>
        </div>
        <div className="navbar-topTest">
          <div className="navbar-top">
            <i className="bx bx-power-off" onClick={logoutHandler}></i>
          </div>
          <div className="mainOutlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;

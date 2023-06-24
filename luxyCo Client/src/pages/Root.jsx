import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../sass/_root.scss";
import appLogo from "../assets/appLogo.svg";

const Root = ({ setToken, userInfo }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="I need to find way how to store the outlet in the midle of the page without absolut!">
      <div className="navbarContainer">
        <div className="navbar-left">
          <div className="logo">
            <div className="appLogo ">
              <img
                src={appLogo}
                alt="app logo "
                onClick={() => navigate("/dashboard")}
              />
            </div>
          </div>

          <div className="userLoggedin">{userInfo.name}</div>
          <nav>
            <ul>
              <NavLink
                to="dashboard"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "navLink"
                }
              >
                <li>
                  <i className="bx bx-grid-alt"></i>
                  Dashboard
                  {/* <span className="tooltip">Dashboard</span> */}{" "}
                </li>
              </NavLink>

              <NavLink
                to="order"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "navLink"
                }
              >
                {" "}
                <li>
                  <i className="bx bxs-pen"></i>
                  Order
                  {/* <span className="tooltip">Order</span> */}{" "}
                </li>
              </NavLink>

              <NavLink
                to="delivery"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "navLink"
                }
              >
                {" "}
                <li>
                  <i className="bx bxs-truck"></i>
                  Delivery
                  {/* <span className="tooltip">Delivery</span> */}{" "}
                </li>
              </NavLink>

              <NavLink
                to="contact"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "navLink"
                }
              >
                {" "}
                <li>
                  <i className="bx bxs-contact"></i>
                  Contact
                  {/* <span className="tooltip">Contact</span> */}{" "}
                </li>
              </NavLink>

              {userInfo.department === 2 && (
                <NavLink
                  to="management"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "navLink"
                  }
                >
                  {" "}
                  <li>
                    <i className="bx bxs-folder-open"></i>
                    Management
                    {/* <span className="tooltip">Management</span> */}{" "}
                  </li>
                </NavLink>
              )}
            </ul>
          </nav>
          <div className="ownername">
            <p>Powerd by Gogov</p>
          </div>
        </div>
        <div className="navbar-topTest">
          <div className="navbar-top">
            <i className="bx bx-power-off" onClick={logoutHandler}></i>
          </div>{" "}
          <Outlet />
        </div>
      </div>{" "}
    </div>
  );
};

export default Root;

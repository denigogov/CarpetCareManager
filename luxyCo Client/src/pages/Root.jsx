import { Outlet, NavLink, useNavigate } from "react-router-dom";
import NavbarView from "../components/navbar/NavbarView";
import "../sass/Navbar/_navbarView.scss";
import appLogo from "../assets/appLogo.svg";

const Root = ({ setToken }) => {
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
            <div className="appLogo">
              <img
                src={appLogo}
                alt="app logo"
                onClick={() => navigate("/dashboard")}
              />
            </div>
          </div>

          <div className="userLoggedin">username</div>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="dashboard"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "navLink"
                  }
                >
                  <i className="bx bx-grid-alt"></i>
                  Dashboard
                  {/* <span className="tooltip">Dashboard</span> */}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="order"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "navLink"
                  }
                >
                  <i className="bx bxs-pen"></i>
                  Order
                  {/* <span className="tooltip">Order</span> */}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="delivery"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "navLink"
                  }
                >
                  <i className="bx bxs-truck"></i>
                  Delivery
                  {/* <span className="tooltip">Delivery</span> */}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="contact"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "navLink"
                  }
                >
                  <i className="bx bxs-contact"></i>
                  Contact
                  {/* <span className="tooltip">Contact</span> */}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="management"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "navLink"
                  }
                >
                  <i className="bx bxs-folder-open"></i>
                  Management
                  {/* <span className="tooltip">Management</span> */}
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="ownername">Powerd by Gogov</div>
        </div>
        <div className="navbar-top">
          <i className="bx bx-power-off" onClick={logoutHandler}></i>
        </div>
      </div>{" "}
      <Outlet />
    </div>
  );
};

export default Root;

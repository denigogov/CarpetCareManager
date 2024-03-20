import { Outlet, NavLink, useNavigate, redirect } from "react-router-dom";
import "../sass/_root.scss";
import appLogo from "../assets/appLogo.svg";
import githubIcon from "../assets/githubIcon.svg";
import linkedInIcon from "../assets/linkedInIcon.svg";
import { useState } from "react";

const Root = ({ setToken, userInfo }) => {
  const navigate = useNavigate();

  const isPhone = window.innerWidth < 768;

  const [openNavBar, setOpenNavBar] = useState(!isPhone);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleNavBar = () => {
    setOpenNavBar((e) => !e);
  };

  return (
    <div className="rootContainer">
      <div className="navbarContainer">
        <div
          className={
            openNavBar ? "navbar-left" : " navbar-left closeOpenNavBar "
          }
        >
          <div className="logo">
            <div className="appLogo ">
              <img
                title="LuxyCo Carpet Care Manager"
                src={appLogo}
                alt="app logo "
                onClick={() => navigate("/dashboard")}
              />
            </div>
          </div>
          <div className="userLoggedin">{userInfo.name}</div>

          <nav className="mainNavBar">
            <ul>
              <NavLink
                to="dashboard"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "activeLink" : "navLink"
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
                  isPending ? "pending" : isActive ? "activeLink" : "navLink"
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
                  isPending ? "pending" : isActive ? "activeLink" : "navLink"
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
                  isPending ? "pending" : isActive ? "activeLink" : "navLink"
                }
              >
                <li>
                  <i className="bx bxs-contact"></i>
                  Contact
                  {/* <span className="tooltip">Contact</span> */}
                </li>
              </NavLink>
              {(userInfo.department === 2 || userInfo.department === 3) && (
                <NavLink
                  to="management"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "activeLink" : "navLink"
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

          <div>
            {/* hide Navbar Icon Only visible to latop/Desktop */}
            {!isPhone && <i className="bx bx-hide" onClick={handleNavBar}></i>}

            {/* Logout  */}
            {isPhone && (
              <i className="bx bx-power-off" onClick={logoutHandler}></i>
            )}
          </div>
          <footer id="footer">
            <div className="footer__icons">
              <a target="_blank" href="https://github.com/denigogov">
                <img
                  title="GitHub Profile"
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
                  title="LinkedIn Profile"
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
            {!isPhone && (
              <i className="bx bx-power-off" onClick={logoutHandler}></i>
            )}
            <div
              className={openNavBar ? "overlay1" : ""}
              onClick={handleNavBar}
            >
              {!openNavBar && (
                <div className="openNavbarBtn__container">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
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

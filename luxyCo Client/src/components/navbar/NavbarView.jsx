import { NavLink } from "react-router-dom";
import "../../sass/Navbar/_navbarView.scss";
// import Dashboard from "../../pages/Dashboard";

const NavbarView = () => {
  return (
    <div className="navbarContainer">
      <div className="navbar-left">
        <div className="logo">
          <p>logo</p>
        </div>

        <div className="userLoggedin">username</div>
        <nav>
          <ul>
            <li>
              <NavLink className="navLink" to="dashboard">
                <i class="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
                {/* <span className="tooltip">Dashboard</span> */}
              </NavLink>
            </li>

            <li>
              <NavLink to="order" className="navLink">
                <i class="bx bxs-pen"></i>
                <span className="links_name">Order</span>
                {/* <span className="tooltip">Order</span> */}
              </NavLink>
            </li>

            <li>
              <NavLink to="delivery" className="navLink">
                <i class="bx bxs-truck"></i>
                <span className="links_name">Delivery</span>
                {/* <span className="tooltip">Delivery</span> */}
              </NavLink>
            </li>

            <li>
              <NavLink to="contact" className="navLink">
                <i class="bx bxs-contact"></i>
                <span className="links_name">Contact</span>
                {/* <span className="tooltip">Contact</span> */}
              </NavLink>
            </li>

            <li>
              <NavLink to="management" className="navLink">
                <i class="bx bxs-folder-open"></i>
                <span className="links_name">Management</span>
                {/* <span className="tooltip">Management</span> */}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="ownername">Powerd by Gogov</div>
      </div>
      <div className="navbar-top">
        <i class="bx bx-power-off"></i>
      </div>
    </div>
  );
};

export default NavbarView;

// <NavLink className="navLink" to="dashboard">
//             <i class="bx bx-grid-alt"></i>
//             <span className="links_name">Dashboard</span>
//             {/* <span className="tooltip">Dashboard</span> */}
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="order" className="navLink">
//             <i class="bx bxs-pen"></i>
//             <span className="links_name">Order</span>
//             {/* <span className="tooltip">Order</span> */}
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="delivery" className="navLink">
//             <i class="bx bxs-truck"></i>
//             <span className="links_name">Delivery</span>
//             {/* <span className="tooltip">Delivery</span> */}
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="contact" className="navLink">
//             <i class="bx bxs-contact"></i>
//             <span className="links_name">Contact</span>
//             {/* <span className="tooltip">Contact</span> */}
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="management" className="navLink">
//             <i class="bx bxs-folder-open"></i>
//             <span className="links_name">Management</span>
//             {/* <span className="tooltip">Management</span> */}
//           </NavLink>
//         </li>

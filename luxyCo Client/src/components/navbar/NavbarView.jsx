import { NavLink } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

const NavbarView = () => {
  return (
    <div>
      <NavLink to="dashboard">Dashboard</NavLink>
      <NavLink to="order">Order</NavLink>
      <NavLink to="delivery">delivery</NavLink>
      <NavLink to="contact">contact</NavLink>
      <NavLink to="management">Management</NavLink>
    </div>
  );
};

export default NavbarView;

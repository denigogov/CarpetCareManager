import { Outlet, NavLink } from "react-router-dom";

const Management = () => {
  return (
    <div>
      <h3>Managment</h3>
      <p>please select catogory</p>

      <NavLink to="users">users</NavLink>
      <NavLink to="analytics">analytics</NavLink>
      <NavLink to="expenses">expenses</NavLink>
      <NavLink to="price">price</NavLink>
      <NavLink to="inventory">inventory</NavLink>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Management;

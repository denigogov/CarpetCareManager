import { Outlet, NavLink } from "react-router-dom";
import NavbarView from "../components/navbar/NavbarOwner";
import Login from "./Login";

const Root = () => {
  return (
    <div>
      {/* <NavbarView /> */}
      <Login />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;

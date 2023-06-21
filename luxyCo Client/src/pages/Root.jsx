import { Outlet, NavLink } from "react-router-dom";
import NavbarView from "../components/navbar/NavbarView";
import Login from "./Login";

const Root = () => {
  return (
    <div>
      <NavbarView />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;

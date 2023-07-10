import creteNewCustomerIcon from "../../assets/addIcon.svg";
import "../../sass/contact/_contact.scss";

import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

const Contact = ({ token }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Event handler stop bubbling
  const preventPropagation = (event) => {
    event.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigate("/contact");
  };

  const {
    data: customers,
    error: customersError,
    isLoading: ocustomersLoading,
  } = useSWR(["customers", token]);

  console.log(customers);

  return (
    <div className="contact--container">
      <nav className="contact--nav">
        <ul>
          <NavLink to="addCustomer" onClick={() => setPopupOpen((x) => !x)}>
            <li className="addCustomerLink">
              <img src={creteNewCustomerIcon} alt="create new user icon" />
              <p>add customer</p>
            </li>
          </NavLink>

          <li>
            <input type="search" placeholder="search for customer" />
          </li>
        </ul>
      </nav>

      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp" onClick={preventPropagation}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default Contact;

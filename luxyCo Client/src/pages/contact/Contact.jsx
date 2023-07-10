import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

import creteNewCustomerIcon from "../../assets/addIcon.svg";
import "../../sass/contact/_contact.scss";

import ContactView from "../../components/contact/ContactView";
import { fetchTableCustomers } from "../../api";

const Contact = ({ token }) => {
  const [inputSearchCustomer, setInputSearchCustomer] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const {
    data: fetchCustomers,
    error: fetchCustomersError,
    isLoading: fetchCustomersLoading,
  } = useSWR(["fetchCustomers", token], () => fetchTableCustomers(token), {
    refreshInterval: 5000, // Refresh data every 5 seconds
  });

  if (fetchCustomersError) return <h6>{fetchCustomersError.message}</h6>; // I need to add personal error messages!
  if (fetchCustomersLoading) return <h3>loading...</h3>; // I need to add personal error messages!

  const filteredCustomerResults = fetchCustomers.filter((customer) => {
    const searchValue = inputSearchCustomer.toLowerCase().trim();

    const searchByFirstName = customer.first_name
      .toLowerCase()
      .includes(searchValue);
    const searchByLastName = customer.last_name
      .toLowerCase()
      .includes(searchValue);
    const searchByPhoneNumber = customer.phone_number
      .toLowerCase()
      .includes(searchValue);
    return searchByFirstName || searchByLastName || searchByPhoneNumber;
  });

  // Event handler stop bubbling
  const preventPropagation = (event) => {
    event.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigate("/contact");
  };

  const handleDeleteUser = (id, first_name) => {
    setSelectedUser({ id, first_name });

    const deleteCustomer = async () => {
      try {
        const confirmDelete = confirm(
          `Please confirm if you want to delete this user ${first_name} all data related to the user will be lost.`
        );

        if (confirmDelete) {
          await fetch(`http://localhost:4000/customer/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          mutate("http://localhost:4000/customer");
        }
      } catch (error) {
        console.error("Error deleting user", error);
      }
    };

    deleteCustomer();
  };

  console.log(selectedUser);

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
            <input
              type="search"
              placeholder="search for customer"
              onChange={(e) => setInputSearchCustomer(e.target.value)}
            />
          </li>
        </ul>
      </nav>
      <div>
        <ContactView
          filteredCustomerResults={filteredCustomerResults}
          handleDeleteUser={handleDeleteUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
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

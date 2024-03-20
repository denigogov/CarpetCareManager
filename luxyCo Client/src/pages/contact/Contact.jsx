import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import Swal from "sweetalert2";

import creteNewCustomerIcon from "../../assets/addIcon.svg";
import "../../sass/contact/_contact.scss";

import ContactView from "../../components/contact/ContactView";
import { fetchTableCustomers } from "../../api";
import LoadingView from "../../components/LoadingView";
import { handlePostPutDeleteRequest } from "../../handleRequests";
import { useEffect } from "react";

const Contact = ({ token }) => {
  const [inputSearchCustomer, setInputSearchCustomer] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const {
    data: fetchCustomers,
    error: fetchCustomersError,
    isLoading: fetchCustomersLoading,
  } = useSWR(["fetchCustomers", token], () => fetchTableCustomers(token), {
    refreshInterval: 1000, // Refresh data every 1 seconds
  });

  // if (fetchCustomersError) return <h6>{fetchCustomersError.message}</h6>; // I need to add personal error messages!
  // if (fetchCustomersError) return <h6>{fetchCustomersError.message}</h6>; // I need to add personal error messages!
  if (fetchCustomersLoading) return <LoadingView />; // I need to add personal error messages!

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

  // Checking if the number already exsite in database for createing new user and update user

  const handleDeleteUser = (id, first_name, last_name) => {
    const deleteCustomer = async () => {
      const sendMessage = Swal.fire({
        title: "Delete User",
        html: `Please confirm if you want to delete this user <strong> ${first_name} ${last_name} </strong> This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#da0063",
        iconColor: "#da0063",
        cancelButtonColor: "#b7b7b7",
        confirmButtonText: "Yes, delete it!",
      });

      if ((await sendMessage).isConfirmed) {
        handlePostPutDeleteRequest(
          "/customer/",
          id,
          "DELETE",
          token,
          null,
          "Error deleting user",
          setErrorMessage,
          setSuccess,
          mutate,
          "https://carpetcare.onrender.com/customer",
          "User Deleted",
          "Deleted"
        );
      }
    };

    deleteCustomer();
  };

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
          setPopupOpen={setPopupOpen}
          success={success}
          errorMessage={errorMessage}
        />
      </div>

      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp" onClick={preventPropagation}>
            <Outlet context={[setPopupOpen]} />
          </main>
        </div>
      )}
    </div>
  );
};

export default Contact;

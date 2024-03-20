import { useLoaderData } from "react-router-dom";
import { useRef, useState } from "react";
import "../../sass/contact/_editContact.scss";
import useSWR, { useSWRConfig } from "swr";

// styling belong to _createContact.scss  I didn't change anything reuse of the components!!!

const EditContact = ({ token }) => {
  const [error, setError] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const adressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);
  const customerInputData = useRef(null);

  const fethcSingleUserData = useLoaderData(token);
  const { data: fetchCustomers } = useSWR(["fetchCustomers", token]);

  const handleUpdateInput = (e) => {
    const customerData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      street: adressRef.current.value,
      city: cityRef.current.value,
      phone_number: phoneNumberRef.current.value,
      postalCode: parseInt(postalCodeRef.current.value),
    };

    customerInputData.current = customerData;

    const { first_name, last_name, phone_number } = customerData;
    if (!first_name || !last_name || !phone_number) {
      setError("Please fill in all the required fields.");
      return;
    }
    // Checking if the number already exsite in database for updating customer
    const checkingForUniquePhoneNumber = () => {
      const userChangePhoneNumber =
        fethcSingleUserData.phone_number !== phoneNumberRef.current.value;

      if (userChangePhoneNumber) {
        const matchingNumber = fetchCustomers.some(
          (customers) => customers.phone_number === phoneNumberRef.current.value
        );
        if (matchingNumber) throw new Error("phone number already exists");
      }
      return userChangePhoneNumber;
    };

    // Not refactored because of the additional function better to leavet for now  !
    const addCustomer = async () => {
      try {
        const res = await fetch(
          `https://carpetcare.onrender.com/customer/${fethcSingleUserData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(customerInputData.current),
          }
        );

        if (res.ok) {
          setSuccessfulMessage(
            `Customer ${firstNameRef.current.value} ${lastNameRef.current.value} update successful`
          );
          setError("");
        }
        // this function checking if the number was update or not if it was it cheking in db is the number unique or not !
        checkingForUniquePhoneNumber();
      } catch ({ message }) {
        setError(`update faild, please try again, ${message}`);
      }
    };
    addCustomer();
  };

  return (
    <div className="updateCustomer">
      <p>Update Customer</p>
      <p className="customerSubtitle--name">
        {fethcSingleUserData.first_name} {fethcSingleUserData.last_name}
      </p>
      <form>
        <div className="updateCustomer--left">
          <label>first name*</label>
          <input
            pattern="[A-Za-z0-9\s]{3,}"
            type="text"
            defaultValue={fethcSingleUserData.first_name}
            ref={firstNameRef}
            placeholder="Requerd"
            required
          />{" "}
          <label>last name*</label>
          <input
            pattern="[A-Za-z0-9\s]{3,}"
            type="text"
            defaultValue={fethcSingleUserData.last_name}
            ref={lastNameRef}
            placeholder="Requerd"
            required
          />{" "}
          <label>phone number*</label>
          <input
            type="tel"
            defaultValue={fethcSingleUserData.phone_number}
            ref={phoneNumberRef}
            placeholder="Requerd"
            required
          />
        </div>
        <div className="updateCustomer--right">
          <label>adress</label>
          <input
            type="text"
            defaultValue={fethcSingleUserData.street}
            ref={adressRef}
            placeholder="E.g. Mozartstraße 42"
            required
            pattern="[A-Za-z0-9\s]{3,}"
            // title="Please enter at least 3 alphanumeric characters"
          />
          <label>city</label>
          <input
            pattern="[A-Za-z0-9\s]{3,}"
            type="text"
            defaultValue={fethcSingleUserData.city}
            ref={cityRef}
            placeholder="E.g. Berlin"
          />{" "}
          <label>postal code</label>
          <input
            type="tel"
            defaultValue={fethcSingleUserData.postalCode}
            ref={postalCodeRef}
            placeholder="E.g. 10117"
          />
        </div>
      </form>
      <button type="submit" onClick={handleUpdateInput}>
        update customer
      </button>
      <p className="errorMessage">{error}</p>
      <p className="successfulMessage">{successfulMessage}</p>
    </div>
  );
};

export default EditContact;

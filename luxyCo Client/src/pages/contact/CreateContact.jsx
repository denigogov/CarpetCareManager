import { useRef, useState } from "react";
import "../../sass/contact/_createContact.scss";
import useSWR, { useSWRConfig } from "swr";

const CreateContact = ({ token }) => {
  const [error, setError] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const adressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);

  const customerInputData = useRef(null);

  const handleCusomerForm = (e) => {
    e.preventDefault();

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

    const addCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:4000/customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(customerInputData.current),
        });

        if (res.ok) {
          setSuccessfulMessage(
            `Customer ${firstNameRef.current.value} ${lastNameRef.current.value} added. Success!`
          );
        }
      } catch (error) {
        setError(`Error creating customer, ${error}`);
      }
    };
    addCustomer();
  };

  return (
    <div className="createContact">
      <p>Customer Registration</p>
      <form>
        <div className="createContact--left">
          <input type="text" placeholder="First Name*" ref={firstNameRef} />
          <input type="text" placeholder="Last Name*" ref={lastNameRef} />
          <input type="text" placeholder="Phone Number*" ref={phoneNumberRef} />
        </div>
        <div className="createContact--right">
          <input type="text" placeholder="Adress" ref={adressRef} />
          <input type="text" placeholder="City" ref={cityRef} />
          <input type="text" placeholder="Postal Code" ref={postalCodeRef} />
        </div>
      </form>
      <button onClick={handleCusomerForm}>create customer</button>
      <p className="errorMessage">{error}</p>
      <p className="successfulMessage">{successfulMessage}</p>
    </div>
  );
};

export default CreateContact;

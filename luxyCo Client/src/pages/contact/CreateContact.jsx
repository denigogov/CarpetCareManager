import { useRef, useState } from 'react';
import '../../sass/contact/_createContact.scss';
import useSWR, { useSWRConfig } from 'swr';

const CreateContact = ({ token }) => {
  const [error, setError] = useState('');
  const [successfulMessage, setSuccessfulMessage] = useState('');

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const adressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);

  const customerInputData = useRef(null);

  const { data: fetchCustomers } = useSWR(['fetchCustomers', token]);

  const handleCusomerForm = e => {
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
      setError('Please fill in all the required fields.');
      return;
    }

    // Checking if the number already exsite in database for createing new user and update user
    const checkingForUniquePhoneNumber = fetchCustomers.some(
      customers => customers.phone_number === phoneNumberRef.current.value
    );

    const addCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:4000/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(customerInputData.current),
        });

        if (res.ok) {
          setSuccessfulMessage(
            `Customer ${firstNameRef.current.value} ${lastNameRef.current.value} added. Success!`
          );
          // cleaning in case there was some error before !
          setError('');
        }

        if (checkingForUniquePhoneNumber)
          throw new Error('phone number already exists');
      } catch ({ message }) {
        setError(`Error creating customer, ${message}`);
      }
    };
    addCustomer();
  };

  return (
    <div className="createContact">
      <p>Customer Registration</p>
      <form>
        <div className="createContact--left">
          <input
            pattern="[A-Za-z0-9]+"
            type="text"
            placeholder="First Name*"
            ref={firstNameRef}
            disabled={successfulMessage}
          />
          <input
            type="text"
            pattern="[A-Za-z0-9]+"
            placeholder="Last Name*"
            ref={lastNameRef}
            disabled={successfulMessage}
          />
          <input
            type="tel"
            placeholder="Phone Number*"
            ref={phoneNumberRef}
            disabled={successfulMessage}
          />
        </div>
        <div className="createContact--right">
          <input
            type="text"
            pattern="[A-Za-z0-9]+"
            placeholder="Adress"
            ref={adressRef}
            disabled={successfulMessage}
          />
          <input
            type="text"
            pattern="[A-Za-z0-9]+"
            placeholder="City"
            ref={cityRef}
            disabled={successfulMessage}
          />
          <input
            type="number"
            pattern="[A-Za-z0-9]+"
            placeholder="Postal Code"
            ref={postalCodeRef}
            disabled={successfulMessage}
          />
        </div>
      </form>
      <button onClick={handleCusomerForm}>create customer</button>
      <p className="errorMessage">{error}</p>
      <p className="successfulMessage">{successfulMessage}</p>
    </div>
  );
};

export default CreateContact;

import { useRef, useState } from 'react';
import '../../sass/order/_createCustomer.scss';
import useSWR, { useSWRConfig } from 'swr';

const CreateCustomer = ({
  token,
  setCreateNewCustomer,
  setNewCustomerData,
  customers,
  setStepTwo,
}) => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState('');

  const takeFirstName = useRef(null);
  const takeLastName = useRef(null);
  const takeStreet = useRef(null);
  const takeCity = useRef(null);
  const takePhoneNumber = useRef(null);
  const takePostalCode = useRef(null);
  const customerData = useRef(null);

  const handleAddCustomerForm = e => {
    e.preventDefault();

    const data = {
      first_name: takeFirstName.current.value,
      last_name: takeLastName.current.value,
      street: takeStreet.current.value,
      city: takeCity.current.value,
      phone_number: takePhoneNumber.current.value,
      postalCode: takePostalCode.current.value,
    };
    customerData.current = data;

    // Using State to take the phone number because is Unique and render the newest created customer

    // destructoring because I want to check if the fileds are empty or not
    const { first_name, last_name, phone_number } = data;

    const findDuplicate = customers.some(
      arr => arr.phone_number === takePhoneNumber.current.value
    );

    {
      findDuplicate &&
        setError(
          'please try again, user with same phone number already exists'
        );
    }

    console.log(findDuplicate);

    if (!first_name || !last_name || !phone_number) {
      setError('Please fill in all the required fields.');
      return;
    }

    const addCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:4000/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(customerData.current),
        });

        if (res.ok) {
          setCreateNewCustomer(false);
          setNewCustomerData(customerData.current);
          mutate('http://localhost:4000/customer', true);
          setStepTwo(true);
        }
      } catch (error) {
        setError('Error creating customer', error);
      }
    };
    addCustomer();
  };

  return (
    <div className="createCustomer--container">
      <p className="createCustomerSubTitle">Customer Registration</p>
      <form>
        <div className="createCustomer-left">
          <input
            type="text"
            ref={takeFirstName}
            placeholder="first name*"
            required
          />
          <input
            type="text"
            ref={takeLastName}
            placeholder="last name*"
            required
          />
          <input
            type="tel"
            ref={takePhoneNumber}
            required
            placeholder="phone number*"
          />
        </div>

        <div className="createCustomer-right">
          <input type="text" ref={takeCity} placeholder="city" />
          <input type="text" ref={takeStreet} placeholder="street" />
          <input type="number" ref={takePostalCode} placeholder="postal code" />
        </div>
      </form>
      <button onClick={handleAddCustomerForm}>create customer</button>
      <p className="errorMessage">{error}</p>
    </div>
  );
};

export default CreateCustomer;

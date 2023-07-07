import { useRef, useState } from "react";
import "../../sass/order/_createCustomer.scss";
import useSWR, { useSWRConfig } from "swr";

const CreateCustomer = ({
  token,
  setCreateNewCustomer,
  setShowNewCustomer,
  onHandleStepThree,
}) => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState("");

  const takeFirstName = useRef(null);
  const takeLastName = useRef(null);
  const takeStreet = useRef(null);
  const takeCity = useRef(null);
  const takePhoneNumber = useRef(null);
  const customerData = useRef(null);

  const handleAddCustomerForm = (e) => {
    e.preventDefault();

    const data = {
      first_name: takeFirstName.current.value,
      last_name: takeLastName.current.value,
      street: takeStreet.current.value,
      city: takeCity.current.value,
      phone_number: takePhoneNumber.current.value,
    };
    customerData.current = data;

    // Using State to take the phone number because is Unique and render the newest created customer

    // destructoring because I want to check if the fileds are empty or not
    const { first_name, last_name, phone_number } = data;

    if (!first_name || !last_name || !phone_number) {
      setError("Please fill in all the required fields.");
      return;
    }

    const addCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:4000/table/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(customerData.current),
        });

        if (res.ok) {
          onHandleStepThree();
          setCreateNewCustomer(false);
          setShowNewCustomer(customerData.current);
          mutate("http://localhost:4000/table/customers", true);
        }
      } catch (error) {
        setError("Error creating customer", error);
      }
    };
    addCustomer();
  };

  return (
    <div className="createCustomer--container">
      <form>
        <div className="createCustomer-left">
          <label>first name*</label>
          <input type="text" ref={takeFirstName} required />

          <label>last name*</label>
          <input type="text" ref={takeLastName} required />

          <label>street</label>
          <input type="text" ref={takeStreet} />
        </div>

        <div className="createCustomerRight">
          <label>city</label>
          <input type="text" ref={takeCity} />

          <label>phone number*</label>
          <input type="text" ref={takePhoneNumber} required />

          <button onClick={handleAddCustomerForm}>create customer</button>
          <p className="errorMessage">{error}</p>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
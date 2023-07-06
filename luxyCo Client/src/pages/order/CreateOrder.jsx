import { useState } from "react";
import { fetchTableCustomers } from "../../api";
import useSWR, { useSWRConfig } from "swr";

const CreateOrder = ({ token }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [matchingCustomers, setMatchingCustomers] = useState([]);

  const {
    data: orderStatus,
    error: orderStatusError,
    isLoading: oorderStatusLoading,
  } = useSWR(["orderStatus", token]);

  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useSWR(["customer", token], () => fetchTableCustomers(token));

  if (customersError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (customersLoading) return <h3>loading...</h3>; //I need to add loading component!

  const phone = (e) => {
    setSelectedUser(e.target.value);
    setMatchingCustomers(
      customers.filter((customer) => customer.first_name.includes(selectedUser))
    );
  };

  const findId = (id) => {
    setSelectedUser(id);
  };

  return (
    <div>
      {matchingCustomers.length > 0 ? (
        <ul>
          {matchingCustomers.map((customer) => (
            <li key={customer.id} onClick={() => findId(customer)}>
              {customer.first_name} <button>use</button>
            </li>
          ))}
        </ul>
      ) : (
        <button>create new custumer</button>
      )}
      <input type="text" onChange={phone} />

      {selectedUser.id ? (
        <div>
          <p>{selectedUser.first_name}</p>
          <p>{selectedUser.last_name}</p>
          <p>{selectedUser.street + " " + selectedUser.city}</p>
          <p>{selectedUser.phone_number}</p>
        </div>
      ) : (
        "no selected user"
      )}
    </div>
  );
};
export default CreateOrder;

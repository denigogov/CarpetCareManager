import { useState } from "react";
import "../../sass/order/_orderStepTwo.scss";
import addCustomerIcon from "../../assets/addUserIcon.svg";

import CreateCustomer from "./CreateCustomer";
import useSWR, { useSWRConfig } from "swr";

const OrderStepOne = ({
  customers,
  token,
  selectedUser,
  setSelectedUser,
  setNewCustomerID,
  setStepTwo,
}) => {
  const [searchInputUser, setSearchInputUser] = useState("");
  const [createNewCustomer, setCreateNewCustomer] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState("");

  const { mutate } = useSWRConfig();

  // !!!!!!
  // taking the last element with SHIFT because In my database Order by id DESC is !! I want user to see the lates created user first!! In the future we can apply filters for user to search by Letters ....
  const customerLastId = customers.map((customer) => customer.id).shift();

  const findCustomer = customers.filter((customer) => {
    const searchValue = searchInputUser.toLowerCase().trim();

    const searchByFirstName = customer.first_name
      .toLowerCase()
      .includes(searchValue);
    const searchByPhoneNumber = customer.phone_number.includes(searchInputUser);
    const searchByLastName = customer.last_name
      .toLowerCase()
      .includes(searchValue);

    return (
      (searchInputUser !== "" && searchByFirstName) ||
      searchByPhoneNumber ||
      searchByLastName
    );
  });

  const showUser = (customer) => {
    setSelectedUser(customer);
    setSearchInputUser("");
    setCreateNewCustomer(false);
  };

  // HERE IS THE BUG I NEED TO FIX ... ITS NOT SENDING THE newest created ID I need to check where is the mistake !
  const addNewCustomer = () => {
    setSelectedUser("");
    // Toggle the state to open and close create user
    setCreateNewCustomer(!createNewCustomer);
    mutate("https://carpetcare.onrender.com/table/orderServices");
    setNewCustomerID(customerLastId);
  };

  return (
    <div>
      <div className="orderStepTwo--container">
        <input
          type="text"
          value={searchInputUser}
          onChange={(e) => setSearchInputUser(e.target.value)}
          className="customerSearchIcon"
          placeholder="search for user"
          disabled={selectedUser}
        />

        {searchInputUser ? (
          findCustomer.length ? (
            <div className="OrderCustomersList">
              <ul>
                {findCustomer.map((customer) => (
                  <li key={customer.id} onClick={() => showUser(customer)}>
                    {customer.first_name + " " + customer.last_name}
                    <button>select</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No matching customers found</p>
          )
        ) : (
          <div className="addNewCustomer--container" onClick={addNewCustomer}>
            <p>add new customer</p>
            <img
              className="addCustomerIcon"
              src={addCustomerIcon}
              alt="create new user Icon"
            />
          </div>
        )}
        {selectedUser ? (
          <div>
            <p>{selectedUser.first_name + " " + selectedUser.last_name}</p>
            <p>{selectedUser.street + " " + selectedUser.city}</p>
            <p>{selectedUser.phone_number}</p>
          </div>
        ) : newCustomerData ? (
          <div>
            <p>
              {newCustomerData.first_name + " " + newCustomerData.last_name}
            </p>
            <p>{newCustomerData.street + " " + newCustomerData.city}</p>
            <p>{newCustomerData.phone_number}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {createNewCustomer && (
        <CreateCustomer
          token={token}
          setCreateNewCustomer={setCreateNewCustomer}
          setNewCustomerData={setNewCustomerData}
          customers={customers}
          setStepTwo={setStepTwo}
        />
      )}
    </div>
  );
};

export default OrderStepOne;

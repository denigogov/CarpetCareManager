import { useState } from "react";
import "../../sass/order/_orderStepTwo.scss";
import addCustomerIcon from "../../assets/addUserIcon.svg";
import OrderStepThree from "./OrderStepThree";
import CreateCustomer from "./CreateCustomer";

const OrderStepTwo = ({ customers, token }) => {
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [createNewCustomer, setCreateNewCustomer] = useState(false);
  const [showStepThree, setShowStepThree] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState("");

  const findUser = customers.filter((customer) => {
    const searchValue = searchUser.toLowerCase().trim();

    const searchByFirstName = customer.first_name
      .toLowerCase()
      .includes(searchValue);

    const searchByPhoneNumber = customer.phone_number.includes(searchUser);
    const searchByLastName = customer.last_name
      .toLowerCase()
      .includes(searchValue);

    return (
      (searchUser !== "" && searchByFirstName) ||
      searchByPhoneNumber ||
      searchByLastName
    );
  });

  const showUser = (customer) => {
    setSelectedUser(customer);
    setSearchUser("");
    setCreateNewCustomer(false);
  };

  const addNewCustomer = () => {
    setSelectedUser("");
    setCreateNewCustomer(true);
  };

  const handleStepThree = () => {
    setShowStepThree(true);
  };

  return (
    <div>
      <div className="orderStepTwo--container">
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="customerSearchIcon"
          placeholder="search for user"
        />

        {searchUser ? (
          findUser.length ? (
            <div className="OrderCustomersList">
              <ul>
                {findUser.map((customer) => (
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
        ) : showNewCustomer ? (
          <div>
            <p>
              {showNewCustomer.first_name + " " + showNewCustomer.last_name}
            </p>
            <p>{showNewCustomer.street + " " + showNewCustomer.city}</p>
            <p>{showNewCustomer.phone_number}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {createNewCustomer && (
        <CreateCustomer
          token={token}
          setCreateNewCustomer={setCreateNewCustomer}
          setShowNewCustomer={setShowNewCustomer}
          onHandleStepThree={handleStepThree}
        />
      )}
      {showStepThree || (selectedUser && <OrderStepThree />)}
    </div>
  );
};

export default OrderStepTwo;

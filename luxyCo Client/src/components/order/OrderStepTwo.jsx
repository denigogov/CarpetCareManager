import { useState } from "react";
import "../../sass/order/_orderStepTwo.scss";
import addCustomerIcon from "../../assets/addUserIcon.svg";
import OrderStepThree from "./OrderStepThree";
import CreateCustomer from "./CreateCustomer";

const OrderStepTwo = ({ customers, token }) => {
  const [searchInputUser, setSearchInputUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [createNewCustomer, setCreateNewCustomer] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState("");
  const [showStepThree, setShowStepThree] = useState(false);

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
          value={searchInputUser}
          onChange={(e) => setSearchInputUser(e.target.value)}
          className="customerSearchIcon"
          placeholder="search for user"
          // disabled={showStepThree}
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
          onHandleStepThree={handleStepThree}
        />
      )}
      {(showStepThree || selectedUser) && <OrderStepThree />}
    </div>
  );
};

export default OrderStepTwo;

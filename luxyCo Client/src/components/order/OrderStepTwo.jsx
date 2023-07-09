import { useState } from "react";
import "../../sass/order/_orderStepTwo.scss";
import addCustomerIcon from "../../assets/addUserIcon.svg";
import OrderStepThree from "./OrderStepThree";
import CreateCustomer from "./CreateCustomer";
import useSWR, { useSWRConfig } from "swr";

const OrderStepTwo = ({
  customers,
  token,
  totalPrice,
  orderServiceLastId,
  delivery,
  userInfo,
}) => {
  const [searchInputUser, setSearchInputUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [createNewCustomer, setCreateNewCustomer] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState("");
  const [showStepThree, setShowStepThree] = useState(false);

  const { mutate } = useSWRConfig();

  // Values That I need to complete the order in step-3 !!
  const customerLastId = customers.map((customer) => customer.id).pop();
  const selectedUserId = selectedUser.id;

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
    // Toggle the state to open and close create user
    setCreateNewCustomer(!createNewCustomer);
    mutate("http://localhost:4000/table/orderServices"); // mutate is  Refresh the users data
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
      {(showStepThree || selectedUser) && (
        <OrderStepThree
          customerLastId={customerLastId}
          selectedUserId={selectedUserId}
          totalPrice={totalPrice}
          orderServiceLastId={orderServiceLastId}
          delivery={delivery}
          userInfo={userInfo}
          token={token}
        />
      )}

      {/* <OrderStepThree
        customerLastId={customerLastId}
        selectedUserId={selectedUserId}
        totalPrice={totalPrice}
        orderServiceLastId={orderServiceLastId}
        delivery={delivery}
        userInfo={userInfo}
        token={token}
      /> */}
    </div>
  );
};

export default OrderStepTwo;

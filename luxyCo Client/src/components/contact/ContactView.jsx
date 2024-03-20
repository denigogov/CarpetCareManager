import "../../sass/contact/_contactView.scss";
import detailsIcon from "../../assets/detailsIcon.svg";
import deleteCustomerIcon from "../../assets/deleteIcon.svg";
import editCustomerIcon from "../../assets/editIcon.svg";
import { Link } from "react-router-dom";
import ApiSendRequestMessage from "../ApiSendRequestMessage";

const ContactView = ({
  filteredCustomerResults,
  handleDeleteUser,
  setPopupOpen,
  success,
  errorMessage,
}) => {
  return (
    <div>
      <div className="table-customers">
        <table>
          <thead>
            <tr>
              <th>first name</th>
              <th>last name</th>
              <th>street</th>
              <th>city</th>
              <th>postal code</th>
              <th>phone</th>
              <th>details</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomerResults.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td data-cell="First Name">{customer.first_name}</td>
                  <td data-cell="Last Name">{customer.last_name}</td>
                  <td data-cell="Street">{customer.street}</td>
                  <td data-cell="City">{customer.city}</td>
                  <td data-cell="Postal Code">{customer.postalCode}</td>
                  <td data-cell="Phone">
                    {customer.phone_number.match(/.{1,3}/g).join("-")}
                  </td>

                  <td data-cell="Details">
                    <Link
                      to={
                        `/contact/details/${customer.id}`
                          ? `/contact/details/${customer.id}`
                          : `/contact/`
                      }
                      onClick={() => setPopupOpen((x) => !x)}
                    >
                      <img src={detailsIcon} alt="customer details icon" />
                    </Link>
                  </td>

                  <td data-cell="Edit">
                    <Link
                      to={`/contact/edit/${customer.id}`}
                      onClick={() => setPopupOpen((x) => !x)}
                    >
                      <img src={editCustomerIcon} alt="customer edit icon" />
                    </Link>
                  </td>

                  <td data-cell="Delete">
                    <img
                      src={deleteCustomerIcon}
                      alt="customer delete icon"
                      onClick={() =>
                        handleDeleteUser(
                          customer.id,
                          customer.first_name,
                          customer.last_name
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
            {!filteredCustomerResults.length && (
              <tr>
                <td data-cell="Status" colSpan="11">
                  No customer found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default ContactView;

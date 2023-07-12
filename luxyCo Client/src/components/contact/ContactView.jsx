import "../../sass/contact/_contactView.scss";
import detailsIcon from "../../assets/detailsIcon.svg";
import deleteCustomerIcon from "../../assets/deleteIcon.svg";
import editCustomerIcon from "../../assets/editIcon.svg";
import { Link } from "react-router-dom";

const ContactView = ({
  filteredCustomerResults,
  handleDeleteUser,
  setPopupOpen,
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
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.street}</td>
                  <td>{customer.city}</td>
                  <td>{customer.postalCode}</td>
                  <td>{customer.phone_number.match(/.{1,3}/g).join("-")}</td>

                  <td>
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

                  <td>
                    <Link
                      to={`/contact/edit/${customer.id}`}
                      onClick={() => setPopupOpen((x) => !x)}
                    >
                      <img src={editCustomerIcon} alt="customer edit icon" />
                    </Link>
                  </td>

                  <td>
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
                <td colSpan="11">No customer found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactView;

import "../../sass/contact/_contactView.scss";
import detailsIcon from "../../assets/detailsIcon.svg";
import deleteCustomerIcon from "../../assets/deleteIcon.svg";
import editCustomerIcon from "../../assets/editIcon.svg";

const ContactView = ({ filteredCustomerResults, handleDeleteUser }) => {
  console.log(filteredCustomerResults);
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
                  <td>{customer.phone_number}</td>
                  <td>
                    <img src={detailsIcon} alt="customer details icon" />
                  </td>

                  <td>
                    <img src={editCustomerIcon} alt="customer edit icon" />
                  </td>

                  <td>
                    <img
                      src={deleteCustomerIcon}
                      alt="customer delete icon"
                      onClick={() =>
                        handleDeleteUser(customer.id, customer.first_name)
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

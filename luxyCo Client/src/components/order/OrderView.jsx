import "../../sass/order/_orderView.scss";
import PDFGenerator from "./GeneratePDF";
import deleteIcon from "../../assets/deleteIcon.svg";
import updateIcon from "../../assets/updateIcon.svg";
import { Link } from "react-router-dom";

const OrderView = ({
  data,
  orderStatus,
  searchOrder,
  handleSelectedOrder,
  userInfo,
  handleDeleteOrder,
  setPopupOpen,
}) => {
  // User to search orders by FirstName, LastName, and Street

  const search = searchOrder
    ? data.filter((order) => {
        const searchValue = searchOrder.toLowerCase().trim();

        const firstNameMatch = order.first_name
          ? order.first_name.toLowerCase().includes(searchValue)
          : "";

        const lastNameMatch = order.last_name
          ? order.last_name.toLowerCase().includes(searchValue)
          : "";
        const streetMatch = order.street
          ? order.street.toLowerCase().includes(searchValue)
          : "";
        return (
          (orderStatus === "all" || order.status_name === orderStatus) &&
          (firstNameMatch || lastNameMatch || streetMatch)
        );
      })
    : orderStatus === "all"
    ? data
    : data.filter((order) => order.status_name === orderStatus);

  const totalm2 = search.length
    ? search.map((order) => order.m2).reduce((acc, mov) => +acc + +mov)
    : "";

  const handleSelectOrder = (order) => {
    handleSelectedOrder(order);
  };

  return (
    <div className="orderTableContainer">
      <div className="buttonContainer"></div>
      {search ? (
        <table className="orderTable">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Service Type</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Scheduled Date</th>
              <th>
                m<sup>2</sup>
              </th>
              <th>Pieces</th>
              <th>Delivery</th>
              <th>Created By</th>
              <th>Edit</th>
              {(userInfo.department === 2 || userInfo.department === 3) && (
                <th>Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {search.map((order) => (
              <tr key={order.id}>
                <td data-cell="Order Id"> {order.id}</td>
                <td
                  data-cell="Customer"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectOrder(order)}
                >{`${order?.first_name ?? "customer deleted"} ${
                  order?.last_name ?? ""
                }`}</td>

                <td data-cell="Address">{`${order?.street ?? ""} - ${
                  order?.city ?? ""
                }`}</td>
                <td data-cell="Service Type">
                  {order?.service_name ?? "service removed"}
                </td>
                <td data-cell="Order Status">{order?.status_name}</td>

                <td data-cell="Order Date">
                  {new Date(order?.order_date)
                    .toISOString()
                    .slice(0, 19)
                    .replaceAll("-", ".")
                    .replace("T", " ") ?? "no data added"}
                </td>

                <td data-cell="Total Price">
                  {order?.total_price ?? "no price added"} €
                </td>
                <td data-cell="Scheduled Date">
                  {order.scheduled_date
                    ? new Date(
                        new Date(order.scheduled_date).getTime() +
                          24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .slice(0, 10)
                    : "no scheduled date"}
                </td>
                <td data-cell="m2">{order?.m2 ?? "not provided"}</td>
                <td data-cell="Pieces">{order?.pieces ?? "not provided"}</td>
                <td data-cell="Delivery">
                  {order.delivery === 0 ? "no" : "yes"}
                </td>
                <td data-cell="Created By">
                  {order?.username ?? "user deleted"}
                </td>
                <td data-cell="Edit">
                  <Link
                    to={
                      `/order/edit/${order.id}`
                        ? `/order/edit/${order.id}`
                        : `/order/`
                    }
                    onClick={() => setPopupOpen((x) => !x)}
                  >
                    <img src={updateIcon} alt="update order icon" />
                  </Link>
                </td>

                {(userInfo.department === 2 || userInfo.department === 3) && (
                  <td data-cell="Delete">
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      style={{ width: "24px" }}
                      onClick={() => handleDeleteOrder(order.id)}
                    />
                  </td>
                )}
              </tr>
            ))}

            {totalm2 ? (
              <tr>
                <th colSpan="7"></th>
                <th colSpan="1">Total</th>
                <td data-cell="Total" colSpan="1">
                  {totalm2} m²
                </td>
                <td data-cell="Download">
                  <PDFGenerator data={search} />
                </td>
              </tr>
            ) : (
              <tr>
                <td data-cell="Status" colSpan="11">
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderView;

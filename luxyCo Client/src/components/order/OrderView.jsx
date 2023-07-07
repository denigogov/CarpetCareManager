import "../../sass/order/_orderView.scss";
import PDFGenerator from "./GeneratePDF";

const OrderView = ({ data, orderStatus, searchOrder }) => {
  const search = searchOrder
    ? data.filter((order) => {
        const searchValue = searchOrder.toLowerCase().trim();

        const firstNameMatch = order.first_name
          .toLowerCase()
          .includes(searchValue);
        const lastNameMatch = order.last_name
          .toLowerCase()
          .includes(searchValue);
        const statusMatch = order.street.toLowerCase().includes(searchValue);
        return (
          (orderStatus === "all" || order.status_name === orderStatus) &&
          (firstNameMatch || lastNameMatch || statusMatch)
        );
      })
    : orderStatus === "all"
    ? data
    : data.filter((order) => order.status_name === orderStatus);

  const totalm2 = search.length
    ? search.map((order) => order.m2).reduce((acc, mov) => +acc + +mov)
    : "";

  return (
    <div className="orderTableContainer">
      <div className="buttonContainer"></div>
      {search ? (
        <table className="orderTable">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Scheduled Date</th>
              <th>
                m<sup>2</sup>
              </th>
              <th>Delivery</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {search.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{`${order.first_name} ${order.last_name}`}</td>
                <td>{order.street}</td>
                <td>{order.status_name}</td>
                <td>
                  {new Date(order.order_date)
                    .toISOString()
                    .slice(0, 19)
                    .replaceAll("-", ".")
                    .replace("T", " ")}
                </td>

                <td>{order.total_price} $</td>
                <td>
                  {order.scheduled_date
                    ? new Date(
                        new Date(order.scheduled_date).getTime() +
                          24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .slice(0, 10)
                    : "no scheduled date"}
                </td>
                <td>{order.m2}</td>
                <td>{order.delivery === 0 ? "no" : "yes"}</td>
                <td>{order.username ? order.username : "user deleted"}</td>
              </tr>
            ))}

            {totalm2 ? (
              <tr>
                <th colSpan="7"></th>
                <th colSpan="1">Total</th>
                <td colSpan="1">{totalm2} m²</td>
                <td>
                  {" "}
                  <PDFGenerator data={search} />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="11">No order found</td>
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

import "../../sass/order/_orderView.scss";

const OrderView = ({ data, orderStatus }) => {
  const status =
    orderStatus === "all"
      ? data
      : data.filter((order) => order.status_name === orderStatus);

  const totalm2 = status.length
    ? status.map((order) => order.m2).reduce((acc, mov) => +acc + +mov)
    : "";

  console.log(status);

  return (
    <div className="orderTableContainer">
      {status ? (
        <table className="orderTable">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Carpet Pieces</th>
              <th>Total Price</th>
              <th>
                m<sup>2</sup>
              </th>
              <th>Delivery</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {status.map((order) => (
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
                <td>{order.carpet_pieces}</td>
                <td>{order.total_price} $</td>
                <td>{order.m2}</td>
                <td>{order.delivery === 0 ? "no" : "yes"}</td>
                <td>{order.username ? order.username : "user deleted"}</td>
              </tr>
            ))}

            {totalm2 ? (
              <tr>
                <th colSpan="6"></th>
                <th colSpan="1">Total</th>
                <td colSpan="1">{totalm2} m²</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="9">No order found</td>
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

import "../../sass/order/_orderView.scss";

const OrderView = ({ data }) => {
  console.log(data);
  return (
    <div className="orderTableContainer">
      <table className="orderTable">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Custumer</th>
            <th>Address</th>
            <th>Order Status</th>
            <th>Order Date</th>
            <th>Carpet Pieces</th>
            <th>Total Price</th>
            <th>m2</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{`${order.first_name} ${order.last_name}`}</td>
              <td>{order.street}</td>
              <td>{order.status_name}</td>
              <td>{order.order_date}</td>
              <td>{order.carpet_pieces}</td>
              <td>{order.total_price} $</td>
              <td>{order.m2}</td>
              <td>{order.delivery === 0 ? "no" : "yes"}</td>
            </tr>
          ))}
          <th>
            <tr>total</tr>
          </th>
          <tr>299 m2</tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;

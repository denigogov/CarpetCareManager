import { tr } from "date-fns/locale";
import "../../sass/delivery/_searchOrderView.scss";

const SearchOrderView = ({ ordersBySchedueledDate, filterData }) => {
  return (
    <div>
      <div className="table-searchOrderView">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>m²</th>
              <th>Pieces</th>
              <th>Price</th>
              <th>Service</th>
              <th>Status</th>
              <th>Scheduled Date</th>
            </tr>
          </thead>
          <tbody>
            {ordersBySchedueledDate
              ? filterData.map((order, index) => {
                  return (
                    <tr key={order.id}>
                      <td data-cell="#">{index + 1}</td>
                      <td data-cell="Order ID">{order.id}</td>
                      <td data-cell="Customer">
                        {order?.first_name ?? "custumer not exist"}{" "}
                        {order.last_name}
                      </td>
                      <td data-cell="m2">{order?.m2 ?? "no m² added"}</td>
                      <td data-cell="Pieces">
                        {order?.pieces ?? "no pieces added"}
                      </td>
                      <td data-cell="Price">
                        {order?.total_price ?? "no price added"}
                      </td>
                      <td data-cell="Service">
                        {order?.service_name ?? "service  not exist"}
                      </td>
                      <td data-cell="Status">
                        {order?.status_name ?? "status not exist"}
                      </td>
                      <td data-cell="Scheduled Date">
                        {order.scheduled_date
                          ? new Date(order.scheduled_date)
                              .toISOString()
                              .slice(0, 10)
                          : "no scheduled date"}
                      </td>
                    </tr>
                  );
                })
              : ""}
            {filterData.length < 1 ? (
              <tr>
                <td colSpan="8"> no orders found</td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchOrderView;

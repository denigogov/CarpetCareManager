import { tr } from 'date-fns/locale';
import '../../sass/delivery/_searchOrderView.scss';

const SearchOrderView = ({
  ordersBySchedueledDate,
  searchByStatus,
  inputSearchValue,
}) => {
  const filterData = inputSearchValue
    ? ordersBySchedueledDate.filter(order => {
        const searchValue = inputSearchValue.toLowerCase().trim();

        const firstNameMatch = order.first_name
          ? order.first_name.toLowerCase().includes(searchValue)
          : '';

        const lastNameMatch = order.last_name
          ? order.last_name.toLowerCase().includes(searchValue)
          : '';

        return (
          (searchByStatus === 'all' || order.status_name === searchByStatus) &&
          (firstNameMatch || lastNameMatch)
        );
      })
    : searchByStatus === 'all'
    ? ordersBySchedueledDate
    : ordersBySchedueledDate.filter(
        order => order.status_name === searchByStatus
      );

  return (
    <div>
      <div className="table-searchOrderView">
        <table>
          <thead>
            <tr>
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
              ? filterData.map(order => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.first_name} {order.last_name}
                      </td>
                      <td>{order.m2}</td>
                      <td>{order.pieces}</td>
                      <td>{order.total_price}</td>
                      <td>{order.service_name}</td>
                      <td>{order.status_name}</td>
                      <td>
                        {order.scheduled_date
                          ? new Date(order.scheduled_date)
                              .toISOString()
                              .slice(0, 10)
                          : 'no scheduled date'}
                      </td>
                    </tr>
                  );
                })
              : ''}
            {filterData.length < 1 ? (
              <tr>
                {' '}
                <td colSpan="8"> no orders found</td>
              </tr>
            ) : (
              ''
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchOrderView;

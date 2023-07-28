import '../../sass/delivery/_searchOrderView.scss';

const SearchOrderView = () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>191</td>
              <td>Dejan Gogov</td>
              <td>15</td>
              <td>3</td>
              <td>150</td>
              <td>carpet Premium</td>
              <td>pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchOrderView;

import { useLoaderData } from 'react-router-dom';
import DetailsView from '../../components/contact/DetailsView';
import { useState } from 'react';
import DetailsPDFCustomer from './DetailsPDFCustomer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const DetailsContact = ({ token }) => {
  const fetchCustomerOrders = useLoaderData(token);

  const [totalPrice, setTotalPrice] = useState(null);
  const [totalM2, setTotalM2] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  console.log(startDate);
  console.log(endDate);
  return (
    <div className="detailsView--container">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={update => {
          setDateRange(update);
        }}
        isClearable={true}
        placeholderText="select date period"
      />
      <DetailsView
        fetchCustomerOrders={fetchCustomerOrders}
        setTotalM2={setTotalM2}
        setTotalPrice={setTotalPrice}
      />

      <div className="details--calculation">
        {totalM2 && (
          <h4>
            Total Size:
            <span style={{ fontWeight: '400' }}>{totalM2.toFixed(2)} m²</span>
          </h4>
        )}

        {totalPrice && (
          <h4>
            Total Price:
            <span style={{ fontWeight: '400' }}>{totalPrice.toFixed(2)} €</span>
          </h4>
        )}
      </div>
      <p>need to setup data range and pdf </p>

      <div>
        <DetailsPDFCustomer />
      </div>
    </div>
  );
};

export default DetailsContact;

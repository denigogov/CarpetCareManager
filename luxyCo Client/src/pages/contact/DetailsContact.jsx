import { useLoaderData } from 'react-router-dom';
import DetailsView from '../../components/contact/DetailsView';
import { useState } from 'react';
import DetailsPDFCustomer from './DetailsPDFCustomer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import downloadIcon from '../../assets/downloadIcon.svg';

const DetailsContact = ({ token }) => {
  const fetchCustomerOrders = useLoaderData(token);

  const [totalPrice, setTotalPrice] = useState(null);
  const [totalM2, setTotalM2] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // console.log(startDate, 'start');
  // console.log(endDate, 'end');

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const filteredOrders = fetchCustomerOrders.filter(order => {
    const orderDate = new Date(order.order_date);
    const isAfterStartDate = !startDate || orderDate >= startDate;
    // to show date also for the endDate month
    const isBeforeEndDate =
      !endDate ||
      orderDate <= new Date(endDate.getFullYear(), endDate.getMonth() + 1);

    return isAfterStartDate && isBeforeEndDate;
  });

  console.log(fetchCustomerOrders);

  return (
    <div className="detailsView--container">
      <DetailsView
        fetchCustomerOrders={endDate ? filteredOrders : fetchCustomerOrders}
        setTotalM2={setTotalM2}
        setTotalPrice={setTotalPrice}
      />

      <div className="details--calculation">
        {totalM2 && (
          <h4>
            Total Size:<> </>
            <span style={{ fontWeight: '400' }}>{totalM2.toFixed(2)} m²</span>
          </h4>
        )}

        {totalPrice && (
          <h4>
            Total Price:<> </>
            <span style={{ fontWeight: '400' }}>{totalPrice.toFixed(2)} €</span>
          </h4>
        )}

        <DatePicker
          className="datePicker--contactDetails"
          onChange={handleChange}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          maxDate={new Date()}
        />

        <div>
          {fetchCustomerOrders && (
            <PDFDownloadLink
              document={
                <DetailsPDFCustomer
                  orders={endDate ? filteredOrders : fetchCustomerOrders}
                />
              }
              fileName="customer_orders.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  ''
                ) : (
                  <img
                    style={{ width: '30px' }}
                    src={downloadIcon}
                    alt="download pdf file"
                  />
                )
              }
            </PDFDownloadLink>
          )}

          {/* JUST FOR VIEW THE PDF WHEN EDIT */}
          {/* {fetchCustomerOrders.length > 0 && (
            <DetailsPDFCustomer
              orders={endDate ? filteredOrders : fetchCustomerOrders}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default DetailsContact;

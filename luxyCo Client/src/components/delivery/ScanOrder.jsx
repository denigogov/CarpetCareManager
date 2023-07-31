import { useEffect, useState } from 'react';
import '../../sass/delivery/scanOrder.scss';
import { fetchOrdersById } from '../../api';
import ScanedOrderView from './ScanedOrderView';

const ScanOrder = ({ token, orderStatus }) => {
  const [scanedOrderId, setScanedOrderId] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [fetchedOrderById, setFetchedOrderById] = useState(null);
  const [error, setError] = useState('');

  // Fetching the order by ID
  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        if (orderId) {
          const data = await fetchOrdersById(orderId, token);
          setFetchedOrderById(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrderById();
  }, [orderId, token]);

  const handleForm = e => {
    e.preventDefault();
    setOrderId(scanedOrderId);
    setScanedOrderId('');
  };

  const handleClose = () => {
    setFetchedOrderById(null);
    setOrderId(null);
    // cleaning the error!
    setError('');
  };

  return (
    <div className="scanOrder--wrap">
      {fetchedOrderById ? (
        <div className="scanedOrderView__container">
          <button className="closeBtn" onClick={handleClose}>
            &times;
          </button>
          <ScanedOrderView
            fetchedOrderById={fetchedOrderById}
            token={token}
            orderStatus={orderStatus}
          />
        </div>
      ) : (
        <div>
          <div className="scanOrder--title">
            <h3>Order Enrty</h3>
            <p>Scan or Write Your Orders Here</p>
          </div>

          <form onSubmit={handleForm}>
            <input
              type="text"
              placeholder="Enter Order ID"
              value={scanedOrderId}
              onChange={e => setScanedOrderId(e.target.value)}
            />
          </form>

          <p className="errorMessage">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ScanOrder;

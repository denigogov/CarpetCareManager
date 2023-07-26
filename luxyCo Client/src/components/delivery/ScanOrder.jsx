import { useEffect, useState } from 'react';
import '../../sass/delivery/scanOrder.scss';
import { fetchOrdersById } from '../../api';
import ScanedOrderView from './ScanedOrderView';

const ScanOrder = ({ token }) => {
  const [scanedOrderId, setScanedOrderId] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [fetchedOrderById, setFetchedOrderById] = useState(null);

  useEffect(() => {
    const fetchOrderById = async () => {
      const data = await fetchOrdersById(orderId, token);
      setFetchedOrderById(data);
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
  };

  return (
    <div className="scanOrder--wrap">
      {fetchedOrderById ? (
        <div>
          <ScanedOrderView fetchedOrderById={fetchedOrderById} />{' '}
          <button onClick={handleClose}>close</button>
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
        </div>
      )}
    </div>
  );
};

export default ScanOrder;

import '../../sass/dashboard/_customerOrderStat.scss';

const CustomerOrderStat = ({ statisticOrderByStatus }) => {
  const totalOrderStatusId1 = statisticOrderByStatus.find(
    order => order.order_status_id === 1
  );
  const totalOrderStatusId2 = statisticOrderByStatus.find(
    order => order.order_status_id === 2
  );
  const totalOrderStatusId3 = statisticOrderByStatus.find(
    order => order.order_status_id === 3
  );

  console.log(totalOrderStatusId1);

  return (
    <div className="customerStat--orders">
      <div>
        <p className="stat-subTitle">in progress</p>
        <p className="stat-subTitle--value">{totalOrderStatusId2.orders}</p>
      </div>

      <div>
        <p className="stat-subTitle">waiting for delivery</p>
        <p className="stat-subTitle--value">{totalOrderStatusId3.orders}</p>
      </div>

      <div>
        <p className="stat-subTitle">waiting for process</p>
        <p className="stat-subTitle--value">{totalOrderStatusId1.orders}</p>
      </div>

      <div>
        <p className="stat-subTitle">Avg order per Customer</p>
        <p className="stat-subTitle--value">
          {totalOrderStatusId1.average_order_frequency.substring(0, 4)}
        </p>
      </div>

      <div>
        <p className="stat-subTitle">Avg Ordering Time</p>
        <p className="stat-subTitle--value">
          {totalOrderStatusId1.average_ordering_time.substring(0, 4)}
          <span
            style={{
              fontWeight: '300',
              fontSize: '13px',
              textTransform: 'lowercase',
            }}
          >
            {' '}
            days
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomerOrderStat;

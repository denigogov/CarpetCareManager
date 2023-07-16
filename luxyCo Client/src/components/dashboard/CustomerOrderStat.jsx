import '../../sass/dashboard/_customerOrderStat.scss';

const CustomerOrderStat = ({ statisticOrderByStatus }) => {
  return (
    <div className="customerStat--orders">
      <div>
        <p className="stat-subTitle">in progress</p>
        <p className="stat-subTitle--value">20</p>
      </div>

      <div>
        <p className="stat-subTitle">waiting for delivery</p>
        <p className="stat-subTitle--value">20</p>
      </div>

      <div>
        <p className="stat-subTitle">waiting for process</p>
        <p className="stat-subTitle--value">{}</p>
      </div>

      <div>
        <p className="stat-subTitle">Avg order per Customer</p>
        <p className="stat-subTitle--value">20</p>
      </div>

      <div>
        <p className="stat-subTitle">Avg Ordering Time</p>
        <p className="stat-subTitle--value">20</p>
      </div>
    </div>
  );
};

export default CustomerOrderStat;

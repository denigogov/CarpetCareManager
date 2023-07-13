import "../../sass/dashboard/_numericStatsBox.scss";

const NumericStatsBox = () => {
  return (
    <div className="numericStatsBox--container">
      <div className="totalM2">
        <p>Total Area</p>
        <p>400m2</p>
      </div>

      <div className="totalSales">
        <p>Total Sales</p>
        <p>10000$</p>
      </div>

      <div className="totalOrders">
        <p>Number of Orders</p>
        <p>150</p>
      </div>
    </div>
  );
};

export default NumericStatsBox;

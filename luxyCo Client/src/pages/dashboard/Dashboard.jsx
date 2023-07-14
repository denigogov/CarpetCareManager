import "../../sass/dashboard/_dashboard.scss";
import { useState } from "react";
import NumericStatsBox from "../../components/dashboard/NumericStatsBox";
import Calculator from "../../components/dashboard/Calculator";

const Dashboard = ({ token }) => {
  return (
    <div className="dashboard--container">
      {/* showing total orders.... */}
      <div className="numericStats--box">
        <NumericStatsBox token={token} />
      </div>

      <div className="calculator--container">
        <p className="calculator--title">
          Personalized carpet measurement calculator for seamless accuracy.
        </p>
        <Calculator token={token} />
      </div>
      <div className="dashboard--3">container 3</div>
      <div className="dashboard--4">container 4</div>
    </div>
  );
};

export default Dashboard;

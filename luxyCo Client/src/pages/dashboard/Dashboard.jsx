import "../../sass/dashboard/_dashboard.scss";
import { useState } from "react";
import NumericStatsBox from "../../components/dashboard/NumericStatsBox";
import Calculator from "../../components/dashboard/Calculator";
import { fetchOrderStatisticByDay } from "../../api";
import useSWR, { useSWRConfig } from "swr";

const Dashboard = ({ token }) => {
  const {
    data: statisticOrderByDay,
    error: statisticOrderByDayError,
    isLoading: statisticOrderByDayLoading,
  } = useSWR(["statisticOrderByDay", token], () =>
    fetchOrderStatisticByDay(token)
  );
  if (statisticOrderByDayError) return <h6>{error.message}</h6>; // I need to add personal error messages!
  if (statisticOrderByDayLoading) return <h3>loading...</h3>;

  // Data for CHART JS
  const orderStatisticByDay = {
    labels: statisticOrderByDay.map((label) => label.day_of_week),
    datasets: [
      {
        label: "orders counter per day",
        data: statisticOrderByDay.map((label) => label.order_count),
        backgroundColor: ["rgba(245, 92, 132)"],
        borderColor: ["rgba(255, 99, 132, 0.6)"],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const totalM2 = statisticOrderByDay.map((m2) => m2.total_m2);

  return (
    <div className="dashboard--container">
      {/* showing total orders.... */}
      <div className="numericStats--box">
        <NumericStatsBox chartData={orderStatisticByDay} totalM2={totalM2} />
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

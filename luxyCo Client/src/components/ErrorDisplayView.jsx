import "../sass/_errorDisplayMessage.scss";
import { Link } from "react-router-dom";

const ErrorDisplayView = ({ errorMessage, navigateTo1, navigateTo2 }) => {
  return (
    <div className="errorContainer">
      <div className="wrapper">
        <div className="message">
          <h2>Oops! Something went wrong</h2>
          <p style={{ color: "#636363", fontSize: "18px" }}>{errorMessage}</p>
          <p>go back to</p>
          <Link to={navigateTo1}>Dashboard</Link>
          <Link to={navigateTo2}>View All Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayView;

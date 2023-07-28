import '../sass/_errorDisplayMessage.scss';
import { Link } from 'react-router-dom';

const ErrorDisplayView = ({ errorMessage, navigateTo1, navigateTo2 }) => {
  return (
    <div className="errorContainer">
      <div className="wrapper">
        <div className="message">
          <h2>Oops! Something went wrong</h2>
          <p style={{ color: '#636363', fontSize: '16px' }}>{errorMessage}</p>
          <div
            className="navigateTo"
            style={{
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p>Navigate to</p>
            <Link to={navigateTo1}>{navigateTo1.replace('/', '')}</Link>
            <Link to={navigateTo2}>{navigateTo2.replace('/', '')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayView;

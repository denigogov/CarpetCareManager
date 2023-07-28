import LoadingView from '../../components/LoadingView';
import '../../sass/delivery/_delivery.scss';
import ScanOrder from '../../components/delivery/ScanOrder';
import SearchOrderNav from '../../components/delivery/SearchOrderNav';
import SearchOrderView from '../../components/delivery/SearchOrderView';

const Delivery = ({ token }) => {
  return (
    <div className="delivery--container">
      <div className="delivery__container--scan">
        <div className="delivery--scan">
          <ScanOrder token={token} />
        </div>

        <div>something other</div>
      </div>
      <div className="searchOrderNav">
        <SearchOrderNav />
        <SearchOrderView />
      </div>
    </div>
  );
};

export default Delivery;

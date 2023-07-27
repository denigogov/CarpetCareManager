import LoadingView from '../../components/LoadingView';
import '../../sass/delivery/_delivery.scss';
import ScanOrder from '../../components/delivery/ScanOrder';
import { useState } from 'react';

const Delivery = ({ token }) => {
  return (
    <div className="delivery--container">
      <div className="delivery__container--scan">
        <div className="delivery--scan">
          <ScanOrder token={token} />
        </div>

        <div>something other</div>
      </div>
      <div>rigth</div>
    </div>
  );
};

export default Delivery;

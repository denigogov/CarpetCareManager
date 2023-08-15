import { useRef } from 'react';
import '../../../sass/management/price/_createServiceView.scss';
import ApiSendRequestMessage from '../../ApiSendRequestMessage';

const CreateServiceView = ({ handleCreateService, success, errorMessage }) => {
  const serviceName = useRef(null);
  const servicePrice = useRef(null);

  const handleCreateServiceClick = e => {
    const inputData = {
      service_name: serviceName.current.value,
      service_price: servicePrice.current.value,
    };
    e.preventDefault();
    handleCreateService(inputData);
  };

  return (
    <div className="createService">
      <p>Crete New Service</p>

      <form>
        <input
          ref={serviceName}
          type="text"
          name="serviceName"
          required
          placeholder="service name"
          disabled={success}
        />

        <input
          ref={servicePrice}
          type="number"
          min="0"
          step=".01"
          placeholder="service price"
          disabled={success}
        />

        {!success && <button onClick={handleCreateServiceClick}>submit</button>}
      </form>

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default CreateServiceView;

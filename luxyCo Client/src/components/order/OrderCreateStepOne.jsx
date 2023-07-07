import { useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import "../../sass/order/_orderCreateStepOne.scss";
import OrderStepTwo from "./OrderStepTwo";

const OrderCreate = ({ services, orderServices, token, customers }) => {
  const [servicePrice, setServicePrice] = useState(0);
  const [m2, setm2] = useState(0);
  const [delivery, setDelivery] = useState(false);
  const [serviceTypeId, setServiceTypeId] = useState(null);
  const [nextStepMessage, setNextStepMessage] = useState(false);
  const [error, setError] = useState("");

  const { mutate } = useSWRConfig();
  const takePiecesRef = useRef(null);

  const serviceDataStoringRef = useRef({});
  const priceCalculate = servicePrice ? servicePrice * m2 : 0.0;

  // Values that I need for STEP 2
  const orderServiceLastId = orderServices.map((service) => service.id).pop();
  const totalPrice = delivery ? priceCalculate + 2 : priceCalculate;
  const customerLastId = customers.map((customer) => customer.id).pop();
  // delivery also

  const selectService = (e) => {
    const selectedService = JSON.parse(e.target.value);
    setServicePrice(selectedService.service_price);
    setServiceTypeId(selectedService.id);
  };

  // console.log(lastIdNumber + 1);

  const handleStepOne = (e) => {
    e.preventDefault();

    const data = {
      service_id: serviceTypeId,
      m2: parseInt(m2),
      pieces: parseInt(takePiecesRef.current.value),
    };
    serviceDataStoringRef.current = data;

    if (!serviceTypeId || !m2 || !takePiecesRef.current.value) {
      setError("Please fill in all the required fields.");
      return;
    }

    const createOrderStepOne = async () => {
      try {
        const res = await fetch(`http://localhost:4000/table/orderServices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(serviceDataStoringRef.current),
        });

        if (res.ok) {
          mutate("http://localhost:4000/table/orderServices"); // mutate is  Refresh the users data
          setNextStepMessage(true);
        }
      } catch (error) {
        setError("Error creating order", error);
      }
    };
    createOrderStepOne();
  };

  return (
    <div className="OrderCreateStepOne">
      <form className="orderInput--wrap">
        <select onChange={selectService} disabled={nextStepMessage}>
          <option value="">Service Type</option>
          {services.map((service) => (
            <option value={JSON.stringify(service)} key={service.id}>
              {service.service_name}
            </option>
          ))}
        </select>

        <input
          required
          placeholder="carpet size in m²"
          type="number"
          min="0"
          onChange={(e) => setm2(e.target.value)}
          disabled={nextStepMessage}
        />

        <input
          required
          type="number"
          min="0"
          ref={takePiecesRef}
          placeholder="add carpet pieces"
          disabled={nextStepMessage}
        />

        <label>delivery</label>
        <input
          type="checkbox"
          disabled={nextStepMessage}
          onChange={(e) => setDelivery(e.target.checked)}
        />
      </form>

      <div className="totalPrice">
        {nextStepMessage && (
          <OrderStepTwo customers={customers} token={token} />
        )}
        {totalPrice.length > 1 ? "" : <p>price: {totalPrice.toFixed(2)} €</p>}
        {!nextStepMessage && <p className="errorMessage">{error}</p>}
        {!nextStepMessage && (
          <button onClick={handleStepOne} className="stepOneBtn">
            next
          </button>
        )}
      </div>

      {/* I need only for styling view I will delete after styling everything */}
      {/* <OrderStepTwo customers={customers} token={token} /> */}
    </div>
  );
};

export default OrderCreate;

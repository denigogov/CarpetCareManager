import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../sass/order/_orderStepThree.scss";
import { format } from "date-fns";

const OrderStepThree = ({
  customerLastId,
  selectedUserId,
  totalPrice,
  orderServiceLastId,
  delivery,
  userInfo,
  token,
}) => {
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [error, setError] = useState("");
  const [orderSuccessful, setOrderSuccessful] = useState("");

  const formattedDate = format(scheduleDate, "yyyy/MM/dd");

  const orderValues = {
    customer_id: selectedUserId !== undefined ? selectedUserId : customerLastId,
    user_id: userInfo.id,
    total_price: totalPrice,
    delivery: delivery,
    orderService_id: orderServiceLastId,
    scheduled_date: formattedDate,
  };

  const sendOrder = () => {
    const createOrder = async () => {
      try {
        const res = await fetch(`http://localhost:4000/table/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderValues),
        });

        if (res.ok) {
          setOrderSuccessful("Order added. Success!");
        }
      } catch (error) {
        setError("Error creating order", error);
      }
    };
    createOrder();
  };

  return (
    <div className="orderStepThree--container">
      <div className="dataPicker">
        <p>add Schedule Date</p>
        <DatePicker
          selected={scheduleDate}
          onChange={(date) => setScheduleDate(date)}
          dateFormat="yyyy/MM/dd"
          disabled={orderSuccessful}
        />
        <button onClick={sendOrder}>create order</button>
        <p className="successfulMessage">{orderSuccessful}</p>
        <p className="errorMessage">{error}</p>
      </div>
    </div>
  );
};

export default OrderStepThree;

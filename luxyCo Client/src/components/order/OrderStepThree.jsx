import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../sass/order/_orderStepThree.scss';
import { format } from 'date-fns';

const OrderStepThree = ({ setDateForrmated }) => {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const scheduleDateSetup = date => {
    const formattedDate = format(date, 'yyyy/MM/dd');
    setScheduleDate(date);
    setDateForrmated(formattedDate);
  };

  return (
    <div className="dataPicker">
      <p>add Schedule Date</p>
      <DatePicker
        selected={scheduleDate}
        onChange={date => scheduleDateSetup(date)}
        dateFormat="yyyy/MM/dd"
        minDate={new Date()}
      />
    </div>
  );
};

export default OrderStepThree;

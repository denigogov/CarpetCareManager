const EditOrderUserView = ({
  fetchOrderById,
  orderStatusConfig,
  setScheduleDate,
  orderStatusRef,
  piecesRef,
  formatedDate,
  today,
}) => {
  return (
    <div className="editOrder--userView">
      <label>order status</label>
      <select ref={orderStatusRef}>
        <option value={fetchOrderById.order_status_id}>
          {fetchOrderById.status_name}
        </option>
        {orderStatusConfig.map((status) => (
          <option value={status.id} key={status.id}>
            {status.status_name}
          </option>
        ))}
      </select>
      <label>pieces</label>
      <input type="tel" defaultValue={fetchOrderById.pieces} ref={piecesRef} />
      <label>scheduled date</label>
      <input
        min={today}
        defaultValue={formatedDate}
        type="date"
        onChange={(e) => setScheduleDate(e.target.value)}
      />
    </div>
  );
};

export default EditOrderUserView;

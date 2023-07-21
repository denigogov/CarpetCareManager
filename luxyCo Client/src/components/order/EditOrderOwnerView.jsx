const EditOrderOwnerView = ({
  fetchOrderById,
  totalPriceRef,
  deliveryRef,
  m2Ref,
}) => {
  return (
    <div className="editOrder--ownerView">
      <label>total price</label>
      <input
        type="number"
        defaultValue={fetchOrderById.total_price}
        ref={totalPriceRef}
      />
      <label>m²</label>
      <input type="number" defaultValue={fetchOrderById.m2} ref={m2Ref} />
      <label>Delivery</label>
      <select ref={deliveryRef} defaultValue={fetchOrderById.delivery}>
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>
  );
};

export default EditOrderOwnerView;

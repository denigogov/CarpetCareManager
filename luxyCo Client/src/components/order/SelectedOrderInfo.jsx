const SelectedOrderInfo = ({ selectedOrder }) => {
  return (
    <div>
      <p>
        {/* I need to show all details about the order and to remove some fileds
        from the table{" "} */}
        all info about the order will be here
      </p>
      <p>{selectedOrder.first_name}</p>
    </div>
  );
};

export default SelectedOrderInfo;

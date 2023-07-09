const SelectedOrderInfo = ({ selectedOrder }) => {
  return (
    <div>
      <p>
        I need to show all details about the order and to remove some fileds
        from the table{" "}
      </p>
      <p>{selectedOrder.first_name}</p>
    </div>
  );
};

export default SelectedOrderInfo;

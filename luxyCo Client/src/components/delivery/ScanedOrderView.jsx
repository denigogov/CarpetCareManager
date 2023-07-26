const ScanedOrderView = ({ fetchedOrderById }) => {
  console.log(fetchedOrderById);
  return (
    <div>
      {fetchedOrderById.first_name
        ? fetchedOrderById.first_name
        : 'user deleted'}
    </div>
  );
};

export default ScanedOrderView;

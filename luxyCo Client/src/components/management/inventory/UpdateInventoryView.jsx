import { useRef } from 'react';

const UpdateInventoryView = ({
  selectedInventoryData,
  inventoryCategory,
  formSubmitUpdate,
}) => {
  const articleNameRef = useRef(null);
  const articleDetailsRef = useRef(null);
  const articleQuantityRef = useRef(null);
  const selectedCategoryRef = useRef(null);
  const locationRef = useRef(null);
  const priceRef = useRef(null);

  const handleUpdateBtn = () => {
    const updateData = {
      article_name:
        articleNameRef.current?.value ?? selectedInventoryData.article_name,
      details:
        articleDetailsRef.current?.value ?? selectedInventoryData.details,
      quantity:
        +articleQuantityRef.current?.value ?? +selectedInventoryData.quantity,
      location: locationRef.current?.value ?? selectedInventoryData.location,
      price: priceRef.current?.value ?? selectedInventoryData.price,
      category_id:
        +selectedCategoryRef.current?.value ??
        +selectedInventoryData.category_id,
    };

    formSubmitUpdate(updateData);
  };
  return (
    <div>
      <div className="createInventory">
        <p>Update Inventory</p>

        <p>Inventory Number: {selectedInventoryData.article_number}</p>

        <form>
          <div className="createInventory--left">
            <label>Article Name</label>
            <input
              type="text"
              placeholder="Article Name"
              defaultValue={selectedInventoryData.article_name}
              ref={articleNameRef}
              required
            />
            <label>Details</label>
            <input
              type="text"
              placeholder="details"
              defaultValue={selectedInventoryData.details}
              ref={articleDetailsRef}
            />

            <label>Quantity</label>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              defaultValue={selectedInventoryData.quantity}
              required
              ref={articleQuantityRef}
            />
          </div>
          <div className="createInventory--right">
            <label>Article Category</label>
            <select ref={selectedCategoryRef}>
              <option value={selectedInventoryData.category_id}>
                {selectedInventoryData.category_name}
              </option>
              {inventoryCategory.map((i, indx) => {
                return (
                  <option value={i.id} key={indx}>
                    {i.category_name}
                  </option>
                );
              })}
            </select>
            <label>Location</label>
            <input
              type="text"
              placeholder="Location"
              defaultValue={selectedInventoryData.location}
              ref={locationRef}
            />

            <label>Price</label>
            <input
              type="number"
              min="0"
              step=".01"
              placeholder="Price €"
              defaultValue={selectedInventoryData.price}
              ref={priceRef}
            />
          </div>
        </form>
        <button onClick={handleUpdateBtn}>update inventory</button>
      </div>
    </div>
  );
};

export default UpdateInventoryView;

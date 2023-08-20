import { useRef, useState } from 'react';
import '../../../sass/management/inventory/_createInventory.scss';
import { randomNumber } from '../../../randomNumber';
import PrintLabelsWithQR from '../../PrintLabelWithQR';

const CreateInventoryView = ({
  inventoryCategories,
  handleCreateInventory,
  showQRCode,
}) => {
  const [QRcodeData, setQRcodeData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const articleNameRef = useRef(null);
  const articleDetailsRef = useRef(null);
  const quantityRef = useRef(null);
  const locationRef = useRef(null);
  const priceRef = useRef(null);
  const articleRandomNumber = randomNumber(10); //generating random ID number with size of 10letters and numbers
  const categoryIdRef = useRef(null);

  const handlePostData = () => {
    const inventoryData = {
      article_name: articleNameRef.current.value,
      details: articleDetailsRef.current.value,
      quantity: quantityRef.current.value,
      category_id: categoryIdRef.current.value,
      location: locationRef.current.value,
      price: priceRef.current.value,
      article_number: articleRandomNumber,
    };

    handleCreateInventory(inventoryData);
    setQRcodeData(inventoryData);
  };

  return (
    <div className="createInventory">
      <p>Inventory Create</p>

      {!showQRCode && (
        <form>
          <div className="createInventory--left">
            <input
              type="text"
              placeholder="Article Name"
              ref={articleNameRef}
              required
            />
            <input type="text" placeholder="Details" ref={articleDetailsRef} />
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              ref={quantityRef}
              required
            />
          </div>
          <div className="createInventory--right">
            <select
              required
              onChange={e => setSelectedCategory(e.target.value)}
              ref={categoryIdRef}
            >
              <option>
                {inventoryCategories
                  ? 'Select Category'
                  : 'Error Category not Fetched'}
              </option>
              {inventoryCategories?.map(i => {
                return (
                  <option key={i.id} value={i.id}>
                    {i.category_name}
                  </option>
                );
              })}
            </select>
            <input type="text" placeholder="Location" ref={locationRef} />
            <input
              type="number"
              min="0"
              step=".01"
              placeholder="Price €"
              ref={priceRef}
            />
          </div>
        </form>
      )}
      {!showQRCode && (
        <button onClick={handlePostData}>create inventory</button>
      )}
      {showQRCode && <PrintLabelsWithQR printData={QRcodeData} />}
    </div>
  );
};

export default CreateInventoryView;

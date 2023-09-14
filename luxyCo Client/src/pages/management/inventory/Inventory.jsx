import {
  fetchTableInventory,
  fetchTableInventoryCategories,
} from '../../../api';
import { useState } from 'react';
import useSWR from 'swr';
import ErrorDisplayView from '../../../components/ErrorDisplayView';
import LoadingView from '../../../components/LoadingView';
import InventoryNavBar from '../../../components/management/inventory/InventoryNavBar';
import InventoryTableView from '../../../components/management/inventory/InventoryTableView';
import PrintLabelsWithQR from '../../../components/PrintLabelWithQR';
import InventoryCategoryView from '../../../components/management/inventory/InventoryCategoryView';

const Inventory = ({ token }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchedValue, setSearchedValue] = useState('');
  const [selectedInventory, setSelectedInventory] = useState({});
  const [QRpopupOpen, setQRopupOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const formatedDate = dateToTransform => {
    return new Date(new Date(dateToTransform))
      .toISOString()
      .replaceAll('-', '.')
      .replace('T', ' ');
  };

  const {
    data: inventory,
    error: inventoryError,
    isLoading: inventoryLoading,
  } = useSWR(['inventory', token], () => fetchTableInventory(token));
  const {
    data: inventoryCategories,
    error: inventoryCategoriesError,
    isLoading: inventoryCategoriesLoading,
  } = useSWR(['inventoryCategory', token], () =>
    fetchTableInventoryCategories(token)
  );

  if (inventoryError || inventoryCategoriesError)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );
  if (inventoryLoading || inventoryCategoriesLoading) return <LoadingView />;

  const filteredInventory = inventory.filter(i => {
    const searchValue = searchedValue.toLowerCase().trim();

    const searchedQuery =
      i.article_name || i.article_number || i.location
        ? i.article_name.toLowerCase().includes(searchValue) ||
          i.article_number.toLowerCase().includes(searchValue) ||
          i.location.toLowerCase().includes(searchValue)
        : 'all';

    return selectedCategory === 'all'
      ? searchedQuery
      : i.category_id === +selectedCategory
      ? searchedQuery
      : '';
  });

  const handleSelectedInventory = i => {
    setSelectedInventory({
      article_number: i.article_number,
      article_name: i.article_name,
    });
    setQRopupOpen(e => !e);
  };

  const handlePopupQR = () => {
    setQRopupOpen(e => !e);
  };

  const handleShowCategory = () => {
    setShowCategory(showCategory => !showCategory);
  };

  const selectedCategoryName = inventoryCategories.find(i => {
    const matchCategory = i.id === +selectedCategory;

    if (matchCategory) return i.category_name;
  });

  return (
    <div>
      <InventoryNavBar
        inventory={filteredInventory}
        selectedCategoryName={selectedCategoryName}
        inventoryCategories={inventoryCategories}
        setSelectedCategory={setSelectedCategory}
        setSearchedValue={setSearchedValue}
        handleShowCategory={handleShowCategory}
        showCategory={showCategory}
        token={token}
      />
      {showCategory ? (
        <InventoryCategoryView
          inventoryCategories={inventoryCategories}
          token={token}
        />
      ) : (
        <InventoryTableView
          inventory={filteredInventory}
          formatedDate={formatedDate}
          handleSelectedInventory={handleSelectedInventory}
          token={token}
        />
      )}

      {/* TO VIEW THE PDF ... JUST FOR EDIT  */}
      {/* <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <InventoryPDF
          inventory={filteredInventory}
          selectedCategoryName={selectedCategoryName}
        />
      </PDFViewer> */}
      {QRpopupOpen && (
        <div className="overlay" onClick={handlePopupQR}>
          <div
            className="popUp smallPopup buttonPopup"
            onClick={e => e.stopPropagation()}
          >
            <PrintLabelsWithQR printData={selectedInventory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

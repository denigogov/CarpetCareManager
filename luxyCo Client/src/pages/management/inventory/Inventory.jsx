import {
  fetchTableInventory,
  fetchTableInventoryCategories,
} from '../../../api';
import useSWR from 'swr';

import ErrorDisplayView from '../../../components/ErrorDisplayView';
import LoadingView from '../../../components/LoadingView';
import InventoryNavBar from '../../../components/management/inventory/InventoryNavBar';
import InventoryTableView from '../../../components/management/inventory/InventoryTableView';
import { randomNumber } from '../../../randomNumber';
import { useState } from 'react';
import InventoryPDF from '../../../components/management/inventory/InventoryPDF';
import { PDFViewer } from '@react-pdf/renderer';

const Inventory = ({ token }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchedValue, setSearchedValue] = useState('');

  // const randomString = randomNumber(10);

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

  return (
    <div>
      <InventoryNavBar
        inventoryCategories={inventoryCategories}
        setSelectedCategory={setSelectedCategory}
        setSearchedValue={setSearchedValue}
      />
      <InventoryTableView
        inventory={filteredInventory}
        formatedDate={formatedDate}
      />
      {/* <PDFViewer>
        <InventoryPDF inventory={filteredInventory} />
      </PDFViewer> */}
    </div>
  );
};

export default Inventory;

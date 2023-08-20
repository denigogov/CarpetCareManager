import '../../../sass/management/inventory/_inventoryNavBar.scss';
import categoryIcon from '../../../assets/categoryIcon.svg';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import addInventoryIcon from '../../../assets/addIcon.svg';
import CreateNewCategory from '../../../pages/management/inventory/CreateNewCategory';
import ToggleBtn from '../../ToggleBtn';

const InventoryNavBar = ({
  inventoryCategories,
  setSelectedCategory,
  setSearchedValue,
  handleShowCategory,
  showCategory,
  token,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [createCategory, setCreateCategory] = useState(false);

  const navigate = useNavigate();

  const preventPropagation = e => {
    e.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen(e => !e);
    navigate('/management/inventory');
    setCreateCategory(false);
  };

  const handleCategory = e => {
    setCreateCategory(e.target.textContent);
    setPopupOpen(e => !e);
  };

  return (
    <div className="inventory-navBar">
      <ToggleBtn
        handleShowCategory={handleShowCategory}
        showCategory={showCategory}
      />

      <select
        className="selectCat--inventory"
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="all">View All Inventory</option>
        {inventoryCategories.map(i => {
          return (
            <option key={i.id} value={i.id}>
              {i.category_name}
            </option>
          );
        })}
      </select>
      <input
        className="searchInventory"
        type="search"
        placeholder="search for inventory"
        onChange={e => setSearchedValue(e.target.value)}
      />

      <Link
        to={`/management/inventory/addInventoryCategory`}
        onClick={handleCategory}
      >
        <p className="inv-nav inventoryLink">
          create new category
          <img src={categoryIcon} alt="new categoy icon" />
        </p>
      </Link>

      <Link
        to={`/management/inventory/add-inventory`}
        onClick={() => setPopupOpen(e => !e)}
      >
        <p className="inv-nav inventoryLink">
          create new inventory
          <img src={addInventoryIcon} />
        </p>
      </Link>
      <p className="inv-nav">download inventory</p>
      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main
            className={
              createCategory === 'create new category'
                ? 'popUp xsPopup'
                : 'popUp'
            }
            onClick={preventPropagation}
          >
            {createCategory === 'create new category' ? (
              // I have to pass the token here because its not together with the Outlet!!!!
              <CreateNewCategory token={token} />
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default InventoryNavBar;

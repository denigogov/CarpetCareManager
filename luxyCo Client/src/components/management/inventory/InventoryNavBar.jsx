import '../../../sass/management/inventory/_inventoryNavBar.scss';
import icon from '../../../assets/icon-user.svg';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import addInventoryIcon from '../../../assets/addIcon.svg';

const InventoryNavBar = ({
  inventoryCategories,
  setSelectedCategory,
  setSearchedValue,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const preventPropagation = e => {
    e.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen(e => !e);
    navigate('/management/inventory');
  };

  return (
    <div className="inventory-navBar">
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
          <main className="popUp" onClick={preventPropagation}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default InventoryNavBar;

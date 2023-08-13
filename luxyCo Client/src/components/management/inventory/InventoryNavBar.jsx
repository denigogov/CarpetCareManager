import '../../../sass/management/inventory/_inventoryNavBar.scss';
import icon from '../../../assets/icon-user.svg';

const InventoryNavBar = ({
  inventoryCategories,
  setSelectedCategory,
  setSearchedValue,
}) => {
  return (
    <div className="inventory-navBar">
      <select onChange={e => setSelectedCategory(e.target.value)}>
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
        type="search"
        placeholder="search for inventory"
        onChange={e => setSearchedValue(e.target.value)}
      />
      <p>create new inventory</p>
      <p>download inventory</p>
    </div>
  );
};

export default InventoryNavBar;

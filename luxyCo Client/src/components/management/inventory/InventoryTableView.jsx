import { useState } from 'react';
import '../../../sass/management/inventory/_inventoryTableView.scss';

const InventoryTableView = ({
  inventory,
  formatedDate,
  handleSelectedInventory,
}) => {
  const handleClickInventory = i => {
    handleSelectedInventory(i);
  };

  return (
    <div className="inventoryTable">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Location</th>
            <th>Price</th>
            <th>Entry Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(i => (
            <tr key={i.id}>
              <td
                onClick={() => handleClickInventory(i)}
                style={{ cursor: 'pointer' }}
              >
                {i.article_number}
              </td>
              <td>{i?.article_name ?? 'name not provided'}</td>
              <td>{i?.details ?? 'details not provided'}</td>
              <td>{i?.quantity ?? 'quanitiy not provided'}</td>
              <td>{i?.category_name ?? 'category deleted'}</td>
              <td>{i?.location ?? 'location not provided'}</td>
              <td>{i?.price ?? 'price not provided'} €</td>
              <td>{formatedDate(i.date_entry).slice(0, 10)}</td>
            </tr>
          ))}
          {!inventory.length && (
            <tr>
              <td colSpan="11">No inventory found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTableView;

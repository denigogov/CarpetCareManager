import '../../../sass/management/orderStatus/_orderStatusView.scss';
import deleteUserIcon from '../../../assets/deleteIcon.svg';
import addIcon from '../../../assets/addIcon.svg';
import { useState } from 'react';

const OrderStatusView = ({
  orderStatusData,
  handleDeleteRequest,
  handleUpdateBtn,
  setUpdatedStatus,
}) => {
  const [editStatus, setEditStatus] = useState(false);

  const handleEditClick = i => {
    setEditStatus(i.status_name);
    setUpdatedStatus(i.status_name);
  };

  const handleDeleteClick = e => {
    handleDeleteRequest(e);
  };

  const onClickUpdate = i => {
    handleUpdateBtn(i);
    setEditStatus(false);
  };

  return (
    <div className="orderStatusView">
      <table>
        <thead>
          <tr>
            <th>
              <img src={addIcon} alt="plus icon" /> add service
            </th>
            <th>Status Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orderStatusData.map((i, index) => (
            <tr key={i.id}>
              <td>{index + 1}</td>
              <td>
                {editStatus === i.status_name ? (
                  <input
                    type="text"
                    defaultValue={i.status_name}
                    onChange={e => setUpdatedStatus(e.target.value)}
                  />
                ) : (
                  i?.status_name ?? 'status not provieded'
                )}
              </td>

              <td>
                {editStatus !== i.status_name ? (
                  <button onClick={() => handleEditClick(i)}>edit</button>
                ) : (
                  <button
                    className="updateBtn"
                    onClick={() => onClickUpdate(i)}
                  >
                    update
                  </button>
                )}
              </td>
              <td onClick={() => handleDeleteClick(i)}>
                <img src={deleteUserIcon} alt="delete status" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatusView;

import { useEffect, useState } from "react";
import "../../../sass/management/inventory/_inventoryTableView.scss";
import editIcon from "../../../assets/updateIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ApiSendRequestMessage from "../../ApiSendRequestMessage";
import { useSWRConfig } from "swr";
import { handlePostPutDeleteRequest } from "../../../handleRequests";

const InventoryTableView = ({
  inventory,
  formatedDate,
  handleSelectedInventory,
  token,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useSWRConfig();

  const handleClickInventory = (i) => {
    handleSelectedInventory(i);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  const popupWindow = () => {
    setPopupOpen((e) => !e);
    navigate("/management/inventory/");
  };

  const handleDeleteRequest = async (i) => {
    const confirmMessage = confirm(
      `Please confirm if you want to delete this inventory "${i.article_name}"`
    );

    if (confirmMessage) {
      handlePostPutDeleteRequest(
        "/table/inventory/",
        i.id,
        "DELETE",
        token,
        null,
        "service deleted",
        setErrorMessage,
        setSuccess,
        mutate,
        "inventory",
        "service deleted"
      );
    }
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((i) => (
            <tr key={i.id}>
              <td
                data-cell="ID"
                onClick={() => handleClickInventory(i)}
                style={{ cursor: "pointer" }}
              >
                {i.article_number}
              </td>
              <td data-cell="Name">{i?.article_name ?? "name not provided"}</td>
              <td data-cell="Details">
                {i?.details ?? "details not provided"}
              </td>
              <td data-cell="Quantity">
                {i?.quantity ?? "quanitiy not provided"}
              </td>
              <td data-cell="Category">
                {i?.category_name ?? "category deleted"}
              </td>
              <td data-cell="Location">
                {i?.location ?? "location not provided"}
              </td>
              <td data-cell="Price">{i?.price ?? "price not provided"} €</td>
              <td data-cell="Entry Date">
                {formatedDate(i.date_entry).slice(0, 10)}
              </td>

              <td data-cell="Edit" onClick={() => setPopupOpen((e) => !e)}>
                <Link to={`/management/inventory/updateInventory/${i.id}`}>
                  <img src={editIcon} alt="edit inventory icon" />
                </Link>
              </td>

              <td data-cell="Delete">
                <img
                  src={deleteIcon}
                  alt="edit inventory icon"
                  onClick={() => handleDeleteRequest(i)}
                />
              </td>
            </tr>
          ))}
          {!inventory.length && (
            <tr>
              <td colSpan="11">No inventory found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
      {popupOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp" onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default InventoryTableView;

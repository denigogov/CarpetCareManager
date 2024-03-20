import "../../../sass/management/inventory/_inventoryCategoryView.scss";
import ApiSendRequestMessage from "../../ApiSendRequestMessage";
import deleteUserIcon from "../../../assets/deleteIcon.svg";
import { useRef, useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { handlePostPutDeleteRequest } from "../../../handleRequests";

const InventoryCategoryView = ({ inventoryCategories, token }) => {
  const [updateCategory, setUpdateCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const { mutate } = useSWRConfig();

  const categoryNameRef = useRef(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleUpdateCategory = (i) => {
    setUpdateCategory(i.id);
  };

  const handleUpdateRequest = () => {
    setUpdateCategory(false);

    const confirmUpdate = confirm(
      `Please confirm if you want to update this service.`
    );

    if (confirmUpdate) {
      handlePostPutDeleteRequest(
        "/table/inventorycategories/",
        updateCategory,
        "PUT",
        token,
        {
          category_name: categoryNameRef.current.value,
        },
        "update faild, please try again",
        setErrorMessage,
        setSuccess,
        mutate,
        "inventoryCategory",
        "service updated"
      );
    }
  };

  //   DELETE REQUEST
  const handleDeleteRequest = (i) => {
    const confirmUpdate = confirm(
      `Please confirm if you want to delete this category ${i.category_name}.`
    );

    if (confirmUpdate) {
      handlePostPutDeleteRequest(
        "/table/inventorycategories/",
        i.id,
        "DELETE",
        token,
        null,
        "delete faild, please try again",
        setErrorMessage,
        setSuccess,
        mutate,
        "inventoryCategory",
        "service deleted"
      );
    }
  };

  return (
    <div className="inventoryCategoryView--container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventoryCategories.map((i) => (
            <tr key={i.id}>
              <td data-cell="ID">{i.id}</td>

              {updateCategory !== i.id ? (
                <td data-cell="Name">{i.category_name}</td>
              ) : (
                <td data-cell="Name">
                  <input
                    type="text"
                    defaultValue={i.category_name}
                    ref={categoryNameRef}
                  />
                </td>
              )}
              <td data-cell="Update">
                {updateCategory !== i.id ? (
                  <button onClick={() => handleUpdateCategory(i)}>edit</button>
                ) : (
                  <button
                    className="updateInventoryCategBtn"
                    onClick={handleUpdateRequest}
                  >
                    update
                  </button>
                )}
              </td>
              <td data-cell="Delete">
                <img
                  src={deleteUserIcon}
                  alt="delete category icon"
                  onClick={() => handleDeleteRequest(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ApiSendRequestMessage errorMessage={errorMessage} success={success} />
    </div>
  );
};

export default InventoryCategoryView;

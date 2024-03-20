import "../../sass/management/_users.scss";
// import deleteIcon from "../../assets/deleteIcon.svg";
import deleteUserIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import detailsIcon from "../../assets/detailsIcon.svg";
import addUserIcon from "../../assets/addUserIcon.svg";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingView from "../../components/LoadingView";

import useSWR, { useSWRConfig } from "swr";
import ErrorDisplayView from "../../components/ErrorDisplayView";
import ApiSendRequestMessage from "../../components/ApiSendRequestMessage";
import Swal from "sweetalert2";

const Users = ({ token, userInfo }) => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [popupOpen, setPopupOpen] = useState(false);
  const [success, setSucces] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isPhone = window.innerWidth < 1022;

  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };

  // To Render ERROR ,DATA and WHEN DATA IS LOAD!
  const { data, error, isLoading } = useSWR(
    "https://carpetcare.onrender.com/user",
    fetcher
  );

  const filteredData = data?.filter((user) => user?.id !== 145);

  const deleteUser = async (id, first_name) => {
    try {
      const sendMessage = Swal.fire({
        title: "Delete User",
        html: `Please confirm if you want to delete this user <strong>${first_name.toUpperCase()}</strong> all data related to the user will be lost.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#da0063",
        iconColor: "#da0063",
        cancelButtonColor: "#b7b7b7",
        confirmButtonText: "Yes, delete it!",
      });

      if ((await sendMessage).isConfirmed) {
        await fetch(`https://carpetcare.onrender.com/user/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        mutate("https://carpetcare.onrender.com/user"); // mutate is  Refresh the users data
        setSucces("User Deleted");
        setErrorMessage("");

        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#da0063",
          title: `${success}!`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      setErrorMessage("Error deleting user", error);
    }
  };

  if (error)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );

  if (isLoading) return <LoadingView />;

  // Event handler stop bubbling
  const preventPropagation = (event) => {
    event.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigate("/management/users/");
  };

  return (
    <div>
      <div className="table-container">
        <table className="userTable">
          {isPhone && (
            <div className="createUserIcon">
              <Link
                to={`/management/users/addUser/`}
                onClick={() => setPopupOpen((x) => !x)}
              >
                <img src={addUserIcon} alt="create new user icon" />
              </Link>
            </div>
          )}

          <thead>
            <tr>
              <th>
                <Link
                  to={`/management/users/addUser/`}
                  onClick={() => setPopupOpen((x) => !x)}
                >
                  <img src={addUserIcon} alt="create new user icon" />
                </Link>
              </th>
              <th>username</th>
              <th>first name</th>
              <th>last name</th>
              <th>department</th>
              <th>details</th>
              <th>edit</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((users, i) => {
              return (
                <tr key={users.id}>
                  <td data-cell="#">{i + 1}</td>
                  <td data-cell="Username">{users.username}</td>
                  <td data-cell="First Name">{users.first_name}</td>
                  <td data-cell="Last Name">{users.last_name}</td>
                  <td data-cell="Department">{users.department_name}</td>

                  <td data-cell="Details">
                    <Link
                      to={`/management/users/details/${users.id}`}
                      onClick={() => setPopupOpen((x) => !x)}
                    >
                      <img src={detailsIcon} alt="user details Icon" />
                    </Link>
                  </td>

                  <td data-cell="Edit">
                    <Link
                      to={`/management/users/edit/${users.id}`}
                      onClick={popupWindow}
                    >
                      <img src={editIcon} alt="edit user icon" />
                    </Link>
                  </td>

                  {userInfo.id === users.id || (
                    <td data-cell="Remove">
                      <img
                        onClick={() => deleteUser(users.id, users.first_name)}
                        className="userDeleteIcon"
                        src={deleteUserIcon}
                        alt="delete Icon"
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PopUp window with background */}
        {popupOpen && (
          <div className="overlay" onClick={popupWindow}>
            <main className="popUp" onClick={preventPropagation}>
              <Outlet context={[setPopupOpen]} />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

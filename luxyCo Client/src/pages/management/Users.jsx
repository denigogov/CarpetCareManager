import "../../sass/management/_users.scss";
// import deleteIcon from "../../assets/deleteIcon.svg";
import deleteUserIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import detailsIcon from "../../assets/detailsIcon.svg";
import addUserIcon from "../../assets/addUserIcon.svg";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useSWR, { useSWRConfig } from "swr";

const Users = ({ token }) => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [popupOpen, setPopupOpen] = useState(false);

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
    "http://localhost:4000/user",
    fetcher
  );

  const deleteUser = async (id, first_name) => {
    try {
      const confirmDelete = confirm(
        `Please confirm if you want to delete this user ${first_name}`
      );
      if (confirmDelete) {
        await fetch(`http://localhost:4000/user/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        mutate("http://localhost:4000/user"); // mutate is  Refresh the users data
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  if (error) return <h6>{error.message}</h6>;
  if (isLoading) return <h3>loading...</h3>;

  // Event handler stop bubbling
  const preventPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <img src={addUserIcon} alt="create new user icon" />
              </th>
              <th>first name</th>
              <th>last name</th>
              <th>department</th>
              <th>details</th>
              <th>edit</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((users, i) => {
              return (
                <tr key={users.id}>
                  <td>{i + 1}</td>
                  <td>{users.first_name}</td>
                  <td>{users.last_name}</td>
                  <td>{users.department_name}</td>

                  <td>
                    <Link
                      to={`/management/users/details/${users.id}`}
                      onClick={() => setPopupOpen((x) => !x)}
                    >
                      <img src={detailsIcon} alt="user details Icon" />
                    </Link>
                  </td>

                  <td>
                    <Link
                      to={`/management/users/edit/${users.id}`}
                      onClick={() => setPopupOpen((x) => !x)}
                    >
                      <img
                        src={editIcon}
                        alt="edit user icon"
                        // onClick={() => navigate("/management/users/edit")}
                      />
                    </Link>
                  </td>

                  <td>
                    <img
                      onClick={() => deleteUser(users.id, users.first_name)}
                      className="userDeleteIcon"
                      src={deleteUserIcon}
                      alt="delete Icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PopUp window with background */}
        {popupOpen && (
          <div className="overlay" onClick={() => setPopupOpen((x) => !x)}>
            <main className="popUp" onClick={preventPropagation}>
              <Outlet />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

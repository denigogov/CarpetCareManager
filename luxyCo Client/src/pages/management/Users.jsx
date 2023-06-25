import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../sass/management/_users.scss";
import deleteIcon from "../../assets/deleteIcon.svg";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState();
  // const [allUsers, setAllUsers] = useState(useLoaderData());

  const data = useLoaderData();

  console.log(selectedUser);

  const selectUser = (id) => {
    setSelectedUser(id);
  };

  // const deleteUser = (item) => {

  //  ;
  //   const result = confirm(
  //     `Are you sure you want to delete ${item.first_name} ?`
  //   );
  //   if (result) setSelectedMenuItems(deleteItem);
  // };

  // const deleteUser = async () => {
  //   try {
  //     if (!selectedUser) {
  //       return; // No user selected, do nothing
  //     }

  //     const res = await fetch(`http://localhost:4000/user/${selectedUser.id}`, {
  //       method: "DELETE",
  //     });

  //     if (res.ok) {
  //       console.log("User deleted successfully");
  //       // Perform any additional actions after successful deletion
  //       navigate("/managment/users");
  //     } else {
  //       console.log("Error deleting user");
  //       // Handle the case when the delete request fails
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user", error);
  //     // Handle any errors that occurred during the delete request
  //   }
  // };

  return (
    <div>
      show all users
      <div className="producer-order">
        <table>
          <tr>
            <th></th>
            <th>username</th>
            <th>department</th>
            <th>salary</th>
            <th>edit</th>
            <th>remove</th>
          </tr>
          {data.map((users, i) => {
            return (
              <tr onClick={() => selectUser(users)} key={users.id}>
                <td>{i + 1}</td>
                <td>{users.first_name}</td>
                <td>{users.department_name}</td>
                <td>{users.salary}</td>
                <td></td>
                <td>
                  <img
                    // onClick={deleteUser}
                    className="userDeleteIcon"
                    src={deleteIcon}
                    alt="delete Icon"
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Users;

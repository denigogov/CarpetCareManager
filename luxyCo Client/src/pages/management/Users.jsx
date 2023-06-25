import "../../sass/management/_users.scss";
import deleteIcon from "../../assets/deleteIcon.svg";
import useSWR, { useSWRConfig } from "swr";

const Users = ({ token }) => {
  const { mutate } = useSWRConfig();

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

  if (error) return <h2>{error.message} </h2>;
  if (isLoading) return <h3>loading...</h3>;

  return (
    <div>
      show all users
      <div className="table-container">
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
              <tr key={users.id}>
                <td>{i + 1}</td>
                <td>{users.first_name}</td>
                <td>{users.department_name}</td>
                <td>{users.salary}</td>
                <td></td>
                <td>
                  <img
                    onClick={() => deleteUser(users.id, users.first_name)}
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

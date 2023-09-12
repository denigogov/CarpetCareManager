import '../../sass/management/_users.scss';
// import deleteIcon from "../../assets/deleteIcon.svg";
import deleteUserIcon from '../../assets/deleteIcon.svg';
import editIcon from '../../assets/editIcon.svg';
import detailsIcon from '../../assets/detailsIcon.svg';
import addUserIcon from '../../assets/addUserIcon.svg';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingView from '../../components/LoadingView';

import useSWR, { useSWRConfig } from 'swr';
import ErrorDisplayView from '../../components/ErrorDisplayView';
import ApiSendRequestMessage from '../../components/ApiSendRequestMessage';

const Users = ({ token, userInfo }) => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [popupOpen, setPopupOpen] = useState(false);
  const [success, setSucces] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetcher = async url => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSucces('');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // To Render ERROR ,DATA and WHEN DATA IS LOAD!
  const { data, error, isLoading } = useSWR(
    'http://localhost:4000/user',
    fetcher
  );

  const deleteUser = async (id, first_name) => {
    try {
      const confirmDelete = confirm(
        `Please confirm if you want to delete this user ${first_name.toUpperCase()} all data related to the user will be lost.`
      );

      if (confirmDelete) {
        await fetch(`http://localhost:4000/user/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        mutate('http://localhost:4000/user'); // mutate is  Refresh the users data
        setSucces('User Deleted');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Error deleting user', error);
    }
  };

  if (error)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    ); // I need to add personal error messages!
  if (isLoading) return <LoadingView />; //I need to add loading component!

  // Event handler stop bubbling
  const preventPropagation = event => {
    event.stopPropagation();
  };

  const popupWindow = () => {
    setPopupOpen(x => !x);
    navigate('/management/users/');
  };

  return (
    <div>
      <div className="table-container">
        <table className="userTable">
          <thead>
            <tr>
              <th>
                <Link
                  to={`/management/users/addUser/`}
                  onClick={() => setPopupOpen(x => !x)}
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
            {data.map((users, i) => {
              return (
                <tr key={users.id}>
                  <td>{i + 1}</td>
                  <td>{users.username}</td>
                  <td>{users.first_name}</td>
                  <td>{users.last_name}</td>
                  <td>{users.department_name}</td>

                  <td>
                    <Link
                      to={`/management/users/details/${users.id}`}
                      onClick={() => setPopupOpen(x => !x)}
                    >
                      <img src={detailsIcon} alt="user details Icon" />
                    </Link>
                  </td>

                  <td>
                    <Link
                      to={`/management/users/edit/${users.id}`}
                      onClick={popupWindow}
                    >
                      <img src={editIcon} alt="edit user icon" />
                    </Link>
                  </td>

                  {userInfo.id === users.id || (
                    <td>
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
        <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
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

import { useSWRConfig } from 'swr';
import '../../sass/management/_createUser.scss';
import { useEffect, useState } from 'react';
import { fetchTableDepartment } from '../../api';

const CreateUser = ({ token }) => {
  const { mutate } = useSWRConfig();
  const [departments, setDepartments] = useState([]);
  const [userDataStoring, setUserDataStoring] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchDepartment = async () => {
      const data = await fetchTableDepartment(token);
      setDepartments(data);
    };
    fetchDepartment();
  }, []);

  const inputUserForm = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const convertedValue = name === 'department_id' ? parseInt(value) : value;

    setUserDataStoring(prevState => ({
      ...prevState,
      [name]: convertedValue,
    }));
  };

  const submitCreateUser = e => {
    e.preventDefault();

    const createUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/user/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userDataStoring),
        });
        mutate('http://localhost:4000/user'); // mutate is  Refresh the users data

        if (res.ok) {
          setErrorMessage(true);
          return res;
        } else {
          setErrorMessage(false);
        }
      } catch (error) {
        console.error('Error deleting user', error);
      }
    };
    createUser();
  };

  return (
    <div className="createUser">
      <div className="createUser--title">
        <h3>Create new user</h3>
      </div>
      <form>
        <div className="createUserColumn-left">
          <label>
            username<span className="requiredField">*</span>
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={inputUserForm}
          />

          <label>
            first name<span className="requiredField">*</span>
          </label>
          <input
            type="text"
            placeholder="first name"
            name="first_name"
            onChange={inputUserForm}
          />
          <label>
            last name<span className="requiredField">*</span>
          </label>
          <input
            type="text"
            placeholder="lastname"
            name="last_name"
            onChange={inputUserForm}
          />
          <label>
            password<span className="requiredField">*</span>
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={inputUserForm}
          />
        </div>
        <div className="createUserColumn-rigth">
          <label>adress</label>
          <input
            type="text"
            placeholder="full adress"
            name="street"
            onChange={inputUserForm}
          />
          <label>phone number</label>
          <input
            type="tel"
            placeholder="E.g +49 222 222 222"
            name="phone_number"
            onChange={inputUserForm}
          />
          <label>salary</label>
          <input
            type="text"
            placeholder="E.g 16 000,22"
            name="salary"
            onChange={inputUserForm}
          />
          <label>department</label>
          <select name="department_id" onChange={inputUserForm}>
            <option value="">select department</option>
            {departments.map((department, i) => (
              <option key={i} value={parseInt(department.id)}>
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button className="createUserBtn" onClick={submitCreateUser}>
        create user
      </button>{' '}
      {errorMessage && (
        <p style={{ color: 'green' }}>
          {errorMessage
            ? `${userDataStoring.username} successfully added`
            : 'error user not added, please try again'}
        </p>
      )}
    </div>
  );
};

export default CreateUser;

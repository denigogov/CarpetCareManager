import { useLoaderData } from 'react-router-dom';
import '../../sass/management/_editUser.scss';
import { useEffect, useState } from 'react';
import { fetchTableDepartment } from '../../api';
import useSWR, { useSWRConfig } from 'swr';
import ApiSendRequestMessage from '../../components/ApiSendRequestMessage';

const EditUser = ({ token }) => {
  const data = useLoaderData(token);
  const { mutate } = useSWRConfig();

  const [formData, setFormData] = useState(data);
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSucces] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTableDepartment(token);

      setDepartments(data);
    };

    if (success) {
      const timer = setTimeout(() => {
        setSucces('');
      }, 2500);
      return () => clearTimeout(timer);
    }

    fetchData();
  }, [success]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    const convertedValue = name === 'department_id' ? parseInt(value) : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: convertedValue,
    }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const { id, department_name, ...requestData } = formData;

    try {
      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        mutate('http://localhost:4000/user');
        setSucces('user updated');
        setErrorMessage('');
      } else throw Error();
    } catch (err) {
      setErrorMessage(`update faild, please try again ${err}`);
    }
  };

  return (
    <div className="editUser">
      <div className="editUser--title">
        <h3>User Update</h3>
        <p style={{ color: '#da0063' }}>{data.first_name}</p>
      </div>

      <form>
        <div className="editUser--data">
          <div className="editUser--columnLeft">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              defaultValue={data.username}
              onChange={handleInputChange}
            />

            <label>First Name: </label>
            <input
              type="text"
              name="first_name"
              defaultValue={data.first_name}
              onChange={handleInputChange}
            />

            <label>Last Name: </label>
            <input
              type="text"
              name="last_name"
              defaultValue={data.last_name}
              onChange={handleInputChange}
            />

            <label>Adress: </label>
            <input
              type="text"
              name="street"
              defaultValue={data.street}
              onChange={handleInputChange}
            />
          </div>

          <div className="editUser--columnRight">
            <label>Phone Number: </label>
            <input
              type="tel"
              name="phone_number"
              defaultValue={data.phone_number}
              onChange={handleInputChange}
            />

            <label>Salary: </label>
            <input
              type="text"
              name="salary"
              defaultValue={data.salary}
              onChange={handleInputChange}
            />

            <label>Department: </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
            >
              {departments.map((department, i) => (
                <option key={i} value={parseInt(department.id)}>
                  {department.department_name}
                </option>
              ))}
            </select>

            <button className="updateUserBtn" onClick={handleFormSubmit}>
              update
            </button>
          </div>
        </div>
      </form>

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default EditUser;

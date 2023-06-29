import useSWR, { useSWRConfig } from "swr";
import "../../sass/management/_createUser.scss";
import { useEffect, useState } from "react";
import { fetchTableDepartment } from "../../api";

const CreateUser = ({ token }) => {
  const { mutate } = useSWRConfig();
  const [departments, setDepartments] = useState([]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchDepartment = async () => {
      const data = await fetchTableDepartment(token);

      setDepartments(data);
    };

    fetchDepartment();
  }, []);

  // const fetcher = async (url) => {
  //   const response = await fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return response.json();
  // };

  // // To Render ERROR ,DATA and WHEN DATA IS LOAD!
  // const { data, error, isLoading } = useSWR(
  //   "http://localhost:4000/user",
  //   fetcher
  // );

  const createUserForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const convertedValue = name === "department_id" ? parseInt(value) : value;

    setUserData((prevState) => ({
      ...prevState,
      [name]: convertedValue,
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const createUser = async () => {
      try {
        await fetch(`http://localhost:4000/user`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });
        mutate("http://localhost:4000/user"); // mutate is  Refresh the users data
      } catch (error) {
        console.error("Error deleting user", error);
      }
    };

    createUser();
  };

  return (
    <div className="createUser">
      <div className="createUser--title">
        <p>Create new user</p>
      </div>
      <form onClick={handleCreateUser}>
        <div className="createUserColumn-left">
          <label>first name</label>
          <input
            type="text"
            placeholder="username"
            name="first_name"
            onChange={createUserForm}
          />
          <label>last name</label>
          <input
            type="text"
            placeholder="lastname"
            name="last_name"
            onChange={createUserForm}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={createUserForm}
          />
          <button className="createUserBtn">create user</button>
        </div>
        <div className="createUserColumn-rigth">
          <label>adress</label>
          <input
            type="text"
            placeholder="full adress"
            name="street"
            onChange={createUserForm}
          />
          <label>phone number</label>
          <input
            type="text"
            placeholder="E.g +49 222 222 222"
            name="phone_number"
            onChange={createUserForm}
          />
          <label>salary</label>
          <input
            type="text"
            placeholder="E.g 16 000,22"
            name="salary"
            onChange={createUserForm}
          />
          <label>department</label>
          <select name="department_id" onChange={createUserForm}>
            {departments.map((department, i) => (
              <option key={i} value={parseInt(department.id)}>
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

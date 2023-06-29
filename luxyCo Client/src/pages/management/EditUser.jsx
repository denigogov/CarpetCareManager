import { useLoaderData } from "react-router-dom";
import "../../sass/management/_editUser.scss";
import { useEffect, useState } from "react";
import { fetchTableDepartment } from "../../api";
import useSWR, { useSWRConfig } from "swr";

const EditUser = ({ token }) => {
  const data = useLoaderData(token);
  const { mutate } = useSWRConfig();

  const [formData, setFormData] = useState(data);
  const [departments, setDepartments] = useState([]);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTableDepartment(token);

      setDepartments(data);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const convertedValue = name === "department_id" ? parseInt(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: convertedValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { id, department_name, ...requestData } = formData;

    try {
      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        mutate("http://localhost:4000/user");
        setApiStatusMessage(true);
        throw Error();
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editUser">
      <div className="editUser--title">
        <h3>User Details</h3>
        <p style={{ color: "#da0063" }}>{data.first_name}</p>
      </div>

      <form>
        <div className="editUser--data">
          <div className="editUser--columnLeft">
            <p>
              First Name:
              <input
                type="text"
                name="first_name"
                defaultValue={data.first_name}
                onChange={handleInputChange}
              />
            </p>

            <p>
              Last Name:{" "}
              <input
                type="text"
                name="last_name"
                defaultValue={data.last_name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              Adress:
              <input
                type="text"
                name="street"
                defaultValue={data.street}
                onChange={handleInputChange}
              />
            </p>
          </div>

          <div className="editUser--columnRight">
            <p>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                defaultValue={data.phone_number}
                onChange={handleInputChange}
              />
            </p>
            <p>
              Salary:
              <input
                type="text"
                name="salary"
                defaultValue={data.salary}
                onChange={handleInputChange}
              />
            </p>
            <p>
              Department:
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
            </p>
          </div>
        </div>
        <button className="updateUserBtn" onClick={handleFormSubmit}>
          update
        </button>
      </form>
      <p>
        {apiStatusMessage ? (
          <p style={apiStatusMessage ? { color: "#8FD14F" } : { color: "red" }}>
            {apiStatusMessage
              ? "update successful"
              : "update faild, please try again"}
          </p>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default EditUser;

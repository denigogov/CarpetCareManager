import { useSWRConfig } from "swr";
import "../../sass/management/_createUser.scss";
import { useEffect, useState } from "react";
import { fetchTableDepartment } from "../../api";
import ApiSendRequestMessage from "../../components/ApiSendRequestMessage";
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateUser = ({ token }) => {
  const { mutate } = useSWRConfig();
  const [departments, setDepartments] = useState([]);
  const [userDataStoring, setUserDataStoring] = useState({});
  const [success, setSucces] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [setPopupOpen] = useOutletContext();

  useEffect(() => {
    const fetchDepartment = async () => {
      const data = await fetchTableDepartment(token);
      const filteredData = data?.filter((department) => department?.id !== 3);
      setDepartments(filteredData);
    };
    fetchDepartment();

    if (success) {
      Swal.fire({
        position: "center",
        icon: "success",
        iconColor: "#da0063",
        title: `Success!`,
        html: `${success}!`,
        showConfirmButton: false,
        timer: 2000,
      });
      setSucces("");
      setPopupOpen(false);
      navigate("/management/users/");
    }
  }, [success]);

  const inputUserForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const convertedValue = name === "department_id" ? parseInt(value) : value;

    setUserDataStoring((prevState) => ({
      ...prevState,
      [name]: convertedValue,
    }));
  };

  const submitCreateUser = (e) => {
    e.preventDefault();

    // Leaving as a reference I need to refactore fetcing user with SWR without useEffect!

    //  handlePostPutDeleteRequest(
    //     "/user/",
    //     null,
    //     "POST",
    //     token,
    //     userDataStoring,
    //     "error user not added, please try again",
    //     setErrorMessage,
    //     setSucces,
    //     mutate,
    //     "https://carpetcare.onrender.com/user",
    //     `${userDataStoring.username} added`
    //   );

    const createUser = async () => {
      try {
        const res = await fetch(`https://carpetcare.onrender.com/user/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userDataStoring),
        });

        if (res.ok) {
          mutate("https://carpetcare.onrender.com/user"); // mutate is  Refresh the users data
          setSucces(`User ${userDataStoring.username} successfully  created`);
          setErrorMessage("");

          return res;
        } else {
          throw new Error();
        }
      } catch (err) {
        setErrorMessage(
          `error user not added, please try again, ${err.message}`
        );
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
      </button>

      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default CreateUser;

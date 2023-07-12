import { useLoaderData } from "react-router-dom";
import "../../sass/management/_detailsUser.scss";

export const DetailsUser = ({ token }) => {
  const data = useLoaderData(token);

  return (
    <div className="detailsUser">
      <div className="detailsUser--title">
        <h3>User Details</h3>
        <p style={{ color: "#da0063" }}>{data.username}</p>
      </div>

      <div className="detailsUser--data">
        <div className="columnLeft">
          <p>
            Username:
            <span>{data.username}</span>
          </p>
          <p>
            First Name:
            <span>{data.first_name}</span>
          </p>
          <p>
            Last Name:<span>{data.last_name}</span>
          </p>
          <p>
            Adress: <span>{data.street ? data.street : "no adress added"}</span>
          </p>
        </div>
        <div className="columnRight">
          <p>
            Phone Number:
            <span>
              {data.phone_number
                ? data.phone_number.match(/.{1,3}/g).join("-")
                : "no phone number added"}
            </span>
          </p>
          <p>
            Department:
            <span>
              {data.department_name
                ? data.department_name
                : "no departmen added"}
            </span>
          </p>
          <p>
            Salary:
            <span>{data.salary ? `${data.salary}$` : "no salary added"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsUser;

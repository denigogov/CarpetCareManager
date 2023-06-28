import { useLoaderData } from "react-router-dom";
import "../../sass/management/_detailsUser.scss";

const DetailsUser = ({ token }) => {
  const data = useLoaderData(token);

  console.log(data);

  return (
    <div className="detailsUser">
      <div className="detailsUser--title">
        <h3>User Details</h3>
        <p style={{ color: "#da0063" }}>{data.first_name}</p>
      </div>

      <div className="detailsUser--data">
        <div className="columnLeft">
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
              {data.phone_number ? data.phone_number : "no phone number added"}
            </span>
          </p>
          <p>
            Department: <span>{data.department_name}</span>
          </p>
          <p>
            Salary:{" "}
            <span>{data.salary ? `${data.salary}$` : "no salary added"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsUser;

{
  /* <p>
First Name: <span style={{ fontWeight: "700" }}>{data.first_name}</span>
</p>
<p>
Last Name: <span style={{ fontWeight: "700" }}>{data.last_name}</span>
</p>
<p>
Adress: <span>{data.street ? data.street : "no adress added"}</span>
</p>
<p>
Phone Number:
<span>
  {data.phone_number ? data.phone_number : "no phone number added"}
</span>
</p>
<p>
Department: <span>{data.department_name}</span>
</p>
<p>
Salary: <span>{data.salary ? data.salary : "no salary added"}</span>
</p> */
}

import { useLoaderData } from "react-router-dom";

const DetailsContact = ({ token }) => {
  const fethcSingleUserData = useLoaderData(token);

  console.log(fethcSingleUserData);
  return (
    <div>
      {fethcSingleUserData.map((order) => {
        return (
          <ul>
            <li>
              <p>{order.order_date}</p>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default DetailsContact;

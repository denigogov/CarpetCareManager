import { useLoaderData } from 'react-router-dom';

const DetailsContact = ({ token }) => {
  const fethcSingleUserData = useLoaderData(token);

  console.log(fethcSingleUserData);
  return (
    <div>
      {fethcSingleUserData.map((order, i) => {
        return (
          <ul>
            <li key={i}>
              <p>{order.order_date}</p>
              <p>{order.m2}</p>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default DetailsContact;

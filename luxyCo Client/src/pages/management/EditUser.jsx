import { useLoaderData } from "react-router-dom";

const EditUser = ({ token }) => {
  const apiData = useLoaderData(token);

  return (
    <div>
      <h4>{apiData.first_name}</h4>

      <form>
        <input type="text" name="test" id="" value={apiData.first_name} />
      </form>
    </div>
  );
};

export default EditUser;

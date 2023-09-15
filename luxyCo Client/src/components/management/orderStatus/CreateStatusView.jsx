import { useRef } from 'react';

const CreateStatusView = ({ handleCreateService }) => {
  const statusNameRef = useRef();

  const handleCreate = () => {
    handleCreateService(statusNameRef.current.value);
  };

  return (
    <div className="createStatus__container">
      <p>Create new Status</p>
      <input type="text" placeholder="status name" ref={statusNameRef} />
      <button onClick={handleCreate}>submit</button>
    </div>
  );
};

export default CreateStatusView;

const ApiSendRequestMessage = ({ success, errorMessage }) => {
  return (
    <div>
      <div className="showMessage">
        {errorMessage && (
          <p className="errorMessage error">
            <strong>Warning !</strong> {errorMessage}
          </p>
        )}
        {success && (
          <p className="successfulMessage success">
            <strong>Success !</strong> {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApiSendRequestMessage;

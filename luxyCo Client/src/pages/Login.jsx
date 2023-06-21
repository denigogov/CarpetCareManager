import LoginView from "../components/Login/LoginView";

const Login = ({ setToken }) => {
  return (
    <div>
      <LoginView setToken={setToken} />
    </div>
  );
};

export default Login;

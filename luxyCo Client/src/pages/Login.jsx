import LoginView from "../components/Login/LoginView";

const Login = ({ setToken, setUserInfo }) => {
  return (
    <div>
      <LoginView setToken={setToken} setUserInfo={setUserInfo} />
    </div>
  );
};

export default Login;

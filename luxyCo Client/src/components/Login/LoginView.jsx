import "../../sass/_loginView.scss";
import loginIcon from "../../assets/icon-user.svg";

const LoginView = () => {
  return (
    <div className="loginView">
      <div className="companyName">
        <p className="service">carpet cleaning manager</p>
        <p className="name">LuxyCo</p>
      </div>

      <img className="login-icon" src={loginIcon} alt="login-Icon" />

      <form>
        <input placeholder="username" type="text" className="login__username" />
        <input
          placeholder="password"
          type="password"
          className="login__password"
        />
        <button className="login-btn">login</button>
      </form>
    </div>
  );
};

export default LoginView;

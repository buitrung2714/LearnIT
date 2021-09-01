import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = ({ authRoute }) => {
  let body;
  body = (
    <>
      {authRoute === "login" && <LoginForm />}
      {authRoute === "register" && <RegisterForm />}
    </>
  );
  return (
    <div className="landing">
      <div className="dark-overplay">
        <div className="landing-inner">
          <h1>Learn IT</h1>
          <h4>Keep track of what you are leraning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};
export default Auth;

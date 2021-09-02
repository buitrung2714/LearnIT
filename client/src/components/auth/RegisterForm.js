import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  //Context
  const { registerUser } = useContext(AuthContext);

  const [registerFrom, setRegisterFrom] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  //Alert
  const [alert, setAlert] = useState(null);

  //Local State
  const { username, password, confirmPassword } = registerFrom;

  const onChangeRegisterFrom = (event) =>
    setRegisterFrom({
      ...registerFrom,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerFrom);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username..."
            name="username"
            required
            value={username}
            onChange={onChangeRegisterFrom}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password..."
            name="password"
            required
            value={password}
            onChange={onChangeRegisterFrom}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterFrom}
          />
        </Form.Group>
        <Button variant="success" className="mt-3" type="submit">
          Register
        </Button>
      </Form>

      <p>
        Already have an account ?{" "}
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

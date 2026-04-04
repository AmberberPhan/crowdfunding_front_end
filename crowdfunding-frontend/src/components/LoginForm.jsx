import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postLogin from "../api/post-login.js";
import "../pages/FormPages.css";

function LoginForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginError("");

    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password)
        .then((response) => {
          window.localStorage.setItem("token", response.token);
          window.localStorage.setItem("user_id", response.user_id);
          navigate("/");
        })
        .catch((error) => {
          setLoginError(error.message);
        });
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">Log In</h2>
        <p className="form-subtitle">Welcome back to ThrvFd</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <button className="primary-button" type="submit">
            Log In
          </button>

          {loginError && <p className="form-error">{loginError}</p>}
        </form>

        <p className="form-note">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postSignup from "../api/post-signup";
import "./FormPages.css";

function CreateAccountPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      await postSignup(username, email, password);
      navigate("/login");
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Join ThrvFd and start supporting wellness</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>

          {formError && <p className="form-error">{formError}</p>}
        </form>

        <p className="form-note">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccountPage;
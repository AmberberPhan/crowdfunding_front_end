import { Link, Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  function handleLogout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    navigate("/");
    window.location.reload();
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">ThrvFd</Link>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/create-fundraiser">Create Fundraiser</Link>

          {!token && <Link to="/login">Log In</Link>}
          {!token && <Link to="/signup">Create Account</Link>}

          {token && (
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default NavBar;
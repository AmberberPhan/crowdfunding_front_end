import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <p className="notfound-code">404</p>
        <h2>Page Not Found</h2>
        <p className="notfound-text">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <Link to="/" className="notfound-link">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
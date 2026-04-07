import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink}>
        <img src={fundraiserData.image} alt={fundraiserData.title} />

        <div className="fundraiser-card-content">
          <h3>{fundraiserData.title}</h3>
          <p className="fundraiser-card-description">
            {fundraiserData.description}
          </p>
          <p className="fundraiser-card-goal">
            Goal: ${fundraiserData.goal}
          </p>
          <span
            className={`fundraiser-status ${
              fundraiserData.is_open ? "open" : "closed"
            }`}
          >
            {fundraiserData.is_open ? "Open" : "Closed"}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default FundraiserCard;
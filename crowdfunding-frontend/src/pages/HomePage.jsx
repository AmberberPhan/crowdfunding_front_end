import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers } = useFundraisers();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Support Better Well-Being with Thrvd</h1>
        <p>
          Discover wellness-focused fundraisers that help improve physical and
          mental health for individuals and communities.
        </p>
      </div>

      <div id="fundraiser-list">
        {fundraisers.map((fundraiserData) => {
          return (
            <FundraiserCard
              key={fundraiserData.id}
              fundraiserData={fundraiserData}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import postPledge from "../api/post-pledge";
import deleteFundraiser from "../api/delete-fundraiser";
import deletePledge from "../api/delete-pledge";
import updatePledge from "../api/update-pledge";
import "./FundraiserPage.css";

function FundraiserPage() {
  // Get fundraiser id from URL
  const { id } = useParams();

  // Load fundraiser data from backend
  const { fundraiser, isLoading, error } = useFundraiser(id);
  console.log("FUNDRAISER DATA:", fundraiser);

  // Router navigation helper
  const navigate = useNavigate();

  // Logged-in user info from localStorage
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("user_id");

  // New pledge form state
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [pledgeError, setPledgeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit pledge state
  const [editingPledgeId, setEditingPledgeId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editAnonymous, setEditAnonymous] = useState(false);
  const [editPledgeError, setEditPledgeError] = useState("");
  const [isUpdatingPledge, setIsUpdatingPledge] = useState(false);

  // Create a new pledge
  async function handleSubmit(event) {
    event.preventDefault();
    setPledgeError("");
    setIsSubmitting(true);

    try {
      await postPledge(amount, comment, anonymous, id);
      window.location.reload();
    } catch (error) {
      setPledgeError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete fundraiser
  async function handleDeleteFundraiser() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fundraiser?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFundraiser(id);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  // Delete pledge
  async function handleDeletePledge(pledgeId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pledge?"
    );

    if (!confirmDelete) return;

    try {
      await deletePledge(pledgeId);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  // Start editing a pledge
  function handleStartEditPledge(pledgeData) {
    setEditingPledgeId(pledgeData.id);
    setEditComment(pledgeData.comment || "");
    setEditAnonymous(pledgeData.anonymous);
    setEditPledgeError("");
  }

  // Cancel editing a pledge
  function handleCancelEditPledge() {
    setEditingPledgeId(null);
    setEditComment("");
    setEditAnonymous(false);
    setEditPledgeError("");
  }

  // Save updated pledge
  async function handleUpdatePledge(pledgeId) {
    setEditPledgeError("");
    setIsUpdatingPledge(true);

    try {
      await updatePledge(pledgeId, editComment, editAnonymous);
      window.location.reload();
    } catch (error) {
      setEditPledgeError(error.message);
    } finally {
      setIsUpdatingPledge(false);
    }
  }

  // Loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>{error.message}</p>;
  }

return (
  <div className="fundraiser-container">

    {/* Fundraiser detail card */}
    <div className="fundraiser-card-detail">
      <img src={fundraiser.image} alt={fundraiser.title} />

      <div className="fundraiser-content">
        <h2>{fundraiser.title}</h2>
        <p className="description">{fundraiser.description}</p>

        <p><strong>Goal:</strong> ${fundraiser.goal}</p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(fundraiser.date_created).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {fundraiser.is_open ? "Open" : "Closed"}
        </p>

        {token && userId == fundraiser.owner && (
          <>
            <Link to={`/fundraiser/${fundraiser.id}/edit`}>
              <button>Edit Fundraiser</button>
            </Link>

            <button className="delete-btn" onClick={handleDeleteFundraiser}>
              Delete Fundraiser
            </button>
          </>
        )}
      </div>
    </div>

    {/* Pledges */}
    <div className="pledge-section">
      <h3>Pledges</h3>

      {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
        <ul>
          {fundraiser.pledges.map((pledgeData) => (
            <li key={pledgeData.id}>
              <span>
                ${pledgeData.amount} from{" "}
                {pledgeData.anonymous
                  ? "Anonymous"
                  : pledgeData.supporter}
              </span>

              {pledgeData.comment && (
                <p className="pledge-comment">
                  {pledgeData.comment}
                </p>
              )}

              {token && userId == pledgeData.supporter && (
                <>
                  <button onClick={() => handleStartEditPledge(pledgeData)}>
                    Edit
                  </button>

                  <button onClick={() => handleDeletePledge(pledgeData.id)}>
                    Delete
                  </button>
                </>
              )}

              {editingPledgeId == pledgeData.id && (
                <div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  />

                  <label>
                    <input
                      type="checkbox"
                      checked={editAnonymous}
                      onChange={(e) =>
                        setEditAnonymous(e.target.checked)
                      }
                    />
                    Anonymous
                  </label>

                  <button onClick={() => handleUpdatePledge(pledgeData.id)}>
                    Save
                  </button>

                  <button onClick={handleCancelEditPledge}>
                    Cancel
                  </button>

                  {editPledgeError && <p>{editPledgeError}</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pledges yet.</p>
      )}
    </div>

    {/* Pledge form */}
    <div className="form-section">
      <h3>Make a pledge</h3>

      {token ? (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Donate anonymously
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit pledge"}
          </button>

          {pledgeError && <p className="error">{pledgeError}</p>}
        </form>
      ) : (
        <p>Please log in to make a pledge.</p>
      )}
    </div>

  </div>
);
}

export default FundraiserPage;
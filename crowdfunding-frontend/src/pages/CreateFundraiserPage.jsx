import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";
import "./FormPages.css";

function CreateFundraiserPage() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [goal, setGoal] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const newFundraiser = await postFundraiser(
        title,
        description,
        image,
        goal,
        isOpen
      );

      navigate(`/fundraiser/${newFundraiser.id}`);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="page-container">
        <div className="form-card">
          <h2 className="form-title">Create a Fundraiser</h2>
          <p className="form-note">Please log in to create a fundraiser.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">Create a Fundraiser</h2>
        <p className="form-subtitle">Start a campaign that supports well-being</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input
              id="goal"
              type="number"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              required
            />
          </div>

          <label className="checkbox-row" htmlFor="isOpen">
            <input
              id="isOpen"
              type="checkbox"
              checked={isOpen}
              onChange={(event) => setIsOpen(event.target.checked)}
            />
            Open for pledges
          </label>

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create fundraiser"}
          </button>

          {formError && <p className="form-error">{formError}</p>}
        </form>
      </div>
    </div>
  );
}

export default CreateFundraiserPage;
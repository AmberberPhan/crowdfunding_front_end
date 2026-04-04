import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import updateFundraiser from "../api/update-fundraiser";
import "./FormPages.css";

function EditFundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("user_id");

  const { fundraiser, isLoading, error } = useFundraiser(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [goal, setGoal] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (fundraiser) {
      setTitle(fundraiser.title || "");
      setDescription(fundraiser.description || "");
      setImage(fundraiser.image || "");
      setGoal(fundraiser.goal || "");
      setIsOpen(fundraiser.is_open ?? true);
    }
  }, [fundraiser]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      await updateFundraiser(id, title, description, image, goal, isOpen);
      navigate(`/fundraiser/${id}`);
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
          <h2 className="form-title">Edit Fundraiser</h2>
          <p className="form-note">Please log in to edit a fundraiser.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (userId != fundraiser.owner) {
    return (
      <div className="page-container">
        <div className="form-card">
          <h2 className="form-title">Edit Fundraiser</h2>
          <p className="form-note">You are not allowed to edit this fundraiser.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">Edit Fundraiser</h2>
        <p className="form-subtitle">Update your campaign details</p>

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
            {isSubmitting ? "Saving..." : "Update fundraiser"}
          </button>

          {formError && <p className="form-error">{formError}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditFundraiserPage;
import { useState } from "react";

function IncidentForm({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
    createdBy: "Kavya",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/incidents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create incident");
      }

      const incident = await response.json();

      onCreated(incident);

      setForm({
        title: "",
        description: "",
        priority: "Medium",
        assignedTo: "",
        createdBy: "Kavya",
      });

      onClose();
    } catch (error) {
      console.error("Create incident error:", error);
      alert("Failed to create incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <div>
            <h2>Create Incident</h2>
            <p>Report a new bug or incident</p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <label>Incident Title</label>

          <input
            name="title"
            placeholder="e.g. Payment API failure"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Describe the issue..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="form-row">

            <div>
              <label>Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">
                  Critical
                </option>
              </select>
            </div>

            <div>
              <label>Assign Developer</label>

              <input
                name="assignedTo"
                placeholder="Developer name"
                value={form.assignedTo}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Incident"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default IncidentForm;
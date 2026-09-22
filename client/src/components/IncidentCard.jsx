import { useState } from "react";

function IncidentCard({
  incident,
  onStatusChange,
  onPriorityChange,
  onComment,
}) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!comment.trim()) return;

    await onComment(incident._id, comment);

    setComment("");
  };

  return (
    <div className="incident-card">

      <div className="incident-content">

        <div className="incident-heading">

          <span
            className={`priority-badge ${incident.priority.toLowerCase()}`}
          >
            {incident.priority}
          </span>

          <h3>{incident.title}</h3>

        </div>

        <p className="description">
          {incident.description}
        </p>

        <div className="incident-meta">

          <span>
            👤{" "}
            {incident.assignedTo ||
              "Unassigned"}
          </span>

          <span>
            💬{" "}
            {incident.comments?.length || 0}
          </span>

          <span>
            Created by {incident.createdBy}
          </span>

        </div>


        {/* COMMENTS */}

        <button
          className="comments-toggle"
          onClick={() =>
            setShowComments(!showComments)
          }
        >
          {showComments
            ? "Hide Comments"
            : `View Comments (${incident.comments?.length || 0})`}
        </button>


        {showComments && (

          <div className="comments-section">

            {incident.comments?.length === 0 ? (

              <p className="no-comments">
                No comments yet.
              </p>

            ) : (

              incident.comments.map(
                (item, index) => (

                  <div
                    className="comment"
                    key={item._id || index}
                  >

                    <div className="comment-avatar">
                      {item.user
                        ?.charAt(0)
                        ?.toUpperCase() || "D"}
                    </div>

                    <div>
                      <strong>
                        {item.user ||
                          "Developer"}
                      </strong>

                      <p>
                        {item.text}
                      </p>
                    </div>

                  </div>

                )
              )

            )}


            <div className="comment-input">

              <input
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleComment();
                  }
                }}
              />

              <button
                onClick={handleComment}
              >
                Send
              </button>

            </div>

          </div>

        )}

      </div>


      {/* ACTIONS */}

      <div className="incident-actions">

        <label>Status</label>

        <select
          value={incident.status}
          onChange={(e) =>
            onStatusChange(
              incident._id,
              e.target.value
            )
          }
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>


        <label>Priority</label>

        <select
          value={incident.priority}
          onChange={(e) =>
            onPriorityChange(
              incident._id,
              e.target.value
            )
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

      </div>

    </div>
  );
}

export default IncidentCard;
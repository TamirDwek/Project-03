import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth /auth/Auth";
import VacationModel from "../../models/vacations/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
  onDelete?: (vacationId: string) => void;
  onLikeToggle: (vacationId: string) => void;
  isLiked: boolean;
  removeLike: (vacationId: string) => void;
}

export default function VacationCard({
  vacation,
  onDelete,
  onLikeToggle,
  isLiked,
  removeLike,
}: VacationCardProps): JSX.Element {
  const { role } = useContext(AuthContext)!;

  const handleLikeToggle = () => {
    if (isLiked) {
      removeLike(vacation.id);
    } else {
      onLikeToggle(vacation.id);
    }
  };

  const imagePreview = `http://localhost:3003${vacation.imageFile || ""}`;

  return (
    <div className="VacationCard">
      {role === "user" && (
        <div
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLikeToggle}
        >
          {isLiked ? "❤️" : "🤍"}
        </div>
      )}

      <img src={imagePreview} alt={vacation.destination} />

      <h2>{vacation.destination}</h2>
      <p>{vacation.description}</p>

      <div className="dates">
        <span>{new Date(vacation.startDate).toLocaleDateString()}</span> -
        <span>{new Date(vacation.endDate).toLocaleDateString()}</span>
      </div>

      <div className="price">${vacation.price}</div>

      {/* admin */}
      {role === "admin" && (
        <div className="admin-actions">
          <Link to={`/vacations/edit/${vacation.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => onDelete && onDelete(vacation.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

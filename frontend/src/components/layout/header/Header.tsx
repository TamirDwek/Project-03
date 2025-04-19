import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../auth /auth/Auth";
import useUsername from "../../../hooks/useUsername";

export default function Header(): JSX.Element {
  const name = useUsername();
  const { logout, role } = useContext(AuthContext)!;
  const navigate = useNavigate(); 

  function logMEOut() {
    logout();
    navigate("/login");
  }

  return (
    <div className="Header">
      <div className="title">My Vacation 🎁</div>
      <div>
        <nav>
          <NavLink to="/vacations">Vacations</NavLink>

          {/* links only for admin */}
          {role === "admin" && (
            <>
              <NavLink to="/vacations/add">Add Vacation</NavLink>
              <NavLink to="/vacations/report">Report</NavLink>
            </>
          )}
        </nav>
      </div>
      <div>
        Hello {name} | <button onClick={logMEOut}>Logout</button>
      </div>
    </div>
  );
}

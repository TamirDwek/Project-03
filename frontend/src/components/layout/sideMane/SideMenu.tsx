import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth /auth/Auth";
import {jwtDecode} from "jwt-decode";
import "./SideMenu.css";

interface JwtPayload {
  role: string;
}

export default function SideMenu(): JSX.Element {
  const { jwt } = useContext(AuthContext)!;

  let isAdmin = false;

  if (jwt) {
    const payload = jwtDecode<JwtPayload>(jwt);
    isAdmin = payload.role === "admin";
  }

  return (
    <div className="SideMenu">
      <h2>My Vacations</h2>
      <nav>
        <Link to="/vacations">All Vacations</Link>
        {isAdmin && <Link to="/add-vacation">Add Vacation</Link>}
      </nav>
    </div>
  );
}

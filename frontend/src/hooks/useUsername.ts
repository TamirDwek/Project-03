import { jwtDecode } from "jwt-decode";
import { useContext, useMemo } from "react";
import User from "../components/models/user/User";
import { AuthContext } from "../components/auth /auth/Auth";

export default function useUsername() {
  const { jwt } = useContext(AuthContext)!;

  const username = useMemo(() => {
    if (!jwt) return "";
    const { firstName} = jwtDecode<User>(jwt);
    return `${firstName}`;
  }, [jwt]);

  return username;
}

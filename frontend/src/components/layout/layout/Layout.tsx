import { useContext } from "react";
import Footer from "../footer /Footer";
import Header from "../header/Header";
import Routing from "../routing/Routing";
import "./Layout.css";
import { AuthContext } from "../../auth /auth/Auth";
export default function Layout() {
  const { jwt } = useContext(AuthContext)!;
  const isLoggedIn: boolean = !!jwt;

  return (
    <div className="Layout">
      {isLoggedIn ? (
        <>
          <Header />
          <main className="MainContent">
            <Routing />
          </main>
          <Footer />
        </> ) : (
        <Routing />
        
      )}
    </div>
  );
}

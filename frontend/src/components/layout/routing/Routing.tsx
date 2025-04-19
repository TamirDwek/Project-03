import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../auth /login/Login"; // ווידא ש־Login מוגדר גם כאן
import SignUp from "../../auth /sing-up/SignUp"; // ודא ששם הקובץ נכון
import EditVacation from "../../posts/edit/EditVacation"; // עריכת חופשה
import AddVacation from "../../posts/new/AddVacation";
import ReportPage from "../../posts/reports/ReportPage";
import Vacations from "../../posts/vacations/Vacations"; // דף הצגת חופשות
import NotFound from "../notFound/NotFound";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

=      <Route path="/vacations" element={<Vacations />} />

      <Route path="/vacations/add" element={<AddVacation />} />

      <Route path="/vacations/edit/:id" element={<EditVacation />} />

      <Route path="/vacations/report" element={<ReportPage />} />

      <Route path="/signup" element={<SignUp />} />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

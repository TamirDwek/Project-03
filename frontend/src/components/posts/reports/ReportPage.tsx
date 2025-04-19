import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import VacationReportModel from "../../models/vacations/VacationReport";
import VacationsService from "../../../services/auth-aware/Vacation";
import { useAuth } from "../../../hooks/useAuth";

export default function ReportPage() {
  const { role } = useAuth();
  const [reportData, setReportData] = useState<VacationReportModel[]>([]);

  useEffect(() => {
    if (role !== "admin") return;

    const fetchReport = async () => {
      try {
        const data = await new VacationsService().getReport();
        console.log("📊 Report fetched:", data);
        setReportData(
          data.map((item) => ({
            ...item,
            likesCount: Number(item.likesCount),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch report", error);
      }
    };

    fetchReport();
  }, [role]);

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Destination,Likes"]
        .concat(
          reportData.map((row) => `${row.destination},${row.likesCount}`)
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vacation_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (role !== "admin") {
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Access denied. Admins only.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Vacation Likes Report
      </h2>

      {/*  גובה ממשי לגרף */}
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={reportData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="destination" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="likesCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={downloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}


import VacationReportModel from "../../components/models/vacations/VacationReport";
import AuthAware from "./AuthAware";

export default class ReportService extends AuthAware {
  async getReport(): Promise<VacationReportModel[]> {
    const res = await this.axiosInstance.get<VacationReportModel[]>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/report`
    );
    return res.data;
  }

  async downloadCSV(): Promise<void> {
    const res = await this.axiosInstance.get(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/report/csv`,
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vacation-report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}


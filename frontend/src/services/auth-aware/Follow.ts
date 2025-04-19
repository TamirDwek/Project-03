import { AxiosInstance } from "axios";

export default class VacationsService {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async addVacationToReport(vacationId: string): Promise<void> {

    await this.axiosInstance.post(`/vacations/${vacationId}/like`);
  }

  async removeVacationFromReport(vacationId: string): Promise<void> {
    await this.axiosInstance.delete(`/vacations/${vacationId}/unfollow`);
  }
}

import Vacation from "../../components/models/vacations/VacationModel";
import VacationReportModel from "../../components/models/vacations/VacationReport";
import AuthAware from "./AuthAware";

export default class VacationsService extends AuthAware {
  async getAll(): Promise<Vacation[]> {
    const response = await this.axiosInstance.get<Vacation[]>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations`
    );
    return response.data;
  }

  async getOne(id: string): Promise<Vacation> {
    const response = await this.axiosInstance.get<Vacation>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id} `
    );
    return response.data;
  }

  async remove(id: string): Promise<boolean> {
    const response = await this.axiosInstance.delete<boolean>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`
    );
    return response.data;
  }

  async create(formData: FormData): Promise<Vacation> {
    const response = await this.axiosInstance.post<Vacation>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
  

  async update(id: string, formData: FormData): Promise<Vacation> {
    const response = await this.axiosInstance.patch<Vacation>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  }

  async getReport(): Promise<VacationReportModel[]> {
    const response = await this.axiosInstance.get<VacationReportModel[]>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/report`
    );
    console.log("Report data from server:", response.data); 

    return response.data;
  }

  async addLike(vacationId: string) {
    const response = await this.axiosInstance.post(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}/follow`
    );
    return response.data;
  }

  async removeLike(vacationId: string) {
    const response = await this.axiosInstance.delete(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}/unfollow`
    );
    return response.data;
  }

  async getFollowed(): Promise<string[]> {
    const response = await this.axiosInstance.get<string[]>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/followed`
    );

    const likedArray = response.data;

    const likedMap = likedArray.reduce((map, id) => {
      map[id] = true;
      return map;
    }, {} as Record<string, boolean>);

    localStorage.setItem("likedVacations", JSON.stringify(likedMap));

    return likedArray;
  }
 
}
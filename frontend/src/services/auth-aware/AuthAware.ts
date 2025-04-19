import axios, { AxiosInstance } from "axios";

export default abstract class AuthAware {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("jwt");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }
}

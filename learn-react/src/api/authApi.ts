import { AxiosRequestConfig } from "axios";
import http from "../libs/Http";

interface IUser {
    id: string;
    name: string;
    email: string;
    otp_enabled: string;
}

interface ILoginResponse {
    status: string;
    user: IUser;
}

interface GenericResponse {
    status: string;
    message: string;
  }

const authApi = {
  login: (payload: any, config?: AxiosRequestConfig | undefined) => {
    return http.post<ILoginResponse>("login", payload, config);
  },
  register: (payload: any, config?: AxiosRequestConfig | undefined) => {
    return http.post<GenericResponse>("register", payload, config);
  },
  generateOTP: (payload: any, config?: AxiosRequestConfig | undefined) => {
    return http.post("otp/generate", payload, config);
  },
  verifyOTP: (payload: any, config?: AxiosRequestConfig | undefined) => {
    return http.post("otp/verify", payload, config);
  },
  validateOTP: (payload: any, config?: AxiosRequestConfig | undefined) => {
    return http.post<{ otp_valid: boolean }>("otp/validate", payload, config);
  },
  disableOTP: (payload: any, config?: AxiosRequestConfig | undefined) => {
    return http.post("otp/disable", payload, config);
  },
};

export default authApi;
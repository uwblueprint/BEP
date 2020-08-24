import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const login = (email: string, password: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/auth/login?email=${email}&password=${password}`,
    method: "post",
  };

  return axios.request(config);
};

export { login };

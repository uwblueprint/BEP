import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import { School } from "../data/types/schoolListTypes";

const login = (email: string, password: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/auth/login`,
    method: "post",
    data: {
      email: `${email}`,
      password: `${password}`,
    },
  };

  return axios.request(config);
};

const registerUser = (body: any) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/auth/register`,
    method: "post",
    data: body,
  };

  return axios.request(config);
};

export { login, registerUser };

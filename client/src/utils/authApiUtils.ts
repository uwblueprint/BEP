import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const login = (email: string, password: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/auth/login`,
    method: "post",
    data: {
      email: `${ email }`,
      password: `${ password }`
    }
  };

  return axios.request(config);
};

export { login };

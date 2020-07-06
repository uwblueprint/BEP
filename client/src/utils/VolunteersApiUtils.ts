import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const get = (limit: number, offset: number) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/users/?type=volunteer&limit=${limit}&offset=${offset}`,
    method: "get",
  };

  return axios.request(config);
};

export { get };

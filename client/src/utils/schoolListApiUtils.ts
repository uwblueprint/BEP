import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const getSchoolList = () => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/schools`,
    method: "get",
  };

  return axios.request(config);
};

export { getSchoolList };

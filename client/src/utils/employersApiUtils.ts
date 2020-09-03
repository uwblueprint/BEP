import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import Employer from "../data/types/employerTypes";

const getAllEmployers = () => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/employers`,
    method: "get",
  };

  return axios.request(config);
};

const create = (employer: Employer) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/employers`,
    method: "post",
    data: employer,
  };

  return axios.request(config);
};

export { create, getAllEmployers };

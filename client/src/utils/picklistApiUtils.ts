import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import { PicklistType } from "../data/types/picklistTypes";

const getUserPicklist = (picklistType: PicklistType) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/users/picklists/${PicklistType[picklistType]}`,
    method: "get",
  };

  return axios.request(config);
};

const getSchoolPicklist = (picklistType: PicklistType) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/schools/picklists/${PicklistType[picklistType]}`,
    method: "get",
  };

  return axios.request(config);
};

export { getUserPicklist, getSchoolPicklist };

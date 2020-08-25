import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import { PicklistType } from "../data/types/picklistTypes";

const get = (picklistType: PicklistType) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/users/picklists/${PicklistType[picklistType]}`,
    method: "get",
  };

  return axios.request(config);
};

export { get };

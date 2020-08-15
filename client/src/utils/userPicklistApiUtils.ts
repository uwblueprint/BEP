import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import { UserPicklistType } from "../data/types/userPicklistTypes";

const get = (picklistType: UserPicklistType) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/users/picklists/${UserPicklistType[picklistType]}`,
    method: "get",
  };

  return axios.request(config);
};

export { get };

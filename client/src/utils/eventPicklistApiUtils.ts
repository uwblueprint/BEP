import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import { EventPicklistType } from "../data/types/EventPicklistTypes";

const get = (picklistType: EventPicklistType) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/users/picklists/opportunity/${EventPicklistType[picklistType]}`,
    method: "get",
  };

  return axios.request(config);
};

export { get };
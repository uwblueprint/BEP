import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import Application from "../data/types/applicationTypes";

const getEventApplications = (eventId: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/applications?relatedTo=event&id=${eventId}`,
    method: "get",
  };

  return axios.request(config);
};

const getVolunteerApplications = (volunteerId: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/applications?relatedTo=volunteer&id={volunteerId}`,
    method: "get",
  };

  return axios.request(config);
};

const update = (application: Application) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/applications/${application.id}`,
    method: "put",
    data: application,
  };

  return axios.request(config);
};

const create = (application: Application) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/applications`,
    method: "post",
    data: application,
  };

  return axios.request(config);
};

export { create, getEventApplications, getVolunteerApplications, update };

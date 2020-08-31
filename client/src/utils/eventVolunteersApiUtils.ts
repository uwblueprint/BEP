import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const getVolunteersOfEvent = (eventId: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/applications?relatedTo=event&id=${eventId}`,
    method: "get",
  };

  return axios.request(config);
};

const getEventsOfVolunteer = (volunteerId: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/applications?relatedTo=volunteer&id={volunteerId}`,
    method: "get",
  };

  return axios.request(config);
};

export { getVolunteersOfEvent, getEventsOfVolunteer };

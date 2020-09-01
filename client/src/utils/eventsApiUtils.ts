import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import { Event } from "../data/types/eventTypes";

const createEvent = (body: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/create`,
    method: 'post',
    data: body
  }
  return axios.request(config)
} 

const getEvents = (limit: number, offset: number) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/?limit=${limit}&offset=${offset}`,
    method: "get",
  };

  return axios.request(config);
};

const getActiveEvents = () => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/active`,
    method: "get",
  };

  return axios.request(config);
};

const getPastEvents = (limit: number, offset: number) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/past?limit=${limit}&offset=${offset}`,
    method: "get",
  };

  return axios.request(config);
};

const updateEvent = (event: Event) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/${event.id}`,
    method: "put",
    data: event,
  };

  return axios.request(config);
};

const getApplications = async (eventName: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/applications/?name=${eventName}`,
    method: "get",
  };

  return await axios.request(config);
};

const retractInvitation = async (id: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/invitations/update`,
    method: "patch",
    data: {
    }
  };
  return await axios.request(config)
}

const getVolunteers = async (eventName: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/volunteers/?name=${eventName}`,
    method: "get",
  };

  return await axios.request(config);
};

const getSchoolInfo = async () => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/events/`,
  };
  return await axios.request(config);
};

export {
  getEvents,
  getActiveEvents,
  getPastEvents,
  updateEvent,
  getApplications,
  getSchoolInfo,
  getVolunteers,
  createEvent,
  retractInvitation
};

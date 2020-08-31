import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";
import Invitation from "../data/types/invitationTypes";

const getEventInvitations = (eventId: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/invitations?relatedTo=event&id=${eventId}`,
    method: "get",
  };

  return axios.request(config);
};

const getVolunteerInvitations = (volunteerId: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/invitations?relatedTo=volunteer&id=${volunteerId}`,
    method: "get",
  };

  return axios.request(config);
};

const update = (invitation: Invitation) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/invitations/${invitation.id}`,
    method: "put",
    data: invitation,
  };

  return axios.request(config);
};

const create = (invitation: Invitation) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/invitations`,
    method: "post",
    data: invitation,
  };

  return axios.request(config);
};

export { create, getEventInvitations, getVolunteerInvitations, update };

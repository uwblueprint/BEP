import { FETCH_VOLUNTEER_APPLICATIONS, FETCH_VOLUNTEER_INVITATIONS, FETCH_EVENTS_OF_VOLUNTEER } from "./actionTypes";
import Application from "../types/applicationTypes";
import Invitation from "../types/invitationTypes";
import EventVolunteer from "../types/eventVolunteerTypes";

export const fetchUserApplications = (applications: Application[]) => {
  return {
    type: FETCH_VOLUNTEER_APPLICATIONS,
    payload: { applications },
  };
};

export const fetchUserInvitations = (invitations: Invitation[]) => {
  return {
    type: FETCH_VOLUNTEER_INVITATIONS,
    payload: { invitations },
  }
}

export const fetchVolunteerEvents = (events: EventVolunteer[]) => {
  return {
    type: FETCH_EVENTS_OF_VOLUNTEER,
    payload: { events },
  }
}
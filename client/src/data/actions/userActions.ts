import { FETCH_VOLUNTEER_APPLICATIONS, FETCH_VOLUNTEER_INVITATIONS } from "./actionTypes";
import Application from "../types/applicationTypes";
import Invitation from "../types/invitationTypes";

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

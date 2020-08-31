import { UPDATE_INVITATION, CREATE_INVITATION } from "./actionTypes";
import Invitation from "../types/invitationTypes";

export const updateInvitation = (invitation: Invitation) => ({
  type: UPDATE_INVITATION,
  payload: { invitation },
});

export const createInvitation = (invitation: Invitation) => ({
  type: CREATE_INVITATION,
  payload: { invitation },
});

import Invitation from "../types/invitationTypes";
  import { create, update, getVolunteerInvitations } from "../../utils/invitationsApiUtils";
import {
  createInvitation,
  updateInvitation,
} from "../actions/invitationsActions";
import { fetchUserInvitations  } from '../actions/userActions';

export function updateInvitationService(invitation: Invitation) {
  return (dispatch: any) => {
    return update(invitation).then((res: any) => {
      dispatch(updateInvitation(res.data));
      return res;
    });
  };
}

export function createInvitationService(invitation: Invitation) {
  return (dispatch: any) => {
    return create(invitation).then((res: any) => {
      dispatch(createInvitation(invitation));
      return res;
    });
  };
}

export function fetchInvitationsByVolunteer(id: string) {
  return (dispatch: any) => {
    return getVolunteerInvitations(id).then((res: any) => {
      dispatch(fetchUserInvitations(res.data));
      return res.data;
    });
  };
}

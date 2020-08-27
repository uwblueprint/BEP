import { FETCH_USER_PICKLIST } from "../actions/actionTypes";
import { UserPicklistType } from "../types/userPicklistTypes";
import { UserPicklistsAction } from "../actions/userPicklistActions";

export interface UserPicklistsPayload {
  picklistType: UserPicklistType;
  picklist: string[];
}

export type UserPicklistState = {
  [key in UserPicklistType]: string[];
};

const initialState: UserPicklistState = {
  [UserPicklistType.coopPlacementMode]: [],
  [UserPicklistType.coopPlacementTime]: [],
  [UserPicklistType.expertiseAreas]: [],
  [UserPicklistType.followedPrograms]: [],
  [UserPicklistType.grades]: [],
  [UserPicklistType.languages]: [],
  [UserPicklistType.localPostSecondaryInstitutions]: [],
  [UserPicklistType.locations]: [],
  [UserPicklistType.postSecondaryTraining]: [],
  [UserPicklistType.professionalAssociations]: [],
  [UserPicklistType.volunteerDesiredExternalActivities]: [],
  [UserPicklistType.volunteerDesiredInternalActivities]: [],
  [UserPicklistType.educatorDesiredActivities]: [],
  [UserPicklistType.introductionMethod]: [],
  [UserPicklistType.schoolBoard]: [],
  [UserPicklistType.schoolName]: [],
  [UserPicklistType.position]: [],
  [UserPicklistType.moreInfo]: [],
};

export default function (
  state: UserPicklistState = initialState,
  action: UserPicklistsAction
) {
  switch (action.type) {
    case FETCH_USER_PICKLIST:
      return {
        ...state,
        [UserPicklistType[action.payload.picklistType]]:
          action.payload.picklist,
      };

    default:
      return state;
  }
}

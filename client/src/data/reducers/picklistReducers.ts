import { FETCH_PICKLIST } from "../actions/actionTypes";
import { PicklistType } from "../types/picklistTypes";
import { PicklistsAction } from "../actions/picklistActions";

export interface PicklistsPayload {
  picklistType: PicklistType;
  picklist: string[];
}

export type PicklistState = {
  [key in PicklistType]: string[];
};

const initialState: PicklistState = {
  [PicklistType.allActivities]: [],
  [PicklistType.coopPlacementMode]: [],
  [PicklistType.coopPlacementTime]: [],
  [PicklistType.educatorDesiredActivities]: [],
  [PicklistType.expertiseAreas]: [],
  [PicklistType.followedPrograms]: [],
  [PicklistType.grades]: [],
  [PicklistType.introductionMethod]: [],
  [PicklistType.languages]: [],
  [PicklistType.localPostSecondaryInstitutions]: [],
  [PicklistType.locations]: [],
  [PicklistType.postSecondaryTraining]: [],
  [PicklistType.professionalAssociations]: [],
  [PicklistType.volunteerDesiredExternalActivities]: [],
  [PicklistType.volunteerDesiredInternalActivities]: [],
  [PicklistType.schoolBoard]: [],
  [PicklistType.province]: [],
  [PicklistType.city]: [],
  [PicklistType.type]: [],
};

export default function (
  state: PicklistState = initialState,
  action: PicklistsAction
) {
  switch (action.type) {
    case FETCH_PICKLIST:
      return {
        ...state,
        [PicklistType[action.payload.picklistType]]: action.payload.picklist,
      };

    default:
      return state;
  }
}

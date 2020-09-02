import { createSelector } from "reselect";
import { PicklistState } from "../reducers/picklistReducers";
import { PicklistType } from "../types/picklistTypes";

const getPicklistData = (picklistType: PicklistType) => (
  state: PicklistState
) => {
  return state[PicklistType[picklistType]]
    ? state[PicklistType[picklistType]]
    : [];
};

const createPicklistSelector = (picklistType: PicklistType) =>
  createSelector([getPicklistData(picklistType)], (picklist) => picklist);

export const getExternalActivitesPicklist = createPicklistSelector(
  PicklistType.volunteerDesiredExternalActivities
);

export const getInternalActivitesPicklist = createPicklistSelector(
  PicklistType.volunteerDesiredInternalActivities
);

export const getAllActivitiesPicklist = createPicklistSelector(
  PicklistType.allActivities
);

export const getPreferredPronounsPicklist = createPicklistSelector(
  PicklistType.preferredPronouns
);

export const getExpertiesAreasPicklist = createPicklistSelector(
  PicklistType.expertiseAreas
);

export const getGradesPicklist = createPicklistSelector(PicklistType.grades);

export const getPostSecondaryTrainingPicklist = createPicklistSelector(
  PicklistType.postSecondaryTraining
);

export const getLocationsPicklist = createPicklistSelector(
  PicklistType.locations
);

export const getLanguagesPicklist = createPicklistSelector(
  PicklistType.languages
);

export const getEducatorDesiredActivitiesPicklist = createPicklistSelector(
  PicklistType.educatorDesiredActivities
);

export const getSchoolPicklist = createPicklistSelector(PicklistType.school);

export const getIntroductionMethodPicklist = createPicklistSelector(
  PicklistType.introductionMethod
);

export const getPositionPicklist = createPicklistSelector(
  PicklistType.position
);

export const getMoreInfoPicklist = createPicklistSelector(
  PicklistType.moreInfo
);
export const getSchoolBoardPicklist = createPicklistSelector(
  PicklistType.schoolBoard
);

export const getSchoolTypePicklist = createPicklistSelector(PicklistType.type);

//Additional Picklists required for volunteer registration

export const getLocalPostSecondaryInstitutions = createPicklistSelector(
  PicklistType.localPostSecondaryInstitutions
);

export const getProfessionalAssociations = createPicklistSelector(
  PicklistType.professionalAssociations
);

export const getEmploymentStatus = createPicklistSelector(
  PicklistType.employmentStatus
);

export const getIntroductionMethod = createPicklistSelector(
  PicklistType.introductionMethod
);

export const getVolunteerDesiredExternalActivities = createPicklistSelector(
  PicklistType.volunteerDesiredExternalActivities
);

export const getVolunteerDesiredInternalActivities = createPicklistSelector(
  PicklistType.volunteerDesiredInternalActivities
);

//For employers
export const getEmployerSectorsPicklist = createPicklistSelector(
  PicklistType.sectors
); //orgSector

export const getEmployerSizePicklist = createPicklistSelector(
  PicklistType.size
); //orgSize

export const getCoopPlacementMode = createPicklistSelector(
  PicklistType.coopPlacementMode
);

export const getCoopPlacementTime = createPicklistSelector(
  PicklistType.coopPlacementTime
);

export const getFollowedProgramsPicklist = createPicklistSelector(
  PicklistType.followedPrograms
);

export const getPreferredPronouns = createPicklistSelector(
  PicklistType.preferredPronouns
);

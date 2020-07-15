export enum UserType {
  Educator = 1,
  Volunteer = 2,
}

export interface User {
  email: string;
  firstName: string;
  followedPrograms: string[];
  id?: string; // Record id from Salesforce, cannot be modified.
  isSubscribed: boolean;
  lastName: string;
  password: string;
  phoneNumber: string;
  preferredPronouns: string;
  // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student
  userType: UserType;
}

export interface Educator extends User {
  educatorDesiredActivities: string[];
  position: string;
  schoolBoard: string;
  school: string;
}

export interface Volunteer extends User {
  careerDescription: string;

  // Applicable only if volunteer is offering co-op placements.
  coopPlacementMode?: string; // In person or virtual
  coopPlacementSchoolAffiliation?: string;
  coopPlacementTime?: string[]; // During school days, after school, etc.

  jobTitle: string;
  department: string;
  employerName: string;
  employmentStatus: string;
  expertiseAreas: string[];
  extraDescription: string;
  grades: string[]; // Grades the volunteer wants to work with.
  introductionMethod: string; // How the volunteer was introduced to BEP.
  isVolunteerCoordinator: boolean;
  languages: string[];
  linkedIn?: string;
  localPostSecondaryInstitutions: string[];
  locations: string[]; // Locations the volunteer is available in.
  postSecondaryTraining: string[];
  professionalAssociations: string[];
  reasonsForVolunteering: string[];
  volunteerDesiredExternalActivities: string[];
  volunteerDesiredInternalActivities: string[];

  // employer?: {
  //     address: string;
  //     city: string;
  //     name: string;
  //     postalCode: string;
  //     sector: string;
  //     shareActivity: boolean;
  //     size: string;
  //     socialMedia: string[]; // lookup table (?)
  //     phone: number;
  //     website: string;
  // }[];
  // professionalAssociations?: {
  //     name: string;
  //     shareActivity: boolean;
  // }[];
}

// export const isEducator = (obj: any): boolean => {
//   return (
//     UserType[obj.userType] === UserType[UserType.Educator] &&
//     Array.isArray(obj.educatorDesiredActivities) &&
//     typeof obj.educatorDesiredActivities.every(
//       (item: any) => typeof item === "string"
//     ) &&
//     typeof obj.position === "string" &&
//     typeof obj.schoolBoard === "string" &&
//     typeof obj.school === "string"
//   );
// };

// export const isVolunteer = (obj: any): boolean => {
//   return (
//     UserType[obj.userType] === UserType[UserType.Volunteer] &&
//     typeof obj.careerDescription === "string" &&
//     (typeof obj.coopPlacementMode === "string" ||
//       obj.coopPlacementMode === null ||
//       obj.coopPlacementMode === undefined) &&
//     (typeof obj.coopPlacementSchoolAffiliation === "string" ||
//       obj.coopPlacementMode === null ||
//       obj.coopPlacementMode === undefined) &&
//     ((Array.isArray(obj.coopPlacementTime) &&
//       obj.coopPlacementTime.every((item: any) => typeof item === "string")) ||
//       obj.coopPlacementTime === null ||
//       obj.coopPlacementTime === undefined) &&
//     typeof obj.jobTitle === "string" &&
//     typeof obj.department === "string" &&
//     typeof obj.employerName === "string" &&
//     typeof obj.employmentStatus === "string" &&
//     Array.isArray(obj.expertiseAreas) &&
//     obj.expertiseAreas.every((item: any) => typeof item === "string") &&
//     typeof obj.extraDescription === "string" &&
//     Array.isArray(obj.grades) &&
//     obj.grades.every((item: any) => typeof item === "string") &&
//     typeof obj.introductionMethod === "string" &&
//     Array.isArray(obj.languages) &&
//     typeof obj.isVolunteerCoordinator === "boolean" &&
//     obj.languages.every((item: any) => typeof item === "string") &&
//     typeof obj.linkedIn === "string" &&
//     Array.isArray(obj.localPostSecondaryInstitutions) &&
//     obj.localPostSecondaryInstitutions.every(
//       (item: any) => typeof item === "string"
//     ) &&
//     Array.isArray(obj.locations) &&
//     obj.locations.every((item: any) => typeof item === "string") &&
//     Array.isArray(obj.postSecondaryTraining) &&
//     obj.postSecondaryTraining.every((item: any) => typeof item === "string") &&
//     Array.isArray(obj.professionalAssociations) &&
//     obj.professionalAssociations.every(
//       (item: any) => typeof item === "string"
//     ) &&
//     Array.isArray(obj.reasonsForVolunteering) &&
//     obj.reasonsForVolunteering.every((item: any) => typeof item === "string") &&
//     Array.isArray(obj.volunteerDesiredExternalActivities) &&
//     obj.volunteerDesiredExternalActivities.every(
//       (item: any) => typeof item === "string"
//     ) &&
//     Array.isArray(obj.volunteerDesiredInternalActivities) &&
//     obj.volunteerDesiredInternalActivities.every(
//       (item: any) => typeof item === "string"
//     )
//   );
// };

// const isUser = (obj: any): boolean => {
//   return (
//     typeof obj.firstName === "string" &&
//     typeof obj.lastName === "string" &&
//     typeof obj.email === "string" &&
//     Array.isArray(obj.followedPrograms) &&
//     typeof obj.followedPrograms.every(
//       (item: any) => typeof item === "string"
//     ) &&
//     typeof obj.isSubscribed === "boolean" &&
//     typeof obj.password === "string" &&
//     typeof obj.phoneNumber === "number" &&
//     typeof obj.preferredPronouns === "string" &&
//     typeof obj.userType === "number"
//   );
// };

// export { isUser };

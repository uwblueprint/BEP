import School from "./SchoolTypes";

export enum UserType {
  Educator = 1,
  Volunteer = 2,
}

export interface User {
  email: string;
  firstName: string;
  followedPrograms: string[];
  id: string; // Record id from Salesforce, cannot be modified.
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
  school: School;
}

export interface Volunteer extends User {
  careerDescription: string;

  // Applicable only if volunteer is offering co-op placements.
  coopPlacementMode?: string; // In person or virtual
  coopPlacementSchoolAffiliation?: string;
  coopPlacementTime?: string[]; // During school days, after school, etc.

  jobTitle: string;
  department: string;
  employer: Employer;
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
  shareWithEmployer: boolean;
  volunteerDesiredExternalActivities: string[];
  volunteerDesiredInternalActivities: string[];
  // professionalAssociations?: {
  //     name: string;
  //     shareActivity: boolean;
  // }[];
}

export default interface Employer {
  address: string;
  city: string;
  id: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  sectors: string[];
  size: string;
  socialMedia: string[];
  website: string;
}

import { Educator } from "./userTypes";

export interface Event {
  activityType: string[];
  applicantNumber: number;
  contact: Educator;
  endDate: Date;
  eventName: string;
  gradeOfStudents: string;
  hoursCommitment: number;
  id: string;
  invitationNumber: number;
  isActive: boolean;
  isPublic: boolean;
  numberOfStudents: number;
  numberOfVolunteers: number;
  postingExpiry: Date;
  preferredSector: string;
  schoolTransportation: string;
  startDate: Date;

  //   contactName: string;
  //   contactEmail: string;
  //   contactPhone: number;
  //   contactPosition: string;
}

import { Educator } from "./userTypes";

export interface Event {
  contactEmail: string;
  contactPhone: string;
  contactPosition: string;
  contactName: string;
  schoolAddress: string;
  schoolName: string;
  activityType: string;
  applicantNumber: number;
  contact: Educator;
  endDate: Date;
  eventName: string;
  gradeOfStudents: string[];
  hoursCommitment: number;
  id: string;
  invitationNumber: number;
  isActive: boolean;
  isPublic: boolean;
  numberOfStudents: number;
  numberOfVolunteers: number;
  postingExpiry: Date;
  preferredSector: string[];
  schoolTransportation: string;
  startDate: Date;
}

import EducatorInterface from '../api/users/EducatorInterface';

export default interface EventInterface {
    activityType: string[];
    applicantNumber: number;
    contact: EducatorInterface;
    endDate: Date;
    eventName: string;
    gradeOfStudents: string[];
    hoursCommitment: number;
    id?: string;
    invitationNumber: number;
    isActive: boolean;
    isPublic: boolean;
    numberOfStudents: number;
    numberOfVolunteers: number;
    postingExpiry: Date;
    preferredSector: string[];
    schoolTransportation: string;
    startDate: Date;

    //   contactName: string;
    //   contactEmail: string;
    //   contactPhone: number;
    //   contactPosition: string;
}

export interface EventApplicantInterface {
    applicantName: string;
    personalPronouns: string;
    job: string;
    sectors: string;
    linkedinUrl: string;
    areasOfExpertise: string;
    employmentStatus: string;
    accepted: boolean;
    denied: boolean;
    company: string;
}

export interface EventInvitationInterface {
    invitationName: string;
    personalPronouns: string;
    job: string;
    sectors: string;
    linkedinUrl: string;
    areasOfExpertise: string;
    employmentStatus: string;
}

export interface EventVolunteerInterface {
    volunteerName: string;
    job: string;
    company: string;
    personalPronouns: string;
}

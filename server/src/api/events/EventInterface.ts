import EducatorInterface from '../users/EducatorInterface';

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

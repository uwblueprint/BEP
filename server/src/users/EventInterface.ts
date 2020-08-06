export default interface EventInterface {
    eventName: string;
    isActive: boolean;
    activityType: string;
    gradeOfStudents: string;
    preferredSector: string;
    startDate: Date;
    endDate: Date;
    postingExpiry: Date;
    numberOfStudents: number;
    numberOfVolunteers: number;
    hoursCommitment: number;
    schoolName: string;
    schoolAddress: string;
    schoolTransportation: string;
    contactName: string;
    contactEmail: string;
    contactPhone: number;
    contactPosition: string;
    applicantNumber: number;
    invitationNumber: number;
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
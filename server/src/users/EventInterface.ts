
export default interface EventInterface {
    eventName: string;
    isActive: boolean;
    activityType: string;
    gradeOfStudents: string;
    preferredSector: string;
    startDate: Date;
    endDate: Date;
    postingExpiry: Date;
    applicationsReceived: number;
    invitationsSent: number;
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

export default interface EventInterface {
    eventName: string;
    isActive: boolean;
    activityType: string;
    gradeOfStudents: string;
    preferredSector: string;
    startDate: Date;
    endDate: Date;
    postingExpiry: Date;
    startTime: Date;
    endTime: Date;
    applicationsReceived: number;
    invitationsSent: number;
    numberOfStudents: number;
    numberOfVolunteers: number;
    hoursCommitment: number;
}
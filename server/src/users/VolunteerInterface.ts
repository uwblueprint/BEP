import UserInterface from './UserInterface';

enum InternalActivities {
    CareerTalks,
    CareerFairs,
    JobSearchPrep,
    Judging,
    Mentoring,
    Workshops
}

enum ExternalActivities {
    CoopPlacement,
    HostBusinessCaseChallenge,
    InformationalInterview,
    JobShadowing,
    Mentoring,
    SectorPartneredContextualizedExperiences,
    WorkplaceTour,
}

export default interface VolunteerInterface extends UserInterface {
    careerDescription: string;
    currentJobTitle: string;
    department: string;
    desiredActivities: {
        coopPlacement: {
            mode: string;
            schoolAffiliation: string;
            time: string;
        };
        externalActivities: ExternalActivities;
        grades: string[];
        internalActivities: InternalActivities[];
        locations: string[];
    };
    employer: {
        address: string;
        city: string;
        name: string;
        postalCode: string;
        sector: string;
        shareActivity: boolean;
        size: string;
        socialMedia: string[];
        phone: number;
        website: string;
    }[];
    employmentStatus: string;
    expertiseAreas: string[];
    extraDescription: string;
    isVolunteerCoordinator: boolean;
    languages: string[];
    linkedIn: string;
    postSecondaryInstitutions: string[];
    postSecondaryTraining: string;
    professionalAssociations: {
        name: string;
        shareActivity: boolean;
    }[];
    reasonForVolunteering: string;
}

export { InternalActivities, ExternalActivities };

import UserInterface from './UserInterface';

enum InternalActivities {
    CareerTalks,
    CareerFairs,
    Workshops,
    Judging,
    Mentoring,
    JobSearchPrep
}

enum ExternalActivities {
    WorkplaceTour,
    HostBusinessCaseChallenge,
    Mentoring,
    JobShadowing,
    InformationalInterview,
    CoopPlacement,
    SectorPartneredContextualizedExperiences
}

export default interface VolunteerInterface extends UserInterface {
    employmentStatus: string;
    currentJobTitle: string;

    employer: {
        name: string;
        sector: string;
        website: string;
        socialMedia: string[];
        address: string;
        city: string;
        postalCode: string;
        phone: number;
        size: string;
        shareActivity: boolean;
    }[];
    department: string;
    isVolunteerCoordinator: boolean;

    linkedIn: string;
    postSecondaryInstitutions: string[];

    professionalAssociations: {
        name: string;
        shareActivity: boolean;
    }[];

    expertiseAreas: string[];
    postSecondaryTraining: string;
    languages: string[];
    careerDescription: string;
    extraDescription: string;

    desiredActivities: {
        internalActivities: InternalActivities[];
        externalActivities: ExternalActivities;
        coopPlacement: {
            time: string;
            mode: string;
            schoolAffiliation: string;
        };
        locations: string[];
        grades: string[];
    };

    reasonForVolunteering: string;
}

export { InternalActivities, ExternalActivities };

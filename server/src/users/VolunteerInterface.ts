import UserInterface from './UserInterface';

export default interface VolunteerInterface extends UserInterface {
    // Fields for Volunteers:
    careerDescription: string;

    // Applicable if volunteer is offering co-op placements.
    coopPlacementMode?: string; // In person or virtual
    coopPlacementSchoolAffiliation?: string; 
    coopPlacementTime?: string; // During school days, after school, etc.

    currentJobTitle: string;
    department: string;
    
    // employer?: {
    //     address: string;
    //     city: string;
    //     name: string;
    //     postalCode: string;
    //     sector: string;
    //     shareActivity: boolean;
    //     size: string;
    //     socialMedia: string[]; // lookup table (?)
    //     phone: number;
    //     website: string;
    // }[];

    employerName: string;
    employmentStatus: string;
    expertiseAreas: string[];
    extraDescription: string;
    grades: string[];  // Grades the volunteer wants to work with.
    introductionMethod: string; // How the volunteer was introduced to BEP.
    isVolunteerCoordinator: boolean;
    languages: string[];
    linkedIn?: string;
    localPostSecondaryInstitutions: string[];
    locations: string[]; // Locations the volunteer is available in.
    postSecondaryTraining: string[];
    // professionalAssociations?: {
    //     name: string;
    //     shareActivity: boolean;
    // }[];
    professionalAssociations: string[];
    reasonsForVolunteering: string[];
    volunteerDesiredExternalActivities: string[];
    volunteerDesiredInternalActivities: string[];
}



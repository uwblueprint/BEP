import UserInterface, { UserType } from './UserInterface';
import EmployerInterface, { isEmployer } from '../employers/EmployerInterface';

export default interface VolunteerInterface extends UserInterface {
    careerDescription: string;

    // Applicable only if volunteer is offering co-op placements.
    coopPlacementMode?: string; // In person or virtual
    coopPlacementSchoolAffiliation?: string;
    coopPlacementTime?: string[]; // During school days, after school, etc.

    jobTitle: string;
    department: string;
    employer: EmployerInterface;
    employmentStatus: string;
    expertiseAreas: string[];
    extraDescription: string;
    grades: string[]; // Grades the volunteer wants to work with.
    introductionMethod: string; // How the volunteer was introduced to BEP.
    isVolunteerCoordinator: boolean;
    languages: string[];
    linkedIn?: string;
    localPostSecondaryInstitutions: string[];
    locations: string[]; // Locations the volunteer is available in.
    postSecondaryTraining: string[];
    professionalAssociations: string[];
    reasonsForVolunteering: string[];
    shareWithEmployer: boolean;
    volunteerDesiredExternalActivities: string[];
    volunteerDesiredInternalActivities: string[];
    
    // professionalAssociations?: {
    //     name: string;
    //     shareActivity: boolean;
    // }[];
}

export const isVolunteer = (obj: any): boolean => {
    return (
        UserType[obj.userType] === UserType[UserType.Volunteer] &&
        typeof obj.careerDescription === 'string' &&
        (typeof obj.coopPlacementMode === 'string' ||
            obj.coopPlacementMode === null ||
            obj.coopPlacementMode === undefined) &&
        (typeof obj.coopPlacementSchoolAffiliation === 'string' ||
            obj.coopPlacementMode === null ||
            obj.coopPlacementMode === undefined) &&
        ((Array.isArray(obj.coopPlacementTime) && obj.coopPlacementTime.every(item => typeof item === 'string')) ||
            obj.coopPlacementTime === null ||
            obj.coopPlacementTime === undefined) &&
        typeof obj.jobTitle === 'string' &&
        typeof obj.department === 'string' &&
        // isEmployer(obj.employer) &&
        typeof obj.employmentStatus === 'string' &&
        Array.isArray(obj.expertiseAreas) &&
        obj.expertiseAreas.every(item => typeof item === 'string') &&
        typeof obj.extraDescription === 'string' &&
        Array.isArray(obj.grades) &&
        obj.grades.every(item => typeof item === 'string') &&
        typeof obj.introductionMethod === 'string' &&
        Array.isArray(obj.languages) &&
        typeof obj.isVolunteerCoordinator === 'boolean' &&
        obj.languages.every(item => typeof item === 'string') &&
        typeof obj.linkedIn === 'string' &&
        Array.isArray(obj.localPostSecondaryInstitutions) &&
        obj.localPostSecondaryInstitutions.every(item => typeof item === 'string') &&
        Array.isArray(obj.locations) &&
        obj.locations.every(item => typeof item === 'string') &&
        Array.isArray(obj.postSecondaryTraining) &&
        obj.postSecondaryTraining.every(item => typeof item === 'string') &&
        Array.isArray(obj.professionalAssociations) &&
        obj.professionalAssociations.every(item => typeof item === 'string') &&
        Array.isArray(obj.reasonsForVolunteering) &&
        obj.reasonsForVolunteering.every(item => typeof item === 'string') &&
        Array.isArray(obj.volunteerDesiredExternalActivities) &&
        obj.volunteerDesiredExternalActivities.every(item => typeof item === 'string') &&
        Array.isArray(obj.volunteerDesiredInternalActivities) &&
        obj.volunteerDesiredInternalActivities.every(item => typeof item === 'string')
    );
};

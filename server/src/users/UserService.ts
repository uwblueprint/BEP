/**
 * Data Model Interfaces
 */

import { conn } from '../server';
import Educator, { isEducator } from './EducatorInterface';
import User, { isUser, UserType } from './UserInterface';
import Volunteer, { isVolunteer } from './VolunteerInterface';

const siteUser: string = 'SiteUser__c';

// Converts between Salesforce picklist (string of object delimited by semicolons) and arrays.
const arrayToPicklistString = (arr: string[]): string =>
    arr.reduce((acc, item) => acc + item + ';', '').replace(/;$/, ''); // Remove trailing semicolon.
const picklistStringToArray = (str: string): string[] => str.split(';');

// Map fields of user modes to Salesforce fields.
const createSalesforceUser = (user: User, id?: string): any => {
    let salesforceUser: any = {
        email__c: user.email,
        firstName__c: user.firstName,
        followedPrograms__c: arrayToPicklistString(user.followedPrograms),
        ...(id && { Id: id }),
        isSubscribed__c: user.isSubscribed,
        lastName__c: user.lastName,
        Name: user.firstName + ' ' + user.lastName,
        password__c: user.password,
        phoneNumber__c: user.phoneNumber,
        preferredPronouns__c: user.preferredPronouns,
        userType__c: user.userType
    };

    if (isEducator(user)) {
        salesforceUser = {
            ...salesforceUser,
            educatorDesiredActivities__c: arrayToPicklistString((user as Educator).educatorDesiredActivities),
            position__c: (user as Educator).position,
            school__c: (user as Educator).school,
            schoolBoard__c: (user as Educator).schoolBoard
        };
    } else if (isVolunteer(user)) {
        salesforceUser = {
            ...salesforceUser,
            careerDescription__c: (user as Volunteer).careerDescription,
            ...((user as Volunteer).coopPlacementMode && {
                coopPlacementMode__c: (user as Volunteer).coopPlacementMode
            }),
            ...((user as Volunteer).coopPlacementSchoolAffiliation && {
                coopPlacementSchoolAffiliation__c: (user as Volunteer).coopPlacementSchoolAffiliation
            }),
            ...((user as Volunteer).coopPlacementTime && {
                coopPlacementTime__c: arrayToPicklistString((user as Volunteer).coopPlacementTime)
            }),
            department__c: (user as Volunteer).department,
            employerName__c: (user as Volunteer).employerName,
            employmentStatus__c: (user as Volunteer).employmentStatus,
            expertiseAreas__c: arrayToPicklistString((user as Volunteer).expertiseAreas),
            extraDescription__c: (user as Volunteer).extraDescription,
            grades__c: arrayToPicklistString((user as Volunteer).grades),
            introductionMethod__c: (user as Volunteer).introductionMethod,
            isVolunteerCoordinator__c: (user as Volunteer).isVolunteerCoordinator,
            jobTitle__c: (user as Volunteer).jobTitle,
            languages__c: arrayToPicklistString((user as Volunteer).languages),
            linkedIn__c: (user as Volunteer).linkedIn,
            localPostSecondaryInstitutions__c: arrayToPicklistString(
                (user as Volunteer).localPostSecondaryInstitutions
            ),
            locations__c: arrayToPicklistString((user as Volunteer).locations),
            postSecondaryTraining__c: arrayToPicklistString((user as Volunteer).postSecondaryTraining),
            professionalAssociations__c: arrayToPicklistString((user as Volunteer).professionalAssociations),
            reasonsForVolunteering__c: arrayToPicklistString((user as Volunteer).reasonsForVolunteering),
            volunteerDesiredExternalActivities__c: arrayToPicklistString(
                (user as Volunteer).volunteerDesiredExternalActivities
            ),
            volunteerDesiredInternalActivities__c: arrayToPicklistString(
                (user as Volunteer).volunteerDesiredInternalActivities
            )
        };
    } else {
        throw Error('Input is not a valid volunteer or educator.');
    }

    return salesforceUser;
};

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 */

// Retrieve user by ID.
export const getUser = async (id: string): Promise<User> => {
    const userFields =
        'email__c, firstName__c, phoneNumber__c, followedPrograms__c, Id, isSubscribed__c, lastName__c, password__c, ' +
        'preferredPronouns__c, userType__c, educatorDesiredActivities__c, position__c, schoolBoard__c, school__c, careerDescription__c, ' +
        'coopPlacementMode__c, coopPlacementSchoolAffiliation__c, coopPlacementTime__c, jobTitle__c, department__c, employerName__c, ' +
        'employmentStatus__c, expertiseAreas__c, extraDescription__c, grades__c, introductionMethod__c, isVolunteerCoordinator__c, languages__c, ' +
        'linkedIn__c, localPostSecondaryInstitutions__c, locations__c, postSecondaryTraining__c, professionalAssociations__c, reasonsForVolunteering__c,' +
        'volunteerDesiredExternalActivities__c, volunteerDesiredInternalActivities__c';

    const user: User = conn
        .sobject(siteUser)
        .find(
            {
                Id: id
            },
            userFields
        )
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }

            const user: User = {
                email: record[0].email__c,
                firstName: record[0].firstName__c,
                followedPrograms: record[0].followedPrograms__c,
                id: record[0].Id,
                isSubscribed: record[0].isSubscribed__c,
                lastName: record[0].lastName__c,
                password: record[0].password__c,
                phoneNumber: record[0].phoneNumber__c,
                preferredPronouns: record[0].preferredPronouns__c,
                userType: record[0].userType__c
            };

            if (UserType[record[0].userType__c] === UserType[UserType.Educator]) {
                // User is an educator.
                (user as Educator).educatorDesiredActivities = picklistStringToArray(
                    record[0].educatorDesiredActivities__c
                );
                (user as Educator).position = record[0].position__c;
                (user as Educator).schoolBoard = record[0].schoolBoard__c;
                (user as Educator).school = record[0].school__c;
            } else if (UserType[record[0].userType__c] === UserType[UserType.Volunteer]) {
                // User is a volunteer.
                (user as Volunteer).careerDescription = record[0].careerDescription__c;
                (user as Volunteer).coopPlacementMode = record[0].coopPlacementMode__c;
                (user as Volunteer).coopPlacementSchoolAffiliation = record[0].coopPlacementSchoolAffiliation__c;
                (user as Volunteer).coopPlacementTime = picklistStringToArray(record[0].coopPlacementTime__c);
                (user as Volunteer).jobTitle = record[0].jobTitle__c;
                (user as Volunteer).department = record[0].department__c;
                (user as Volunteer).employerName = record[0].employerName__c;
                (user as Volunteer).employmentStatus = record[0].employmentStatus__c;
                (user as Volunteer).expertiseAreas = picklistStringToArray(record[0].expertiseAreas__c);
                (user as Volunteer).extraDescription = record[0].extraDescription__c;
                (user as Volunteer).grades = picklistStringToArray(record[0].grades__c);
                (user as Volunteer).introductionMethod = record[0].introductionMethod__c;
                (user as Volunteer).isVolunteerCoordinator = record[0].isVolunteerCoordinator__c;
                (user as Volunteer).languages = picklistStringToArray(record[0].languages__c);
                (user as Volunteer).linkedIn = record[0].linkedIn__c;
                (user as Volunteer).localPostSecondaryInstitutions = picklistStringToArray(
                    record[0].localPostSecondaryInstitutions__c
                );
                (user as Volunteer).locations = picklistStringToArray(record[0].locations__c);
                (user as Volunteer).postSecondaryTraining = picklistStringToArray(record[0].postSecondaryTraining__c);
                (user as Volunteer).professionalAssociations = picklistStringToArray(
                    record[0].professionalAssociations__c
                );
                (user as Volunteer).reasonsForVolunteering = picklistStringToArray(record[0].reasonsForVolunteering__c);
                (user as Volunteer).volunteerDesiredExternalActivities = picklistStringToArray(
                    record[0].volunteerDesiredExternalActivities__c
                );
                (user as Volunteer).volunteerDesiredInternalActivities = picklistStringToArray(
                    record[0].volunteerDesiredInternalActivities__c
                );
            }
            return user;
        });

    return user;
};

// Update user by ID.
export const update = async (id: string, user: User): Promise<User> => {
    if (!isUser(user)) {
        throw Error('Input is not a valid user.');
    }

    const updatedUser: User = conn
        .sobject(siteUser)
        .update(createSalesforceUser(user, id), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return updatedUser;
};

// Create new user and return ID.
export const create = async (user: User): Promise<string> => {
    const userInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(siteUser)
        .create(createSalesforceUser(user), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return userInfo.id;
};

// Delete a user by ID.
export const remove = async (id: string): Promise<void> => {
    return conn
        .sobject(siteUser)
        .find({
            Id: id
        })
        .destroy((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
};

/**
 * Data Model Interfaces
 */

import { conn } from '../../server';
import Educator, { isEducator } from './EducatorInterface';
import Employer from '../employers/EmployerInterface';
import * as EmployerService from '../employers/EmployerService';
import User, { isUser, UserType } from './UserInterface';
import Volunteer, { isVolunteer } from './VolunteerInterface';
import { arrayToPicklistString, picklistStringToArray } from '../../util/SalesforcePicklistUtils';

const siteUser: string = 'SiteUser__c';
const userFields: string =
    'email__c, firstName__c, phoneNumber__c, followedPrograms__c, Id, isSubscribed__c, lastName__c, password__c, ' +
    'preferredPronouns__c, userType__c, educatorDesiredActivities__c, position__c, schoolBoard__c, schoolName__c, careerDescription__c, ' +
    'coopPlacementMode__c, coopPlacementSchoolAffiliation__c, coopPlacementTime__c, jobTitle__c, department__c, employer__c, ' +
    'employmentStatus__c, expertiseAreas__c, extraDescription__c, grades__c, introductionMethod__c, isVolunteerCoordinator__c, languages__c, ' +
    'linkedIn__c, localPostSecondaryInstitutions__c, locations__c, postSecondaryTraining__c, professionalAssociations__c, reasonsForVolunteering__c,' +
    'shareWithEmployer__c, volunteerDesiredExternalActivities__c, volunteerDesiredInternalActivities__c';

// Map fields of user model to Salesforce fields.
const userModelToSalesforceUser = (user: User, id?: string): any => {
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
            school__c: (user as Educator).schoolName,
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
            employer__c: (user as Volunteer).employer ? (user as Volunteer).employer.id : null,
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

// Map Saleforce record fields to user model fields.
const salesforceUserToUserModel = async (record: any): Promise<User> => {
    const user: User = {
        email: record.email__c,
        firstName: record.firstName__c,
        followedPrograms: record.followedPrograms__c,
        id: record.Id,
        isSubscribed: record.isSubscribed__c,
        lastName: record.lastName__c,
        password: record.password__c,
        phoneNumber: record.phoneNumber__c,
        preferredPronouns: record.preferredPronouns__c,
        userType: record.userType__c
    };

    if (UserType[record.userType__c] === UserType[UserType.Educator]) {
        // User is an educator.
        (user as Educator).educatorDesiredActivities = picklistStringToArray(record.educatorDesiredActivities__c);
        (user as Educator).position = record.position__c;
        (user as Educator).schoolBoard = record.schoolBoard__c;
        (user as Educator).schoolName = record.schoolName__c;
    } else if (UserType[record.userType__c] === UserType[UserType.Volunteer]) {
        // User is a volunteer.
        let employer: Employer = null;
        if (record.employer__c !== null) {
            const employerId = record.employer__c;
            employer = await EmployerService.get(employerId);
        }

        (user as Volunteer).careerDescription = record.careerDescription__c;
        (user as Volunteer).coopPlacementMode = record.coopPlacementMode__c;
        (user as Volunteer).coopPlacementSchoolAffiliation = record.coopPlacementSchoolAffiliation__c;
        (user as Volunteer).coopPlacementTime = picklistStringToArray(record.coopPlacementTime__c);
        (user as Volunteer).jobTitle = record.jobTitle__c;
        (user as Volunteer).department = record.department__c;
        (user as Volunteer).employer = employer;
        (user as Volunteer).employmentStatus = record.employmentStatus__c;
        (user as Volunteer).expertiseAreas = picklistStringToArray(record.expertiseAreas__c);
        (user as Volunteer).extraDescription = record.extraDescription__c;
        (user as Volunteer).grades = picklistStringToArray(record.grades__c);
        (user as Volunteer).introductionMethod = record.introductionMethod__c;
        (user as Volunteer).isVolunteerCoordinator = record.isVolunteerCoordinator__c;
        (user as Volunteer).languages = picklistStringToArray(record.languages__c);
        (user as Volunteer).linkedIn = record.linkedIn__c;
        (user as Volunteer).localPostSecondaryInstitutions = picklistStringToArray(
            record.localPostSecondaryInstitutions__c
        );
        (user as Volunteer).locations = picklistStringToArray(record.locations__c);
        (user as Volunteer).postSecondaryTraining = picklistStringToArray(record.postSecondaryTraining__c);
        (user as Volunteer).professionalAssociations = picklistStringToArray(record.professionalAssociations__c);
        (user as Volunteer).reasonsForVolunteering = picklistStringToArray(record.reasonsForVolunteering__c);
        (user as Volunteer).volunteerDesiredExternalActivities = picklistStringToArray(
            record.volunteerDesiredExternalActivities__c
        );
        (user as Volunteer).volunteerDesiredInternalActivities = picklistStringToArray(
            record.volunteerDesiredInternalActivities__c
        );
    }

    return user;
};

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 */

// Retrieve user by email.
export const getUser = async (userInfo: { Id?: string; email?: string }): Promise<User> => {
    let userIdentifier;
    if (userInfo.Id) userIdentifier = { Id: userInfo.Id };
    else if (userInfo.email) userIdentifier = { email__c: userInfo.email };
    else throw Error('No valid user identifier provided.');

    const user: User = conn
        .sobject(siteUser)
        .find(userIdentifier, userFields)
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }
            return salesforceUserToUserModel(record[0]);
        });

    return await user;
};

// Retrieve list of volunteers in alphabetical order

export const getVolunteers = async (limit: number, offset: number): Promise<User[]> => {
    let volunteers: User[] = [];
    let volunteerPromises: Promise<User>[] = [];
    const volunteerUserType: number = 2;
    await conn.query(
        `SELECT ${userFields} FROM ${siteUser} WHERE userType__c=${volunteerUserType} ORDER BY Name LIMIT ${limit} OFFSET ${offset}`,
        function(err, result) {
            if (err) {
                return console.error(err);
            }
            volunteerPromises = result.records.map(record =>
                salesforceUserToUserModel(record).then(res => {
                    volunteers.push(res);
                })
            );
        }
    );

    await Promise.all(volunteerPromises);

    return volunteers;
};

// Update user by ID.
export const update = async (id: string, user: User): Promise<User> => {
    if (!isUser(user)) {
        throw Error('Input is not a valid user.');
    }

    const updatedUser: User = conn
        .sobject(siteUser)
        .update(userModelToSalesforceUser(user, id), (err: Error, result: any) => {
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
        .create(userModelToSalesforceUser(user), (err: Error, result: any) => {
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

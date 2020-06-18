/**
 * Data Model Interfaces
 */

import User from './UserInterface';
import Volunteer from './VolunteerInterface';
import Educator from './EducatorInterface';
import { conn } from '../server';
// import * as express from 'express';

const siteUser: string = 'SiteUser__c';

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of SiteUser object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> SiteUser__c -> Fields
 */

// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const getUserInfo = async (id: string): Promise<User> => {
    let userInfo: User = conn
        .sobject(siteUser)
        .find(
            {
                ID__c: id
            },
            'Id, firstName__c, lastName__c, email__c, phoneNumber__c, password__c, ID__c,userType__c'
        )
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }

            let user: User = {
                firstName: record[0].Name,
                lastName: record[0].lastName__c,
                email: record[0].email__c,
                phoneNumber: record[0].phoneNumber__c,
                password: record[0].password__c,
                preferredPronouns: null,
                followedPrograms: [],
                isSubscribed: false,
                id: record[0].ID__c,
                recordId: record[0].Id,
                userType: record[0].userType__c,
            };
            return user;
        });
    // console.log(userInfo);
    return userInfo;
};

const isUser = (obj: any): boolean => {
    return typeof obj.firstName === "string" &&
        typeof obj.lastName === "string" &&
        typeof obj.email === "string" &&
        Array.isArray(obj.followedPrograms) && 
        typeof obj.followedPrograms.every(item => typeof item === "string") &&
        typeof obj.id === "string" &&
        typeof obj.recordId === "string" &&
        typeof obj.isSubscribed === "boolean" &&
        typeof obj.password === "string" &&
        typeof obj.phoneNumber ===  "number" &&
        typeof obj.preferredPronouns === "string" &&
        typeof obj.userType === "number"
}

const isEducator = (obj:any): boolean => {
    return obj.userType === 1 &&
        Array.isArray(obj.educatorDesiredActivities) &&
        typeof obj.educatorDesiredActivities.every(item => typeof item === "string") &&
        typeof obj.position === "string" &&
        typeof obj.schoolBoard === "string" &&
        typeof obj.school === "string"
}

const isVolunteer = (obj:any): boolean => {
    return obj.userType === 2 &&
        typeof obj.careerDescription === "string" &&
        (typeof obj.coopPlacementMode === "string" || obj.coopPlacementMode == null || obj.coopPlacementMode == undefined) &&
        (typeof obj.coopPlacementSchoolAffiliation === "string" || obj.coopPlacementMode == null || obj.coopPlacementMode == undefined) &&
        (typeof obj.coopPlacementTime === "string" || obj.coopPlacementTime == null || obj.coopPlacementTime == undefined) &&
        typeof obj.employerName === "string" &&
        typeof obj.employmentStatus === "string" &&
        Array.isArray(obj.expertiseAreas) &&
        obj.expertiseAreas.every(item => typeof item === "string") &&
        typeof obj.extraDescription === "string" &&
        Array.isArray(obj.grades) &&
        obj.grades.every(item => typeof item === "string") &&
        Array.isArray(obj.introductionMethod) &&
        obj.introductionMethod.every(item => typeof item === "string") &&
        Array.isArray(obj.languages) &&
        typeof obj.isVolunteerCoordinator === "boolean" && 
        obj.languages.every(item => typeof item === "string") &&
        typeof obj.linkedIn === "string" && 
        Array.isArray(obj.localPostSecondaryInstitutions) &&
        obj.localPostSecondaryInstitutions.every(item => typeof item === "string") &&
        Array.isArray(obj.locations) &&
        obj.locations.every(item => typeof item === "string") &&
        Array.isArray(obj.postSecondaryTraining) &&
        obj.postSecondaryTraining.every(item => typeof item === "string") &&
        Array.isArray(obj.professionalAssociations) &&
        obj.professionalAssociations.every(item => typeof item === "string") &&
        Array.isArray(obj.reasonsForVolunteering) &&
        obj.reasonsForVolunteering.every(item => typeof item === "string") &&
        Array.isArray(obj.volunteerDesiredExternalActivities) &&
        obj.volunteerDesiredExternalActivities.every(item => typeof item === "string") &&
        Array.isArray(obj.volunteerDesiredInternalActivities) &&
        obj.volunteerDesiredInternalActivities.every(item => typeof item === "string")
}

const arrayToString = (arr: string[]): string => arr.reduce((acc, item) => acc + item + ";", "")


export const update = async (id: string, user: User): Promise<User> => {
    console.log(user);
    
    // const isUser = (obj: any): boolean => {
    //     return typeof obj. === "string",
    // }


    // error if one of the required fields for user (in salesforce model) is missing
    let updateFields = {
        Id: user.recordId,
        email__c: user.email,
        phoneNumber__c: user.phoneNumber,
        firstName__c: user.firstName,
        lastName__c: user.lastName,
        preferredPronouns__c: user.preferredPronouns,
        userType__c: user.userType,
        Name: user.firstName + " " + user.lastName,
    };

    if(isEducator(user)){
        updateFields = {
            ...updateFields,
            educatorDesiredActivities__c: arrayToString((user as Educator).educatorDesiredActivities),
            position__c: (user as Educator).position,
            schoolBoard__c: (user as Educator).schoolBoard,
            school__c: (user as Educator).school,
        };
    }
    else if(isVolunteer(user)){
        updateFields = {
            ...updateFields,
            careerDescription__c: (user as Volunteer).careerDescription,
            ...(user as Volunteer).coopPlacementMode && {coopPlacementMode__c: (user as Volunteer).coopPlacementMode},
            ...(user as Volunteer).coopPlacementSchoolAffiliation && {coopPlacementSchoolAffiliation__c: (user as Volunteer).coopPlacementSchoolAffiliation},
            ...(user as Volunteer).coopPlacementTime && {coopPlacementTime__c: (user as Volunteer).coopPlacementTime},
            currentJobTitle__c: (user as Volunteer).currentJobTitle,
            department__c: (user as Volunteer).department,
            employerName__c: (user as Volunteer).employerName,
            employmentStatus__c: (user as Volunteer).employmentStatus,
            expertiseAreas__c: arrayToString((user as Volunteer).expertiseAreas),
            extraDescription__c: (user as Volunteer).extraDescription,
            grades__c: arrayToString((user as Volunteer).grades),
            introductionMethod__c: (user as Volunteer).introductionMethod,
            isVolunteerCoordinator__c: (user as Volunteer).isVolunteerCoordinator,
            languages__c: arrayToString((user as Volunteer).languages),
            linkedIn__c: (user as Volunteer).linkedIn,
            localPostSecondaryInstitutions__c: arrayToString((user as Volunteer).localPostSecondaryInstitutions),
            locations__c: arrayToString((user as Volunteer).locations),
            postSecondaryTraining__c: arrayToString((user as Volunteer).postSecondaryTraining),
            professionalAssociations__c: arrayToString((user as Volunteer).professionalAssociations),
            reasonsForVolunteering__c: arrayToString((user as Volunteer).reasonsForVolunteering),
            volunteerDesiredExternalActivities__c: arrayToString((user as Volunteer).volunteerDesiredExternalActivities),
            volunteerDesiredInternalActivities__c: arrayToString((user as Volunteer).volunteerDesiredInternalActivities),
        }
    }
    else {
        //throw error. not a valid volunteer or educator
    }
        

    // Salesforce does ignores fields that are not part of obj.
    // Salesforce returns error if field type not correct.

    let updatedUser: User = conn
        .sobject(siteUser)
        .update(
            updateFields, (err, ret) => {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }

                console.log('Updated Successfully : ' + ret.id);
            }
        )

    return updatedUser;
};

// create new user object in salesforce with fields
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    lastName: string
): Promise<void> => {
    conn.sobject(siteUser).create(
        {
            Name: name,
            email__c: email,
            password__c: password,
            phoneNumber__c: phoneNumber,
            lastName__c: lastName
        },
        function(err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
            console.log('created User with ID : ' + result.id + result.Name);
        }
    );
};

// Delete a user by name (should be changed to ID in the future once ID field in salesforce is figured out)
export const remove = async (name: string): Promise<void> => {
    conn.sobject(siteUser)
        .find({
            Name: name
        })
        .destroy(function(err: Error, result) {
            if (err) {
                return console.log(err);
            }
            console.log('Deleted User with ID: ' + result[0].id);
        });
};

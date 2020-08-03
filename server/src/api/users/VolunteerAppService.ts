/**
 * Data Model Interfaces
 */

import Application from './VolunteerAppInterface';
import { conn } from '../../server';
// import * as express from 'express';


const applicationApi: string = "application__c";

/**
 * Service Methods
 */


/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of eventApi object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> event__c -> Fields
 */



// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const getApplicationInfo = async (applicationId: string): Promise<Event> => {
    let applicationInfo: Event = conn
        .sobject(applicationApi)
        .find({
            ApplicationId: applicationId
        },
            'ApplicationId, volunteerName__c, applicationStatus__c, isActive__c')
        .limit(1)
        .execute(function (err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            let application: Application = {
                applicationId: record[0].ApplicationId,
                volunteerName: record[0].volunteerName__c,
                applicationStatus: record[0].applicationStatus__c,
                isActive: record[0].isActive__c
            }
            return application;
        });
    console.log(applicationInfo);
    return applicationInfo;
};

export const accept = async (id: string, application: Application): Promise<Application> => {
    let acceptedApplication: Application = conn
        .sobject(applicationApi)
        .update(
            {
                applicationId: application.applicationId,
                applicationStatus: 'accepted',
                isActive: true
            },
            function (err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }

                console.log('Accepted Successfully : ' + ret.id);
            }
        )

    return acceptedApplication;
};


export const decline = async (id: string, application: Application): Promise<Application> => {
    let declinedApplication: Application = conn
        .sobject(applicationApi)
        .update(
            {
                applicationId: application.applicationId,
                applicationStatus: 'declined',
                isActive: false
            },
            function (err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }

                console.log('Declined Successfully : ' + ret.id);
            }
        )

    return declinedApplication;
};


export const withdraw = async (id: string, application: Application): Promise<Application> => {
    let withdrawnApplication: Application = conn
        .sobject(applicationApi)
        .update(
            {
                applicationId: application.applicationId,
                applicationStatus: 'withdrawn',
                isActive: false
            },
            function (err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }

                console.log('Withdrawn Successfully : ' + ret.id);
            }
        )

    return withdrawnApplication;
};

// create new volunteer application object in salesforce with fields 
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (
    applicationId: string,
    volunteerName: string,
    applicationStatus: string,
    isActive: boolean
): Promise<void> => {
    conn.sobject(event).create(
        {
            applicationId__c: applicationId,
            volunteerName__c: volunteerName,
            applicationStatus__c: applicationStatus,
            isActive__c: isActive
        },
        function (err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
            console.log("created application with ID : " + result.id);
        }
    );
};

// Withdraw an application by ID via deletion
// export const remove = async (name: string): Promise<void> => {
//     conn.sobject(volunteerApi).find({
//         Name: name
//     }).destroy(function (err: Error, result) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log('Deleted Application with ID: ' + result[0].id);
//     })
// }; 
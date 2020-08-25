/**
 * Data Model Interfaces
 */

import Application from './VolunteerAppInterface';
import Volunteer from '../users/VolunteerInterface';
import * as UserService from '../users/UserService';
import { conn } from '../../server';
// import * as express from 'express';

const applicationObjectName: string = 'VolunteerApplication__c';
const applicationFields: string = 'Id, volunteer__c, status__c';

// Map fields of employer model to Salesforce fields.
const applicationModelToSalesforceApplication = (application: Application): any => {
    const salesforceApplication: any = {
        status__c: application.status,
        Id: application.id,
        volunteer__c: application.volunteer.id
    };

    return salesforceApplication;
};

// Map Saleforce record fields to user model fields.
const salesforceApplicationToApplicationModel = async (record: any): Promise<Application> => {
    const application: Application = {
        status: record.status__c,
        id: record.Id,
        volunteer: (await UserService.getUser({ Id: record.volunteer__c })) as Volunteer
    };

    return application;
};

/**
 * Service Methods
 */

// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const get = async (id: string): Promise<Application> => {
    let application: Application = conn
        .sobject(applicationObjectName)
        .find({ Id: id }, applicationFields)
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            return salesforceApplicationToApplicationModel(record[0]);
        });

    return application;
};

export const update = async (application: Application): Promise<Application> => {
    let updatedApplication: Application = conn
        .sobject(applicationObjectName)
        .update(applicationModelToSalesforceApplication(application), function(err, ret) {
            if (err || !ret.success) {
                return console.error(err, ret);
            }
        });

    return updatedApplication;
};

// create new volunteer application object in salesforce with fields
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (application: Application): Promise<string> => {
    const applicationInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(applicationObjectName)
        .create(applicationModelToSalesforceApplication(application), function(err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return applicationInfo.id;
};

/**
 * Data Model Interfaces
 */

import Application from './ApplicationsInterface';
import Volunteer from '../users/VolunteerInterface';
import Event from '../events/EventInterface';
import * as UserService from '../users/UserService';
import * as EventService from '../events/EventService';
import { conn } from '../../server';
// import * as express from 'express';

export const applicationObjectName: string = 'EventApplication__c';
export const applicationFields: string = 'Id, event__c, status__c, volunteer__c';

// Map fields of employer model to Salesforce fields.
const applicationModelToSalesforceApplication = (application: Application): any => {
    const salesforceApplication: any = {
        event__c: typeof application.event === 'string' ? application.event : application.event.id,
        Id: application.id,
        status__c: application.status,
        volunteer__c: typeof application.volunteer === 'string' ? application.volunteer : application.volunteer.id
    };

    return salesforceApplication;
};

// Map Saleforce record fields to user model fields.
const salesforceApplicationToApplicationModel = async (
    record: any,
    getVolunteer: boolean,
    getEvent: boolean
): Promise<Application> => {
    const application: Application = {
        event: getEvent ? ((await EventService.getEventInfo(record.event__c)) as Event) : record.event__c,
        id: record.Id,
        status: record.status__c,
        volunteer: getVolunteer
            ? ((await UserService.getUser({ Id: record.volunteer__c })) as Volunteer)
            : record.volunteer__c
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
            return salesforceApplicationToApplicationModel(record[0], true, true);
        });

    return application;
};

export const getEventApplications = async (eventId: string): Promise<Array<Application>> => {
    let applications: Array<Application> = [];
    let applicationPromises: Array<Promise<Application>> = [];

    await conn.query(
        `SELECT ${applicationFields} FROM ${applicationObjectName} WHERE event__c='${eventId}'`,
        (err, result) => {
            if (err) {
                return console.error(err);
            }
            applicationPromises = result.records.map(record =>
                salesforceApplicationToApplicationModel(record, true, false)
            );
        }
    );

    await Promise.all(applicationPromises).then(resolvedApplications => {
        applications = resolvedApplications;
    });

    return applications;
};

export const getVolunteerApplications = async (volunteerId: string): Promise<Array<Application>> => {
    let applications: Array<Application> = [];
    let applicationPromises: Array<Promise<Application>> = [];

    await conn.query(
        `SELECT ${applicationFields} FROM ${applicationObjectName} WHERE volunteer__c='${volunteerId}'`,
        (err, result) => {
            if (err) {
                return console.error(err);
            }
            applicationPromises = result.records.map(record =>
                salesforceApplicationToApplicationModel(record, false, true)
            );
        }
    );

    await Promise.all(applicationPromises).then(resolvedApplications => {
        applications = resolvedApplications;
    });

    return applications;
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

/**
 * Data Model Interfaces
 */

import Application, { ApplicationStatus } from './ApplicationsInterface';
import Volunteer from '../users/VolunteerInterface';
import Event from '../events/EventInterface';
import * as UserService from '../users/UserService';
import * as EventService from '../events/EventService';
import * as EventVolunteerService from '../eventVolunteers/EventVolunteerService';
import { conn } from '../../server';
// import * as express from 'express';

export const applicationObjectName: string = 'EventApplication__c';
export const applicationFields: string = 'Id, event__c, status__c, volunteer__c';

// Map fields of application model to Salesforce fields.
const applicationModelToSalesforceApplication = (application: Application): any => {
    const salesforceApplication: any = {
        event__c: typeof application.event === 'string' ? application.event : application.event.id,
        Id: application.id,
        status__c: application.status,
        volunteer__c: typeof application.volunteer === 'string' ? application.volunteer : application.volunteer.id
    };

    return salesforceApplication;
};

// Map Saleforce record fields to application model fields.
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
            ? ((await UserService.getUser({ id: record.volunteer__c })) as Volunteer)
            : record.volunteer__c
    };

    return application;
};

/**
 * Service Methods
 */

export const get = async (id: string): Promise<Application> => {
    let application: Application = conn
        .sobject(applicationObjectName)
        .find({ Id: id }, applicationFields)
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            if (record.length === 0) {
                throw Error(`No application with ID ${id} found.`);
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
    if (!application.id) {
        throw Error("Application provided must have an 'id' field.");
    }

    let oldApplication: Application;
    try {
        oldApplication = await get(application.id);
    } catch (e) {
        console.error('Unable to get old application with ID ${applicaiton.id}');
    }
    const salesforceApplication = applicationModelToSalesforceApplication(application);

    if (oldApplication) {
        // If the application status is changed to accepted, then create a new event volunteer object.
        // If the application status is changes from accepted, then delete.
        if (oldApplication.status !== ApplicationStatus.ACCEPTED && application.status === ApplicationStatus.ACCEPTED) {
            await EventVolunteerService.create({
                event: salesforceApplication.event__c,
                volunteer: salesforceApplication.volunteer__c
            });
        } else if (
            oldApplication.status === ApplicationStatus.ACCEPTED &&
            application.status !== ApplicationStatus.ACCEPTED
        ) {
            await EventVolunteerService.remove({
                eventId: salesforceApplication.event__c,
                volunteerId: salesforceApplication.volunteer__c
            });
        }
    }

    delete salesforceApplication.event__c;
    let res = conn
        .sobject(applicationObjectName)
        .update(salesforceApplication, function(err, ret) {
            if (err || !ret.success) {
                return console.error(err, ret);
            }
        });

    return res;
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

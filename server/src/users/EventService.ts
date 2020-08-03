/**
 * Data Model Interfaces
 */

import Event from './EventInterface';
import { conn } from '../server';
// import * as express from 'express';

const eventApi: string = 'Event__c';
const eventFields: string =
    'Name, isActive__c, activityType__c, gradeOfStudents__c, preferredSector__c, ' +
    'startDate__c, endDate__c, postingExpiry__c, applicationsReceived__c, ' +
    'invitationsSent__c, numberOfStudents__c, numberOfVolunteers__c, hoursCommitment__c';

/**
 * Service Methods
 */


/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of eventApi object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> event__c -> Fields
 */

const eventModelToSalesforceEvent = (event: Event, id?: string): any => {
    let salesforceEvent: any = {
        eventName__c: event.eventName,
        isActive__c: event.isActive,
        activityType__c: event.activityType,
        gradeOfStudents__c: event.gradeOfStudents,
        preferredSector__c: event.preferredSector,
        startDate__c: event.startDate,
        endDate__c: event.endDate,
        postingExpiry__c: event.postingExpiry,
        applicationsReceived__c: event.applicationsReceived,
        invitationsSent__c: event.invitationsSent,
        numberOfStudents__c: event.numberOfStudents,
        numberOfVolunteers__c: event.numberOfVolunteers,
        hoursCommitment__c: event.hoursCommitment
    };

    return salesforceEvent;
}

const salesforceEventToEventModel = (record: any): Event => {
    const event: Event = {
        eventName: record.Name,
        isActive: record.isActive__c,
        activityType: record.activityType__c,
        gradeOfStudents: record.gradeOfStudents__c,
        preferredSector: record.preferredSector__c,
        startDate: record.startDate__c,
        endDate: record.endDate__c,
        postingExpiry: record.postingExpiry__c,
        applicationsReceived: record.applicationsReceived__c,
        invitationsSent: record.invitationsSent__c,
        numberOfStudents: record.numberOfStudents__c,
        numberOfVolunteers: record.numberOfVolunteers__c,
        hoursCommitment: record.hoursCommitment__c
    };

    return event;
}



// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const getEventInfo = async (eventName: string): Promise<Event> => {
    let eventInfo: Event = conn
        .sobject(eventApi)
        .find({
            Name: eventName
        },
            eventFields
        )
        .limit(1)
        .execute(function (err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            return salesforceEventToEventModel(record[0])
        });
    console.log(eventInfo);
    return eventInfo;
};

export const getAllEvents = async (limit: number, offset: number): Promise<Event> => {
    let allevents: Event;
    await conn.query(
        `SELECT ${eventFields} FROM ${eventApi} LIMIT ${limit} OFFSET ${offset}`,
        function (err, result) {
            if (err) {
                return console.error(err);
            }
            allevents = result.records.map(record => salesforceEventToEventModel(record));
        }
    );

    return allevents;
};

export const update = async (id: string, event: Event): Promise<Event> => {
    let updatedEvent: Event = conn
        .sobject(eventApi)
        .update(eventModelToSalesforceEvent(event, id), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return updatedEvent;
};

// create new user object in salesforce with fields 
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (event: Event): Promise<string> => {
    const eventInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(event).create(eventModelToSalesforceEvent(event), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });
    return eventInfo.id;
};

// Delete a user by name (should be changed to ID in the future once ID field in salesforce is figured out)
export const remove = async (id: string): Promise<void> => {
    return conn
        .sobject(eventApi)
        .find({
            Id: id
        })
        .destroy((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
};

/**
 * Data Model Interfaces
 */

import Event from './EventInterface';
import Educator from '../users/EducatorInterface';
import * as UserService from '../users/UserService';
import { conn } from '../../server';
import { arrayToPicklistString, picklistStringToArray } from '../../util/SalesforcePicklistUtils';
// import * as express from 'express';

const eventApi: string = 'Event__c';
const eventFields: string =
    'Id, Name, isActive__c, isPublic__c, activityType__c, gradeOfStudents__c, preferredSector__c, ' +
    'startDate__c, endDate__c, postingExpiry__c, numberOfStudents__c, numberOfVolunteers__c, hoursCommitment__c, ' +
    'schoolTransportation__c, contact__c, ApplicantNumber__c, invitationNumber__c, School__c';

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of eventApi object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> event__c -> Fields
 */

const eventModelToSalesforceEvent = (event: Event, id?: string): any => {
    let salesforceEvent: any = {
        activityType__c: arrayToPicklistString(event.activityType),
        contact__c: event.contact.id,
        endDate__c: event.endDate,
        Name: event.eventName,
        gradeOfStudents__c: arrayToPicklistString(event.gradeOfStudents),
        hoursCommitment__c: event.hoursCommitment,
        ...(id && { Id: id }),
        isActive__c: event.isActive,
        isPublic__c: event.isPublic,
        numberOfStudents__c: event.numberOfStudents,
        numberOfVolunteers__c: event.numberOfVolunteers,
        postingExpiry__c: event.postingExpiry,
        preferredSector__c: arrayToPicklistString(event.preferredSector),
        schoolTransportation__c: event.schoolTransportation,
        startDate__c: event.startDate
    };

    return salesforceEvent;
};

const salesforceEventToEventModel = async (record: any): Promise<Event> => {
    const event: Event = {
        activityType: picklistStringToArray(record.activityType__c),
        applicantNumber: record.ApplicantNumber__c,
        contact: (await UserService.getUser({ id: record.contact__c })) as Educator,
        endDate: record.endDate__c,
        eventName: record.Name,
        gradeOfStudents: picklistStringToArray(record.gradeOfStudents__c),
        hoursCommitment: record.hoursCommitment__c,
        id: record.Id,
        invitationNumber: record.invitationNumber__c,
        isActive: record.isActive__c,
        isPublic: record.isPublic__c,
        numberOfStudents: record.numberOfStudents__c,
        numberOfVolunteers: record.numberOfVolunteers__c,
        postingExpiry: record.postingExpiry__c,
        preferredSector: picklistStringToArray(record.preferredSector__c),
        schoolTransportation: record.schoolTransportation__c,
        startDate: record.startDate__c
    };

    return event;
};

// Basic query for now to retrieve a user based on id
export const getEventInfo = async (id: string): Promise<Event> => {
    const eventInfo: Event = conn
        .sobject(eventApi)
        .find(
            {
                Id: id
            },
            eventFields
        )
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            if (record.length === 0) {
                throw Error(`No event with ID ${id} found.`);
            }
            return salesforceEventToEventModel(record[0]);
        });

    return eventInfo;
};

export const getEvents = async (limit: number, offset: number, filter: 'active' | 'past' | 'all'): Promise<Event[]> => {
    let events: Event[] = [];
    let eventPromises: Promise<Event>[];
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    const dateStr = date.toISOString();
    let query = '';
    if (filter === 'all') {
        query = `SELECT ${eventFields} FROM ${eventApi} ORDER BY endDate__c LIMIT ${limit} OFFSET ${offset}`;
    } else if (filter === 'active') {
        query = `SELECT ${eventFields} FROM ${eventApi} WHERE startDate__c > ${dateStr} ORDER BY startDate__c`;
    } else if (filter === 'past') {
        query = `SELECT ${eventFields} FROM ${eventApi} WHERE startDate__c <= ${dateStr} ORDER BY startDate__c LIMIT ${limit} OFFSET ${offset}`;
    }

    await conn.query(query, function(err, result) {
        if (err) {
            return console.error(err);
        }

        eventPromises = result.records.map(record => salesforceEventToEventModel(record));
    });

    await Promise.all(eventPromises).then(resolvedEvents => {
        events = resolvedEvents;
    });

    return events;
};

export const update = async (id: string, event: Event): Promise<Event> => {
    const res = conn.sobject(eventApi).update(eventModelToSalesforceEvent(event, id), (err: Error, result: any) => {
        if (err || !result.success) {
            return console.error(err, result);
        }
    });

    return res;
};

// create new user object in salesforce with fields
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (event: Event): Promise<string> => {
    const userObject = await UserService.getUser({ email: event.contact.email });

    const newContactObject = userObject as Educator;

    const newEvent: Event = event;
    newEvent.contact = newContactObject;

    const eventInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(eventApi)
        .create(eventModelToSalesforceEvent(newEvent), (err: Error, result: any) => {
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

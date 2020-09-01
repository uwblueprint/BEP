/**
 * Data Model Interfaces
 */

import { conn } from '../../server';
import Event from '../events/EventInterface';
import * as EventService from '../events/EventService';
import * as UserService from '../users/UserService';
import Volunteer from '../users/VolunteerInterface';
import EventVolunteer from './EventVolunteerInterface';

export const eventVolunteerObjectName: string = 'EventVolunteers__c';
export const eventVolunteerFields: string = 'Id, event__c, combinedId__c, volunteer__c, status__c';

// Map fields of Event Volunteer model to Salesforce fields.
const eventVolunteerModelToSalesforceEventVolunteer = (eventVolunteer: EventVolunteer): any => {
    const eventId = typeof eventVolunteer.event === 'string' ? eventVolunteer.event : eventVolunteer.event.id;
    const volunteerId =
        typeof eventVolunteer.volunteer === 'string' ? eventVolunteer.volunteer : eventVolunteer.volunteer.id;
    const salesforceApplication: any = {
        event__c: eventId,
        ...(eventVolunteer.id && { Id: eventVolunteer.id }),
        combinedId__c: eventId + '_' + volunteerId,
        status__c: eventVolunteer.status,
        volunteer__c: volunteerId
    };
    return salesforceApplication;
};

// Map Saleforce record fields to Event Volunteer model fields.
const salesforceEventVolunteerToEventVolunteerModel = async (
    record: any,
    getVolunteer: boolean,
    getEvent: boolean
): Promise<EventVolunteer> => {
    const eventVolunteer: EventVolunteer = {
        event: getEvent ? ((await EventService.getEventInfo(record.event__c)) as Event) : record.event__c,
        id: record.Id,
        status: record.status__c,
        volunteer: getVolunteer
            ? ((await UserService.getUser({ id: record.volunteer__c })) as Volunteer)
            : record.volunteer__c
    };

    return eventVolunteer;
};

/**
 * Service Methods
 */

export const get = async (id: string): Promise<EventVolunteer> => {
    const eventVolunteer: EventVolunteer = conn
        .sobject(eventVolunteerObjectName)
        .find({ Id: id }, eventVolunteerFields)
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }
            if (record.length === 0) {
                throw Error(`No event volunteer with ID ${id} found.`);
            }
            return salesforceEventVolunteerToEventVolunteerModel(record[0], true, true);
        });

    return eventVolunteer;
};

export const getEventVolunteersForEvent = async (eventId: string): Promise<EventVolunteer[]> => {
    let eventVolunteers: EventVolunteer[] = [];
    let eventVolunteerPromises: Array<Promise<EventVolunteer>> = [];

    await conn.query(
        `SELECT ${eventVolunteerFields} FROM ${eventVolunteerObjectName} WHERE event__c='${eventId}'`,
        (err, result) => {
            if (err) {
                return console.error(err);
            }
            eventVolunteerPromises = result.records.map(record =>
                salesforceEventVolunteerToEventVolunteerModel(record, true, false)
            );
        }
    );

    await Promise.all(eventVolunteerPromises).then(resolvedEventVolunteers => {
        eventVolunteers = resolvedEventVolunteers;
    });

    return eventVolunteers;
};

export const getEventVolunteersForVolunteer = async (volunteerId: string): Promise<EventVolunteer[]> => {
    let eventVolunteers: EventVolunteer[] = [];
    let eventVolunteerPromises: Array<Promise<EventVolunteer>> = [];

    await conn.query(
        `SELECT ${eventVolunteerFields} FROM ${eventVolunteerObjectName} WHERE volunteer__c='${volunteerId}'`,
        (err, result) => {
            if (err) {
                return console.error(err);
            }
            eventVolunteerPromises = result.records.map(record =>
                salesforceEventVolunteerToEventVolunteerModel(record, false, true)
            );
        }
    );

    await Promise.all(eventVolunteerPromises).then(resolvedEventVolunteers => {
        eventVolunteers = resolvedEventVolunteers;
    });

    return eventVolunteers;
};

export const create = async (eventVolunteer: EventVolunteer): Promise<string> => {
    const eventVolunteerInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(eventVolunteerObjectName)
        .create(eventVolunteerModelToSalesforceEventVolunteer(eventVolunteer), (err: Error, result) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return eventVolunteerInfo.id;
};

export const remove = async (eventVolunteerInfo: {
    id?: string;
    eventId?: string;
    volunteerId?: string;
}): Promise<void> => {
    let objectIdentifier;
    if (eventVolunteerInfo.id) {
        objectIdentifier = { Id: eventVolunteerInfo.id };
    } else if (eventVolunteerInfo.eventId && eventVolunteerInfo.volunteerId) {
        objectIdentifier = { event__c: eventVolunteerInfo.eventId, volunteer__c: eventVolunteerInfo.volunteerId };
    } else {
        throw Error(
            'No valid user identifier provided. Either provide event volunteer id or provide both the event id and the volunteer id.'
        );
    }

    return conn
        .sobject(eventVolunteerObjectName)
        .find(objectIdentifier)
        .destroy((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
};

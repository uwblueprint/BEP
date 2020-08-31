/**
 * Data Model Interfaces
 */

import EventVolunteer from './EventVolunteerInterface';
import Volunteer from '../users/VolunteerInterface';
import Event from '../events/EventInterface';
import * as UserService from '../users/UserService';
import * as EventService from '../events/EventService';
import { conn } from '../../server';
// import * as express from 'express';

export const eventVolunteerObjectName: string = 'EventVolunteers__c';
export const eventVolunteerFields: string = 'Id, event__c, combinedId__c, volunteer__c';

// Map fields of Event Volunteer model to Salesforce fields.
const eventVolunteerModelToSalesforceEventVolunteer = (eventVolunteer: EventVolunteer): any => {
    const eventId = typeof eventVolunteer.event === 'string' ? eventVolunteer.event : eventVolunteer.event.id;
    const volunteerId =
        typeof eventVolunteer.volunteer === 'string' ? eventVolunteer.volunteer : eventVolunteer.volunteer.id;
    const salesforceApplication: any = {
        event__c: eventId,
        ...(eventVolunteer.id && { Id: eventVolunteer.id }),
        combinedId__c: eventId + '_' + volunteerId,
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
    let eventVolunteer: EventVolunteer = conn
        .sobject(eventVolunteerObjectName)
        .find({ Id: id }, eventVolunteerFields)
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            return salesforceEventVolunteerToEventVolunteerModel(record[0], true, true);
        });

    return eventVolunteer;
};

export const getEventVolunteersForEvent = async (eventId: string): Promise<Array<EventVolunteer>> => {
    let eventVolunteers: Array<EventVolunteer> = [];
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

export const getEventVolunteersForVolunteer = async (volunteerId: string): Promise<Array<EventVolunteer>> => {
    let eventVolunteers: Array<EventVolunteer> = [];
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
        .create(eventVolunteerModelToSalesforceEventVolunteer(eventVolunteer), function(err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return eventVolunteerInfo.id;
};

export const remove = async (id: string): Promise<void> => {
    return conn
        .sobject(eventVolunteerObjectName)
        .find({
            Id: id
        })
        .destroy((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
};

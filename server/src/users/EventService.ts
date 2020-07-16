/**
 * Data Model Interfaces
 */

import Event from './EventInterface';
import { conn } from '../server';
// import * as express from 'express';


const eventApi: string = 'Event__c';

/**
 * Service Methods
 */


/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of eventApi object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> event__c -> Fields
 */



// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const getEventInfo = async (name: string): Promise<Event> => {
    let eventInfo: Event = conn
        .sobject(eventApi)
        .find({
            Name: name
        },
            'Name, isActive__c, eventType__c, startDate__c, endDate__c, applicationsReceived__c, invitationsSent__c')
        .limit(1)
        .execute(function (err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            let event: Event = {
                eventName: record[0].Name,
                isActive: false,
                eventType: record[0].eventType__c,
                startDate: record[0].startDate__c,
                endDate: record[0].endDate__c,
                applicationsReceived: record[0].applicationsReceived__c,
                invitationsSent: record[0].invitationsSent__c
            }
            return event;
        });
    console.log(eventInfo);
    return eventInfo;
};

export const getAllEvents = async (): Promise<Event> => {
    let eventInfo: Event = conn
        .sobject(eventApi)
        .find({
        },
            'Name, isActive__c, eventType__c, startDate__c, endDate__c, applicationsReceived__c, invitationsSent__c')
        .execute(function (err: Error, record: any) {
            var events = new Array()
            if (err) {
                return console.error(err);
            }
            record.forEach(item => {
                let event: Event = {
                    eventName: item.Name,
                    isActive: false,
                    eventType: item.eventType__c,
                    startDate: item.startDate__c,
                    endDate: item.endDate__c,
                    applicationsReceived: item.applicationsReceived__c,
                    invitationsSent: item.invitationsSent__c
                }
                events.push(event)
            })
            return events
        });
    console.log(eventInfo);
    return eventInfo;
};

export const update = async (id: string, event: Event): Promise<Event> => {
    let updatedEvent: Event = conn
        .sobject(eventApi)
        .update(
            {
                eventName: event.eventName,
                isActive: event.isActive,
                eventType: event.eventType,
                startDate: event.startDate,
                endDate: event.endDate,
                applicationsReceived: event.applicationsReceived,
                invitationsSent: event.invitationsSent
            },
            function (err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }

                console.log('Updated Successfully : ' + ret.id);
            }
        )

    return updatedEvent;
};

// create new user object in salesforce with fields 
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (
    eventName: string,
    isActive: boolean,
    eventType: string,
    startDate: Date,
    endDate: Date,
    applicationsReceived: number,
    invitationsSent: number
): Promise<void> => {
    conn.sobject(event).create(
        {
            Name: eventName,
            isActive: isActive,
            eventType: eventType,
            startDate: startDate,
            endDate: endDate,
            applicationsReceived: applicationsReceived,
            invitationsSent: invitationsSent

        },
        function (err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
            console.log('created Event with ID : ' + result.id + result.Name);
        }
    );
};

// Delete a user by name (should be changed to ID in the future once ID field in salesforce is figured out)
export const remove = async (name: string): Promise<void> => {
    conn.sobject(eventApi).find({
        Name: name
    }).destroy(function (err: Error, result) {
        if (err) {
            return console.log(err);
        }
        console.log('Deleted Event with ID: ' + result[0].id);
    })
}; 

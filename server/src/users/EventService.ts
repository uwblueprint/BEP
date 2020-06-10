/**
 * Data Model Interfaces
 */

import Event from './EventInterface';
import { conn } from '../server';
// import * as express from 'express';


const event: string = "Event__c";

/**
 * Service Methods
 */


/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of event object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> event__c -> Fields
 */



// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const getEventInfo = async (eventName: string): Promise<Event> => {
    let eventInfo: Event = conn.sobject(event).find({
        EventName: eventName
    }, "Name, lastName__c, email__c, phoneNumber__c, password__c")
        .limit(1)
        .execute(function (err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            let event: Event = {
                eventName: record[0].eventName,
                isActive: record[0].isActive__c
            }
            return event;
        });
    console.log(eventInfo);
    return eventInfo;
};

// create new user object in salesforce with fields 
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (eventName: string, isActive: boolean): Promise<void> => {
    conn.sobject(event).create({
        EventName: eventName,
        isActive: isActive
    },
        function (err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
            console.log("created Event with ID : " + result.id + result.Name);
        })
};

// Delete a user by name (should be changed to ID in the future once ID field in salesforce is figured out)
export const remove = async (eventName: string): Promise<void> => {
    conn.sobject(event).find({
        EventName: eventName
    }).destroy(function (err: Error, result) {
        if (err) {
            return console.log(err);
        }
        console.log('Deleted Event with ID: ' + result[0].id);
    })
}; 

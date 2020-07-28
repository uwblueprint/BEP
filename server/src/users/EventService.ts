/**
 * Data Model Interfaces
 */

import Event, { EventApplicantInterface } from './EventInterface';
import { conn } from '../server';
// import * as express from 'express';

const eventApi: string = 'Event__c';
const eventApplicantApi: string = 'EventApplicants__r';
const eventFields: string =
    'Name, isActive__c, activityType__c, gradeOfStudents__c, preferredSector__c, ' +
    'startDate__c, endDate__c, startTime__c, endTime__c, postingExpiry__c, applicationsReceived__c, ' +
    'invitationsSent__c, numberOfStudents__c, numberOfVolunteers__c, hoursCommitment__c, schoolName__c, schoolAddress__c, ' +
    'schoolTransportation__c, contactEmail__c, contactName__c, contactPhone__c, contactPosition__c';

const eventApplicantFields: string = 'Name, job__c, personalPronouns__c, sectors__c, linkedInUrl__c, areasOfExpertise__c, employmentStatus__c';

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
        hoursCommitment__c: event.hoursCommitment,
        schoolName__c: event.schoolName,
        schoolAddress__c: event.schoolAddress,
        schoolTransportation__c: event.schoolTransportation,
        contactEmail__c: event.contactEmail,
        contactName__c: event.contactName,
        contactPhone__c: event.contactPhone,
        contactPosition__c: event.contactPosition,
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
        hoursCommitment: record.hoursCommitment__c,
        schoolName: record.schoolName__c,
        schoolAddress: record.schoolAddress__c,
        schoolTransportation: record.schoolTransportation__c,
        contactEmail: record.contactEmail__c,
        contactName: record.contactName__c,
        contactPhone: record.contactPhone__c,
        contactPosition: record.contactPosition__c,
    };

    return event;
}

const salesforceApplicantToEventAppliantModel = (record: any): EventApplicantInterface => {
    const applicant: EventApplicantInterface = {
        applicantName: record.Name,
        personalPronouns: record.personalPronouns__c,
        job: record.job__c,
        sectors: record.sectors__c,
        linkedinUrl: record.linkedInUrl__c,
        areasOfExpertise: record.areasOfExpertise__c,
        employmentStatus: record.employmentStatus__c,
    }

    return applicant
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

// export const getActiveEvents = async (limit: number, offset: number): Promise<Event> => {
//     let activeEvents: Event;
//     const isActiveEvent: boolean = true;
//     await conn.query(
//         `SELECT ${eventFields} FROM ${eventApi} WHERE isActive__c=${isActiveEvent} LIMIT ${limit} OFFSET ${offset}`,
//         function (err, result) {
//             if (err) {
//                 return console.error(err);
//             }
//             activeEvents = result.records.map(record => salesforceEventToEventModel(record));
//         }
//     );

//     return activeEvents;
// };

export const getApplications = async (eventName: string): Promise<EventApplicantInterface> => {
    let applications: EventApplicantInterface;
    console.log(eventName)
    
    await conn.query(
        `SELECT (SELECT ${eventApplicantFields} FROM ${eventApplicantApi}) FROM ${eventApi} WHERE Name='${eventName}'`,
        function(err, result) {
            if (err) {
                return console.error(err)
            }
            console.log(result.records[0].EventApplicants__r.records)
            //console.log('Result', result.records[0].EventApplicants__r.records)
            applications = result.records[0].EventApplicants__r.records.map(record => salesforceApplicantToEventAppliantModel(record));
        }
    );
    console.log(applications)
    return applications
};

// let eventInfo: Event = conn
//     .sobject(eventApi)
//     .find({
//     },
//         eventFields
//     )
//     .execute(function (err: Error, record: any) {
//         var events = new Array()
//         if (err) {
//             return console.error(err);
//         }
//         record.forEach(item => {
//             let event: Event = {
//                 eventName: item.Name,
//                 isActive: false,
//                 activityType: item.activityType__c,
//                 gradeOfStudents: item.gradeOfStudents__c,
//                 preferredSector: item.preferredSector__c,
//                 startDate: item.startDate__c,
//                 endDate: item.endDate__c,
//                 postingExpiry: item.postingExpiry__c,
//                 endTime: item.endTime__c,
//                 startTime: item.startTime__c,
//                 applicationsReceived: item.applicationsReceived__c,
//                 invitationsSent: item.invitationsSent__c,
//                 numberOfStudents: item.numberOfStudents__c,
//                 numberOfVolunteers: item.numberOfVolunteers__c,
//                 hoursCommitment: item.hoursCommitment__c
//             }
//             events.push(event)
//         })
//         return events
//     });
// console.log(eventInfo);
// return eventInfo;
// };

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

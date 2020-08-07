/**
 * Data Model Interfaces
 */

import Event, { EventApplicantInterface, EventInvitationInterface, EventVolunteerInterface } from './EventInterface';
import { conn } from '../server';
import e from 'express';
// import * as express from 'express';

const eventApi: string = 'Event__c';
const eventApplicantApi: string = 'EventApplicants__r';
const eventInvitationApi: string = 'EventInvitations__r';
const eventVolunteerApi: string = 'EventVolunteers__r';
const eventFields: string =
    'Name, isActive__c, activityType__c, gradeOfStudents__c, preferredSector__c, ' +
    'startDate__c, endDate__c, postingExpiry__c, numberOfStudents__c, numberOfVolunteers__c, hoursCommitment__c, schoolName__c, schoolAddress__c, ' +
    'schoolTransportation__c, contactEmail__c, contactName__c, contactPhone__c, contactPosition__c, ApplicantNumber__c, invitationNumber__c';

const eventApplicantFields: string = 'Id, Name, job__c, personalPronouns__c, sectors__c, linkedInUrl__c, areasOfExpertise__c, employmentStatus__c, applicantCompany__c, accepted__c, denied__c';
const eventInvitationFields: string = 'Name, job__c, personalPronouns__c, sectors__c, linkedInUrl__c, areasOfExpertise__c, employmentStatus__c';
const eventVolunteerFields: string = 'Name, volunteerJob__c, volunteerPersonalPronouns__c, volunteerCompany__c'

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
        applicantNumber: record.ApplicantNumber__c,
        invitationNumber: record.invitationNumber__c,
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
        accepted: record.accepted__c,
        denied: record.denied__c,
        company: record.applicantCompany__c
    }

    return applicant
}

const salesforceInvitationToEventInvitationModel = (record: any): EventInvitationInterface => {
    const invitation: EventInvitationInterface = {
        invitationName: record.Name,
        personalPronouns: record.personalPronouns__c,
        job: record.job__c,
        sectors: record.sectors__c,
        linkedinUrl: record.linkedInUrl__c,
        areasOfExpertise: record.areasOfExpertise__c,
        employmentStatus: record.employmentStatus__c,
    }

    return invitation
}

const salesforceEventVolunteerToEventVolunteerModel = (record: any): EventVolunteerInterface => {
    const volunteer: EventVolunteerInterface = {
        volunteerName: record.Name,
        job: record.volunteerJob__c,
        company: record.volunteerCompany__c,
        personalPronouns: record.volunteerPersonalPronouns__c,
    }

    return volunteer
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

export const acceptApplicant = async (eventName: string, applicantName: string, accept: boolean): Promise<void> => {
    let applicantId: string;
    let applicantJob: string;
    let applicantPersonalPronouns: string;
    let applicantCompany: string;
    let eventId: string;
    console.log(eventName);

        await conn.query(
            `SELECT Id, (SELECT ${eventApplicantFields} FROM ${eventApplicantApi} WHERE Name='${applicantName}') FROM ${eventApi} WHERE Name='${eventName}'`,
            function (err, result) {
                if (err) {
                    return console.error(err);
                }
                eventId = result.records[0].Id
                let data = result.records[0].EventApplicants__r.records[0];
                console.log("This is the result", data);
                applicantId = data.Id
                console.log("This is the applicantID", applicantId)
                applicantJob = data.job__c;
                applicantPersonalPronouns = data.personalPronouns__c;
                applicantCompany = data.applicantCompany__c;
                console.log("this is the applicantCompany", applicantCompany)
            }
        );

        if (accept) {
            await conn.sobject('EventApplicant__c').update({
                Id: applicantId,
                accepted__c: true,
                denied__c: false
            }, function(err, ret) {
                if (err || !ret.success) { return console.error(err, ret); }
                console.log('Updated Successfully : ' + ret.id);
            })

            //Add to confirmed volunteers

            await conn.sobject('EventVolunteer__c').create({
                Name: applicantName,
                volunteerJob__c: applicantJob,
                volunteerCompany__c: applicantCompany,
                volunteerPersonalPronouns__c: applicantPersonalPronouns,
                EventVolunteer__c: eventId
            }, function(err, ret) {
                if (err || !ret.success) { 
                    // handle exception
                    return console.error(err, ret); 
                }
                console.log("Created record id : " + ret.id);
            });

        } else {
            await conn.sobject('EventApplicant__c').update({
                Id: applicantId,
                accepted__c: false,
                denied__c: true
            }, function(err, ret) {
                if (err || !ret.success) { return console.error(err, ret); }
                console.log('Updated Successfully : ' + ret.id);
            })
        }


}

export const getInvitations = async (eventName: string): Promise<EventInvitationInterface> => {
    let invitations: EventInvitationInterface
    console.log("This is the event Name:" , eventName)

    await conn.query(
        `SELECT (SELECT ${eventInvitationFields} FROM ${eventInvitationApi}) FROM ${eventApi} WHERE Name='${eventName}'`,
        function(err, result) {
            if (err) {
                return console.error(err)
            }
            console.log(result.records[0].EventInvitations__r.records)

            invitations = result.records[0].EventInvitations__r.records.map(record => salesforceInvitationToEventInvitationModel(record));
        }
    );
    console.log(invitations)
    return invitations
}

export const getVolunteers = async (eventName: string): Promise<EventVolunteerInterface> => {
    let volunteers: EventVolunteerInterface
    console.log("This is the event Name:", eventName)

    await conn.query(
        `SELECT (SELECT ${eventVolunteerFields} FROM ${eventVolunteerApi}) FROM ${eventApi} WHERE Name='${eventName}'`,
        function(err, result) {
            if (err) {
            return console.error(err)
            }
            console.log(result.records[0].EventVolunteers__r.records)

            volunteers = result.records[0].EventVolunteers__r.records.map(record => salesforceEventVolunteerToEventVolunteerModel(record));
        }
    );
    console.log(volunteers)

    return volunteers
}

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

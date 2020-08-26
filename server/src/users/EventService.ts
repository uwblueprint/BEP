/**
 * Data Model Interfaces
 */

import Event, { EventApplicantInterface, EventInvitationInterface, EventVolunteerInterface } from './EventInterface';
import Educator from '../api/users/EducatorInterface';
import * as UserService from '../api/users/UserService';
import { conn } from '../server';
// import * as express from 'express';

const eventApi: string = 'Event__c';
const eventApplicantApi: string = 'EventApplicants__r';
const eventInvitationApi: string = 'EventInvitations__r';
const eventVolunteerApi: string = 'EventVolunteers__r';
const eventFields: string =
    'Id, Name, isActive__c, activityType__c, gradeOfStudents__c, preferredSector__c, ' +
    'startDate__c, endDate__c, postingExpiry__c, numberOfStudents__c, numberOfVolunteers__c, hoursCommitment__c, schoolName__c, schoolAddress__c, ' +
    'schoolTransportation__c, contact__c, ApplicantNumber__c, invitationNumber__c, location__c';

const eventApplicantFields: string =
    'Id, Name, job__c, personalPronouns__c, sectors__c, linkedInUrl__c, areasOfExpertise__c, employmentStatus__c, applicantCompany__c, accepted__c, denied__c';
const eventInvitationFields: string =
    'Name, job__c, personalPronouns__c, sectors__c, linkedInUrl__c, areasOfExpertise__c, employmentStatus__c';
const eventVolunteerFields: string = 'Name, volunteerJob__c, volunteerPersonalPronouns__c, volunteerCompany__c';

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 * Field Names of eventApi object in Salesforce can be found by clicking Gear Icon -> Schema Builder -> event__c -> Fields
 */

const eventModelToSalesforceEvent = (event: Event, id?: string): any => {
    let salesforceEvent: any = {
        activityType__c: event.activityType,
        contact__c: event.contact.id,
        endDate__c: event.endDate,
        eventName__c: event.eventName,
        gradeOfStudents__c: event.gradeOfStudents,
        hoursCommitment__c: event.hoursCommitment,
        ...(id && { Id: id }),
        isActive__c: event.isActive,
        location__c: event.location,
        numberOfStudents__c: event.numberOfStudents,
        numberOfVolunteers__c: event.numberOfVolunteers,
        postingExpiry__c: event.postingExpiry,
        preferredSector__c: event.preferredSector,
        schoolAddress__c: event.schoolAddress,
        schoolName__c: event.schoolName,
        schoolTransportation__c: event.schoolTransportation,
        startDate__c: event.startDate
    };

    return salesforceEvent;
};

const salesforceEventToEventModel = async (record: any): Promise<Event> => {
    console.log(record);
    const event: Event = {
        activityType: record.activityType__c,
        applicantNumber: record.ApplicantNumber__c,
        contact: (await UserService.getUser({ Id: record.contact__c })) as Educator,
        endDate: record.endDate__c,
        eventName: record.Name,
        gradeOfStudents: record.gradeOfStudents__c,
        hoursCommitment: record.hoursCommitment__c,
        id: record.Id,
        invitationNumber: record.invitationNumber__c,
        isActive: record.isActive__c,
        location: record.location__c,
        numberOfStudents: record.numberOfStudents__c,
        numberOfVolunteers: record.numberOfVolunteers__c,
        postingExpiry: record.postingExpiry__c,
        preferredSector: record.preferredSector__c,
        schoolAddress: record.schoolAddress__c,
        schoolName: record.schoolName__c,
        schoolTransportation: record.schoolTransportation__c,
        startDate: record.startDate__c
    };

    return event;
};

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
    };

    return applicant;
};

const salesforceInvitationToEventInvitationModel = (record: any): EventInvitationInterface => {
    const invitation: EventInvitationInterface = {
        invitationName: record.Name,
        personalPronouns: record.personalPronouns__c,
        job: record.job__c,
        sectors: record.sectors__c,
        linkedinUrl: record.linkedInUrl__c,
        areasOfExpertise: record.areasOfExpertise__c,
        employmentStatus: record.employmentStatus__c
    };

    return invitation;
};

const salesforceEventVolunteerToEventVolunteerModel = (record: any): EventVolunteerInterface => {
    const volunteer: EventVolunteerInterface = {
        volunteerName: record.Name,
        job: record.volunteerJob__c,
        company: record.volunteerCompany__c,
        personalPronouns: record.volunteerPersonalPronouns__c
    };

    return volunteer;
};

// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const getEventInfo = async (eventName: string): Promise<Event> => {
    let eventInfo: Event = conn
        .sobject(eventApi)
        .find(
            {
                Name: eventName
            },
            eventFields
        )
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            return salesforceEventToEventModel(record[0]);
        });

    return eventInfo;
};

export const getEvents = async (limit: number, offset: number): Promise<Event[]> => {
    let events: Event[] = [];
    let eventPromises: Promise<Event>[];

    await conn.query(
        `SELECT ${eventFields} FROM ${eventApi} ORDER BY endDate__c LIMIT ${limit} OFFSET ${offset}`,
        function(err, result) {
            if (err) {
                return console.error(err);
            }

            eventPromises = result.records.map(record => {
                const eventPromise = salesforceEventToEventModel(record)
                return eventPromise;
            });
        }
    );

    await Promise.all(eventPromises).then(resolvedEvents => {
        console.log(resolvedEvents)
        events = resolvedEvents;
    });

    return events;
};

export const getApplications = async (eventName: string): Promise<EventApplicantInterface> => {
    let applications: EventApplicantInterface;

    await conn.query(
        `SELECT (SELECT ${eventApplicantFields} FROM ${eventApplicantApi}) FROM ${eventApi} WHERE Name='${eventName}'`,
        function(err, result) {
            if (err) {
                return console.error(err);
            }
            applications = result.records[0].EventApplicants__r.records.map(record =>
                salesforceApplicantToEventAppliantModel(record)
            );
        }
    );

    return applications;
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
        function(err, result) {
            if (err) {
                return console.error(err);
            }
            eventId = result.records[0].Id;
            let data = result.records[0].EventApplicants__r.records[0];
            console.log('This is the result', data);
            applicantId = data.Id;
            console.log('This is the applicantID', applicantId);
            applicantJob = data.job__c;
            applicantPersonalPronouns = data.personalPronouns__c;
            applicantCompany = data.applicantCompany__c;
            console.log('this is the applicantCompany', applicantCompany);
        }
    );

    if (accept) {
        await conn.sobject('EventApplicant__c').update(
            {
                Id: applicantId,
                accepted__c: true,
                denied__c: false
            },
            function(err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                console.log('Updated Successfully : ' + ret.id);
            }
        );

        //Add to confirmed volunteers

        await conn.sobject('EventVolunteer__c').create(
            {
                Name: applicantName,
                volunteerJob__c: applicantJob,
                volunteerCompany__c: applicantCompany,
                volunteerPersonalPronouns__c: applicantPersonalPronouns,
                EventVolunteer__c: eventId
            },
            function(err, ret) {
                if (err || !ret.success) {
                    // handle exception
                    return console.error(err, ret);
                }
                console.log('Created record id : ' + ret.id);
            }
        );
    } else {
        await conn.sobject('EventApplicant__c').update(
            {
                Id: applicantId,
                accepted__c: false,
                denied__c: true
            },
            function(err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                console.log('Updated Successfully : ' + ret.id);
            }
        );
    }
};

export const getInvitations = async (eventName: string): Promise<EventInvitationInterface> => {
    let invitations: EventInvitationInterface;
    console.log('This is the event Name:', eventName);

    await conn.query(
        `SELECT (SELECT ${eventInvitationFields} FROM ${eventInvitationApi}) FROM ${eventApi} WHERE Name='${eventName}'`,
        function(err, result) {
            if (err) {
                return console.error(err);
            }
            console.log(result.records[0].EventInvitations__r.records);

            invitations = result.records[0].EventInvitations__r.records.map(record =>
                salesforceInvitationToEventInvitationModel(record)
            );
        }
    );
    console.log(invitations);
    return invitations;
};

export const getVolunteers = async (eventName: string): Promise<EventVolunteerInterface> => {
    let volunteers: EventVolunteerInterface;
    console.log('This is the event Name:', eventName);

    await conn.query(
        `SELECT (SELECT ${eventVolunteerFields} FROM ${eventVolunteerApi}) FROM ${eventApi} WHERE Name='${eventName}'`,
        function(err, result) {
            if (err) {
                return console.error(err);
            }
            console.log(result.records[0].EventVolunteers__r.records);

            volunteers = result.records[0].EventVolunteers__r.records.map(record =>
                salesforceEventVolunteerToEventVolunteerModel(record)
            );
        }
    );
    console.log(volunteers);

    return volunteers;
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
        .sobject(event)
        .create(eventModelToSalesforceEvent(event), (err: Error, result: any) => {
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

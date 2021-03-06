/**
 * Data Model Interfaces
 */
import { conn } from '../../server';
import Event from '../events/EventInterface';
import * as EventService from '../events/EventService';
import * as UserService from '../users/UserService';
import * as EventVolunteerService from '../eventVolunteers/EventVolunteerService';
import Volunteer from '../users/VolunteerInterface';
import Invitation, { InvitationStatus } from './InvitationsInterface';

export const invitationObjectName: string = 'EventInvitations__c';
export const invitationFields: string = 'Id, event__c, status__c, volunteer__c';

// Map fields of employer model to Salesforce fields.
const invitationModelToSalesforceInvitation = (invitation: Invitation): any => {
    const eventId = typeof invitation.event === 'string' ? invitation.event : invitation.event.id;
    const volunteerId = typeof invitation.volunteer === 'string' ? invitation.volunteer : invitation.volunteer.id;
    const salesforceInvitation: any = {
        combinedId__c: eventId + '_' + volunteerId,
        event__c: eventId,
        Id: invitation.id,
        status__c: invitation.status,
        volunteer__c: volunteerId
    };

    return salesforceInvitation;
};

// Map Saleforce record fields to user model fields.
const salesforceInvitationToInvitationModel = async (
    record: any,
    getVolunteer: boolean,
    getEvent: boolean
): Promise<Invitation> => {
    const invitation: Invitation = {
        event: getEvent ? ((await EventService.getEventInfo(record.event__c)) as Event) : record.event__c,
        id: record.Id,
        status: record.status__c,
        volunteer: getVolunteer
            ? ((await UserService.getUser({ id: record.volunteer__c })) as Volunteer)
            : record.volunteer__c
    };

    return invitation;
};

/**
 * Service Methods
 */

// Basic query for now to retrieve a user based on first name (should be changed to ID in future)
export const get = async (id: string): Promise<Invitation> => {
    const invitation: Invitation = conn
        .sobject(invitationObjectName)
        .find({ Id: id }, invitationFields)
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }
            return salesforceInvitationToInvitationModel(record[0], true, true);
        });

    return invitation;
};

export const getEventInvitations = async (eventId: string): Promise<Invitation[]> => {
    let invitations: Invitation[] = [];
    let invitationPromises: Array<Promise<Invitation>> = [];

    await conn.query(
        `SELECT ${invitationFields} FROM ${invitationObjectName} WHERE event__c='${eventId}'`,
        (err, result) => {
            if (err) {
                return console.error(err);
            }
            invitationPromises = result.records.map(record =>
                salesforceInvitationToInvitationModel(record, true, false)
            );
        }
    );

    await Promise.all(invitationPromises).then(invitationApplications => {
        invitations = invitationApplications;
    });

    return invitations;
};

export const getVolunteerInvitations = async (volunteerId: string): Promise<Invitation[]> => {
    let invitations: Invitation[] = [];
    let invitationPromises: Array<Promise<Invitation>> = [];

    await conn.query(
        `SELECT ${invitationFields} FROM ${invitationObjectName} WHERE volunteer__c='${volunteerId}'`,
        (err, result) => {
            if (err) {
                return console.error(err);
            }
            invitationPromises = result.records.map(record =>
                salesforceInvitationToInvitationModel(record, false, true)
            );
        }
    );

    await Promise.all(invitationPromises).then(resolvedInvitations => {
        invitations = resolvedInvitations;
    });

    return invitations;
};

export const update = async (invitation: Invitation): Promise<Invitation> => {
    if (!invitation.id) {
        throw Error("Invitation provided must have an 'id' field.");
    }

    let oldInvitation: Invitation;
    try {
        oldInvitation = await get(invitation.id);
    } catch (e) {
        console.error('Unable to get old invitation with ID ${applicaiton.id}');
    }
    const salesforceInvitation = invitationModelToSalesforceInvitation(invitation);

    if (oldInvitation) {
        // If the invitation status is changed to accepted, then create a new event volunteer object.
        // If the invitation status is changes from accepted, then delete.
        if (oldInvitation.status !== InvitationStatus.ACCEPTED && invitation.status === InvitationStatus.ACCEPTED) {
            await EventVolunteerService.create({
                event: salesforceInvitation.event__c,
                status: salesforceInvitation.status__c,
                volunteer: salesforceInvitation.volunteer__c
            });
        } else if (
            oldInvitation.status === InvitationStatus.ACCEPTED &&
            invitation.status !== InvitationStatus.ACCEPTED
        ) {
            await EventVolunteerService.remove({
                eventId: salesforceInvitation.event__c,
                volunteerId: salesforceInvitation.volunteer__c
            });
        }
    }

    delete salesforceInvitation.event__c;
    let res = conn.sobject(invitationObjectName).update(salesforceInvitation, function(err, ret) {
        if (err || !ret.success) {
            return console.error(err, ret);
        }
    });

    return res;
};

// create new volunteer invitation object in salesforce with fields
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
export const create = async (invitation: Invitation): Promise<string> => {
    const invitationInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(invitationObjectName)
        .create(invitationModelToSalesforceInvitation(invitation), (err: Error, result) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return invitationInfo.id;
};

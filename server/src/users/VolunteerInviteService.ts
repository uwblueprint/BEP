import Invite from './VolunteerInviteInterface';
import { conn } from '../server';

const inviteApi: string = "invite__c";

export const getInvite = async (id: string) : Promise<Invite> => {
    let inviteInfo: Invite = conn.sobject(inviteApi).find({ id: id },
        'opportunityName, volunteerName, inviterName, inviteStatus' ).limit(1).execute(
        function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }

            let invite: Invite = record[0];
            return invite;
        });

    console.log(inviteInfo);
    return inviteInfo;
};

export const create = async (
    opportunityName: string,
    volunteerName: string,
    inviterName: string,
    inviteStatus: string
): Promise<void> => {
    conn.sobject(event).create(
        {
            opportunityName: opportunityName,
            volunteerName: volunteerName,
            inviterName: inviterName,
            inviteStatus: inviteStatus
        },
        function (err: Error, result) {
            if (err || !result.success) {
                return console.error(err, result);
            }
            console.log("Created invite with ID: " + result.id);
        }
    );
};

export const remove = async (id: string): Promise<void> => {
    conn.sobject(inviteApi).find({
        id: id
    }).destroy(function (err: Error, result) {
        if (err || !result.success) {
            return console.error(err, result);
        }
        console.log("Deleted invite with ID: " + result[0].id);
    })
};

export const accept = async(id: string): Promise<Invite> => {
    let acceptedInvite: Invite = conn.sobject(inviteApi).update({
        id: id,
        inviteStatus: 'accepted'
    },
    function(err: Error, result) {
        if (err || !result.success) {
            return console.error(err, result);
        }

        console.log("Accepted successfully " + result.id);
    })

    return acceptedInvite;
};

export const decline = async(id: string): Promise<Invite> => {
    let declindedInvite: Invite = conn.sobject(inviteApi).update({
        id: id,
        inviteStatus: 'declined'
    },
    function(err: Error, result) {
        if (err || !result.success) {
            return console.error(err, result);
        }

        console.log("Declined successfully " + result.id);
    })

    return declindedInvite;
};

import Event from '../events/EventInterface';
import Volunteer from '../users/VolunteerInterface';

export enum InvitationStatus {
    ACCEPTED = 'accepted',
    WITHDRAWN = 'withdrawn',
    DECLINED = 'declined',
    PENDING = 'pending'
}

export default interface InvitationInterface {
    event: Event | string;
    id?: string;
    status: InvitationStatus;
    volunteer: Volunteer | string;
}

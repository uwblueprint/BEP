import Event from '../events/EventInterface';
import Volunteer from '../users/VolunteerInterface';

export enum ApplicationStatus {
    ACCEPTED = 'accepted',
    WITHDRAWN = 'withdrawn',
    DECLINED = 'declined',
    PENDING = 'pending'
}

export default interface ApplicationInterface {
    event: Event | string;
    id?: string;
    status: ApplicationStatus;
    volunteer: Volunteer | string;
}

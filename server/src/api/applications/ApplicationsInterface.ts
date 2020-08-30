import Event from '../events/EventInterface';
import Volunteer from '../users/VolunteerInterface';

export default interface VolunteerAppInterface {
    event: Event | string;
    id?: string;
    status: string;
    volunteer: Volunteer | string;
}

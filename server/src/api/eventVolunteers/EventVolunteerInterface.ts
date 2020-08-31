import Event from '../events/EventInterface';
import Volunteer from '../users/VolunteerInterface';

export default interface EventVolunteerInterface {
    event: Event | string;
    id?: string;
    volunteer: Volunteer | string;
}

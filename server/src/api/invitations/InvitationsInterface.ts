import Event from '../events/EventInterface';
import Volunteer from '../users/VolunteerInterface';

export default interface InvitationInterface {
    event: Event | string;
    id?: string;
    status: string;
    volunteer: Volunteer | string;
}

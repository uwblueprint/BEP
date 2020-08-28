import Volunteer from '../users/VolunteerInterface';

export default interface VolunteerAppInterface {
    status: string;
    id?: string;
    volunteer: Volunteer;
}

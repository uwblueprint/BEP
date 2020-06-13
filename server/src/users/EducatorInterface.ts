import UserInterface from "./UserInterface"
import {InternalActivities, ExternalActivities} from "./VolunteerInterface"

export default interface EducatorInterface extends UserInterface{
    desiredActivities: (InternalActivities | ExternalActivities)[],
    position: string,
    schoolBoard: string,
    school: string,
}

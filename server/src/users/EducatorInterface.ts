import UserInterface from "./UserInterface"
import {InternalActivities, ExternalActivities} from "./VolunteerInterface"

export default interface EducatorInterface extends UserInterface{
    schoolBoard: string,
    school: string,
    position: string,
    desiredActivities: (InternalActivities | ExternalActivities)[],
}

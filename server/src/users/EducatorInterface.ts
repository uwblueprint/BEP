import UserInterface from "./UserInterface"

export default interface EducatorInterface extends UserInterface{
    educatorDesiredActivities: string[];
    position: string;
    schoolBoard: string;
    school: string;
}

import UserInterface, { UserType } from './UserInterface';
import SchoolInterface from '../schools/SchoolInterface';

export default interface EducatorInterface extends UserInterface {
    educatorDesiredActivities: string[];
    position: string;
    school: SchoolInterface;
}

export const isEducator = (obj: any): boolean => {
    return (
        UserType[obj.userType] === UserType[UserType.Educator] &&
        Array.isArray(obj.educatorDesiredActivities) &&
        typeof obj.educatorDesiredActivities.every(item => typeof item === 'string') &&
        typeof obj.position === 'string' &&
        typeof obj.schoolBoard === 'string' &&
        typeof obj.schoolName === 'string'
    );
};

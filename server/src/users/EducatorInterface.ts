import UserInterface, { UserType } from './UserInterface';

export default interface EducatorInterface extends UserInterface {
    educatorDesiredActivities: string[];
    position: string;
    schoolBoard: string;
    school: string;
}

export const isEducator = (obj: any): boolean => {
    return (
        UserType[obj.userType] === UserType[UserType.Educator] &&
        Array.isArray(obj.educatorDesiredActivities) &&
        typeof obj.educatorDesiredActivities.every(item => typeof item === 'string') &&
        typeof obj.position === 'string' &&
        typeof obj.schoolBoard === 'string' &&
        typeof obj.school === 'string'
    );
};

import UserInterface, { UserType } from './UserInterface';
import SchoolInterface, { isSchool } from '../schools/SchoolInterface';

export default interface EducatorInterface extends UserInterface {
    educatorDesiredActivities: string[];
    introductionMethod: string;
    moreInfo: string[];
    position: string;
    school: SchoolInterface;
}

export const isEducator = (obj: any): boolean => {
    return (
        UserType[obj.userType] === UserType[UserType.Educator] &&
        Array.isArray(obj.educatorDesiredActivities) &&
        obj.educatorDesiredActivities.every(item => typeof item === 'string') &&
        typeof obj.position === 'string' &&
        typeof obj.introductionMethod === 'string' &&
        Array.isArray(obj.moreInfo) &&
        obj.moreInfo.every(item => typeof item === 'string') &&
        obj.school &&
        isSchool(obj.school)
    );
};

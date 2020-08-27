import UserInterface, { UserType } from './UserInterface';

export default interface EducatorInterface extends UserInterface {
    educatorDesiredActivities: string[];
    schoolName: string[];
    schoolBoard: string[];
    position: string[];
    introductionMethod: string[];
    moreInfo: string[];
}

export const isEducator = (obj: any): boolean => {
    return (
        UserType[obj.userType] === UserType[UserType.Educator] &&
        Array.isArray(obj.educatorDesiredActivities) &&
        obj.educatorDesiredActivities.every(item => typeof item === 'string') &&
        Array.isArray(obj.schoolName) &&
        obj.schoolName.every(item => typeof item === 'string') &&
        Array.isArray(obj.schoolBoard) &&
        obj.schoolBoard.every(item => typeof item === 'string') &&
        Array.isArray(obj.position) &&
        obj.position.every(item => typeof item === 'string') &&
        Array.isArray(obj.position) &&
        obj.introductionMethod.every(item => typeof item === 'string') &&
        Array.isArray(obj.moreInfo) &&
        obj.moreInfo.every(item => typeof item === 'string')
    );
};

// import Request from 'request.ts';

// TODO: build API and Salesforce objects for:
//         + employers
//         + professional associations
//         + local post-secondary institutions

export enum UserType {
    Educator = 1,
    Volunteer = 2
}

export default interface UserInterface {
    email: string;
    firstName: string;
    followedPrograms: string[];
    id: string; // Record id from Salesforce, cannot be modified.
    isSubscribed: boolean;
    lastName: string;
    password: string;
    phoneNumber: string;
    preferredPronouns: string;
    // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student
    userType: UserType;
}

export const isUser = (obj: any): boolean => {
    return (
        typeof obj.firstName === 'string' &&
        typeof obj.lastName === 'string' &&
        typeof obj.email === 'string' &&
        Array.isArray(obj.followedPrograms) &&
        typeof obj.followedPrograms.every(item => typeof item === 'string') &&
        typeof obj.isSubscribed === 'boolean' &&
        typeof obj.password === 'string' &&
        typeof obj.phoneNumber === 'number' &&
        typeof obj.preferredPronouns === 'string' &&
        typeof obj.userType === 'number'
    );
};

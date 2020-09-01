export enum UserType {
    Educator = 1,
    Volunteer = 2
}

export default interface UserInterface {
    email: string;
    firstName: string;
    id?: string; // Record id from Salesforce, cannot be modified.
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
        typeof obj.isSubscribed === 'boolean' &&
        typeof obj.password === 'string' &&
        typeof obj.phoneNumber === 'string' &&
        typeof obj.preferredPronouns === 'string' &&
        typeof obj.userType === 'number'
    );
};

export function InitUser(config: UserInterface) {}

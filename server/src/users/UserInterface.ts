// import Request from 'request.ts';

export default interface UserInterface {
    
    //email: string;
    firstName: string;
    //followedPrograms: string[];
    //id: string; // Record id from Salesforce, cannot be modified.
    //isSubscribed: boolean;
    lastName: string;
    password: string;
    phoneNumber: string;
    //preferredPronouns: string;
    // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student

}

export function InitUser(config: UserInterface) {}
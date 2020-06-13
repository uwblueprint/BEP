// import Request from 'request.ts';

export default interface UserInterface {
    firstName: string;
    lastName: string;
    
    email: string;
    followedPrograms: string[];
    id: number;
    recordId: number; // From Salesforce.
    isSubscribed: boolean;
    password: string;
    phoneNumber: string;
    preferredPronouns: string;
}

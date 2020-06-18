// import Request from 'request.ts';

// TODO: build API and Salesforce objects for:
//         + employers
//         + professional associations
//         + local post-secondary institutions

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
    // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student
    userType: number;
}


// import Request from 'request.ts';

export default interface UserInterface {
    // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student
    firstName: string;
    lastName: string;
    preferredPronouns: string;
    email: string;
    // isActive: boolean;
    phoneNumber: string;
    password: string;
    // userType: number;
    // status: number;
    // private requestList?: Array<Request>;

    followedPrograms: string[];
    isSubscribed: boolean;
}

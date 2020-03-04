// import Request from 'request.ts';

export default interface UserInterface {
    
    // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    phoneNumber: string;
    userType: number;
    status: number;
    // private requestList?: Array<Request>;

    // function getRequests(userId: string, userType: number): Array<Request> {
    //     if (userId === this.userId || userType === 0) {
    //         return this.requestList;
    //     }
    // }

}
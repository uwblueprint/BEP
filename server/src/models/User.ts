export default class User {

    // userType: 0 = admin/superuser, 1 = teacher/educator, 2 = volunteer/student

    private firstName: string;
    private lastName: string;
    private email: string;
    private isActive: boolean;
    private phoneNumber: string;
    private userType: number;
    // private requestList?: Array<request>;

    constructor(firstName: string, lastName: string, email: string, isActive: boolean, phoneNumber: string, userType: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isActive = isActive;
        this.phoneNumber = phoneNumber;
        this.userType = userType;
        // this.requestList = [];
        //
    }

    // function getRequests(userId: string, userType: number): Array<request> {
    //     if (userId === this.userId || userType === 0) {
    //         return this.requestList;
    //     }
    // }






}
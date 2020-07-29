// import Request from 'request.ts';

// TODO: build API and Salesforce objects for:
//         + employers
//         + professional associations
//         + local post-secondary institutions

export interface Event {
    eventName: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
}
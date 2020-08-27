export default interface EmployerInterface {
    abbreviatedName: string;
    email?: string;
    id?: string;
    city: string;
    name: string;
    phoneNumber: string;
    postalCode: string;
    province: string;
    schoolBoard: string;
    address: string;
    type: string;
}

export const isSchool = (obj: any): boolean => {
    return (
        typeof obj.abbreviatedName === 'string' &&
        (!obj.email || typeof obj.email === 'string') &&
        (!obj.id || typeof obj.id === 'string') &&
        typeof obj.city === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.phoneNumber === 'string' &&
        typeof obj.postalCode === 'string' &&
        typeof obj.province === 'string' &&
        typeof obj.schoolBoard === 'string' &&
        typeof obj.address === 'string' &&
        typeof obj.type === 'string'
    );
};

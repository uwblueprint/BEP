export default interface EmployerInterface {
    address: string;
    city: string;
    id: string;
    name: string;
    phoneNumber: string;
    postalCode: string;
    sectors: string[];
    size: string;
    socialMedia: string[];
    website: string;
}

export const isEmployer = (obj: any): boolean => {
    return (
        typeof obj.address === 'string' &&
        typeof obj.city === 'string' &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.phoneNumber === 'string' &&
        typeof obj.postalCode === 'string' &&
        Array.isArray(obj.sectors) &&
        obj.sectors.every(item => typeof item === 'string') &&
        typeof obj.size === 'string' &&
        Array.isArray(obj.socialMedia) &&
        obj.socialMedia.every(item => typeof item === 'string') &&
        typeof obj.website === 'string'
    );
};

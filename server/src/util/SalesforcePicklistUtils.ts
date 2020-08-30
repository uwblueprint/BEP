// Converts between Salesforce picklist (string of object delimited by semicolons) and arrays.
const arrayToPicklistString = (arr: string[]): string => arr.join(';');
const picklistStringToArray = (str: string): string[] => (str ? str.split(';') : []);

export { arrayToPicklistString, picklistStringToArray };

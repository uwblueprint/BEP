export enum SchoolListType {
  abbreviatedName = "abbreviatedName",
  email = "email",
  id = "id",
  city = "city",
  name = "name",
  phoneNumber = "phoneNumber",
  postalCode = "postalCode",
  province = "province",
  schoolBoard = "schoolBoard",
  address = "address",
  type = "type",
}

export interface School {
  abbreviatedName: string;
  email?: string;
  id: string;
  city: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  province: string;
  schoolBoard: string;
  address: string;
  type: string;
}

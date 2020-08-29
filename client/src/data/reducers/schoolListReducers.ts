import { FETCH_SCHOOLLIST } from "../actions/actionTypes";
import { SchoolListType } from "../types/schoolListTypes";
import { SchoolListActions } from "../actions/schoolListActions";

export interface SchoolListPayload {
  schoolListType: SchoolListType;
  schoolList: string[];
}

export type SchoolListState = {
  [key in SchoolListType]: string[];
};

const initialState: SchoolListState = {
  [SchoolListType.abbreviatedName]: [],
  [SchoolListType.email]: [],
  [SchoolListType.id]: [],
  [SchoolListType.city]: [],
  [SchoolListType.name]: [],
  [SchoolListType.phoneNumber]: [],
  [SchoolListType.postalCode]: [],
  [SchoolListType.province]: [],
  [SchoolListType.schoolBoard]: [],
  [SchoolListType.address]: [],
  [SchoolListType.type]: [],
};

export default function (
  state: SchoolListState = initialState,
  action: SchoolListActions
) {
  switch (action.type) {
    case FETCH_SCHOOLLIST:
      return {
        ...state,
        [SchoolListType[action.payload.schoolListType]]:
          action.payload.schoolList,
      };

    default:
      return state;
  }
}

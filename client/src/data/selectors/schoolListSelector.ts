import { createSelector } from "reselect";
import { SchoolListState } from "../reducers/schoolListReducers";
import { SchoolListType } from "../types/schoolListTypes";

const getSchoolListData = (schoolListType: SchoolListType) => (
  state: SchoolListState
) =>
  state[SchoolListType[schoolListType]]
    ? state[SchoolListType[schoolListType]]
    : [];

const createSchoolListSelector = (schoolListType: SchoolListType) =>
  createSelector(
    [getSchoolListData(schoolListType)],
    (schoolList) => schoolList
  );

export const getSchoolNameList = createSchoolListSelector(SchoolListType.name);

export const getSchoolBoardList = createSchoolListSelector(
  SchoolListType.schoolBoard
);

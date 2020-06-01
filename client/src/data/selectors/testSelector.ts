import { createSelector } from 'reselect';

const getTestData = (state:any) => {
    return state.test.users ? state.test && state.test.users : [];
}

// more details on creating selectors:
// https://redux.js.org/recipes/computing-derived-data
export const getTests = createSelector([getTestData], (testData) => testData);
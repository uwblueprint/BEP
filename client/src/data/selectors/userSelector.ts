import { createSelector } from 'reselect';
import { userObject } from '../reducers/authReducers';

const currentUser = (state: userObject) => {
    return state.user.user && state.user ? state.user.user : null;
}

const isLoggedIn = (state: userObject) => {
    return state.user.loggedIn && state.user ? state.user.loggedIn : false;
}

// more details on creating selectors:
// https://redux.js.org/recipes/computing-derived-data
export const getUser = createSelector([currentUser], (userData) => userData);
export const getIsLoggedIn = createSelector([isLoggedIn], (userData) => userData);
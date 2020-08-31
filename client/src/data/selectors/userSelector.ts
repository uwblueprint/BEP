import { createSelector } from 'reselect';
import { userState } from '../reducers/authReducers';

const currentUser = (state: userState) => {
    const storedUserStr = localStorage.getItem("user");
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    return state.user ? state.user : storedUser ;
}

const isLoggedIn = (state: userState) => {
    return state.user && state.loggedIn ? state.loggedIn : false;
}

// more details on creating selectors:
// https://redux.js.org/recipes/computing-derived-data
export const getUser = createSelector([currentUser], (userData) => userData);
export const getIsLoggedIn = createSelector([isLoggedIn], (userData) => userData);
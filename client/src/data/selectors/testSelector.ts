export const getTestData = (state:any) => {
    return state.test.users ? state.test && state.test.users : [];
}
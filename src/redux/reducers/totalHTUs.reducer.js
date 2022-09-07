const totalHTUsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOTAL_HTUS':
            return action.payload;
        default:
            return state;
    }
};

export default totalHTUsReducer;
const totalTimeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOTAL_TIME':
            return action.payload;
        default:
            return state;
    }
};

export default totalTimeReducer;
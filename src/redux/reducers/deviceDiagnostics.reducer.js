const deviceDiagnosticsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DEVICE_DIAGNOSTICS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default deviceDiagnosticsReducer;
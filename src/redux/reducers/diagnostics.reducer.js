const diagnostics = (state = [], action) => {
    switch (action.type) {
      case 'SET_DIAGNOSTICS':
          return action.payload;
      default:
        return state;
    }
};

export default diagnostics;
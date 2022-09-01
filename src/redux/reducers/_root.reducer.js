import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import deviceDiagnostics from './deviceDiagnostics.reducer';
import setProcedureReducer from './setProcedure.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  deviceDiagnostics, // will have an id and username if someone is logged in with
  setProcedureReducer // This grabs the procedure id after hitting the start procedure button
});

export default rootReducer;

import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// Gets diagnostics
function* getDiagnostics() {
    console.log('in SAGA getDiagnostics');

    try {
        const response = yield axios.get('/diagnostics');
        // console.log('this is response', response);

        // Stores diagnostics in reducer
        yield put({type: "SET_DIAGNOSTICS", payload: response.data});
    } catch (error) {
        console.log('Error in getDiagnostics', error);
    }
}

// Gets procedure
function* getProcedure() {
    console.log('in getProcedure');

    try {
        const response = yield axios.get('/api/procedure/all');
        
        // Stores procedure in reducer
        yield put({type: "SET_PROCEDURE", payload: response.data});
    } catch (error) {
        console.log('Error GETting procedure', error);
    }
}

// Posts diagnostics to the DB from device
function* postDiagnostics(action) {
    console.log('in postDiagnostics');
    console.log('action.payload', action.payload);

    try {
        yield axios.post('/diagnostics', action.payload);
        yield put({type: "ADD_DIAGNOSTICS"});
    } catch (error) {
        console.log('Error in postDiagnostics', error);
    }
}

// Updates notes from history page
function* editNotes(action) {
    console.log('in editNotes, this is action.payload', action.payload);

    try {
        yield axios.put(`/api/procedure/${action.payload.id}`, action.payload);
        yield put({type: "UPDATE_NOTES"});
    } catch (error) {
        console.log('Error UPDATEing notes', error);
    }
}

// Deletes an individual diagnostic row
function* deleteDiagnostic(action) {
    console.log('in deleteDiagnostic, this is action', action.payload);

    try {
        yield axios.delete(`/diagnostics/individual-procedure/${action.payload}`);
        yield put({type: "FETCH_DIAGNOSTICS"});
    } catch {
        console.log('Error in deleteDiagnostic');
    }
}

// Deletes all diagnostics
function* deleteAllDiagnostics() {
    console.log('in deleteAllDiagnostics');

    try {
        yield axios.delete('/diagnostics');
        yield put({type: "FETCH_DIAGNOSTICS"});
    } catch (error) {
        console.log('Error in deleteAllDiagnostics', error);
    }
}

// Watches for dispatches anywhere on app
function* diagnosticsSaga() {
    yield takeLatest("FETCH_DIAGNOSTICS", getDiagnostics);
    yield takeLatest("FETCH_PROCEDURE", getProcedure);
    yield takeEvery("DELETE_DIAGNOSTIC", deleteDiagnostic);
    yield takeLatest("DELETE_ALL", deleteAllDiagnostics);
    yield takeLatest("POST_DIAGNOSTICS", postDiagnostics);
    yield takeLatest("EDIT_NOTES", editNotes);
}

export default diagnosticsSaga;
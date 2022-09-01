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

function* deleteDiagnostic(action) {
    console.log('in deleteDiagnostic, this is action', action.payload);

    try {
        yield axios.delete(`/diagnostics/individual-procedure/${action.payload}`);
        yield put({type: "FETCH_DIAGNOSTICS"});
    } catch {
        console.log('Error in deleteDiagnostic');
    }
}

// Watches for dispatches anywhere on app
function* diagnosticsSaga() {
    yield takeLatest("FETCH_DIAGNOSTICS", getDiagnostics);
    yield takeEvery("DELETE_DIAGNOSTIC", deleteDiagnostic);
}

export default diagnosticsSaga;
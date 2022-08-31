import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// Gets diagnostics
function* getDiagnostics() {
    try {
        const response = yield axios.get('/diagnostics');
        console.log('this is response', response);

        // Stores diagnostics in reducer
        yield put({type: "SET_DIAGNOSTICS", payload: response.data});
    } catch (error) {
        console.log('Error in getDiagnostics', error);
    }
}

// Watches for dispatches anywhere on app
function* diagnosticsSaga() {
    yield takeLatest("FETCH_DIAGNOSTICS", getDiagnostics);
}

export default diagnosticsSaga;
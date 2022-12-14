import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* setProcedure() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        yield axios.post('/api/procedure', config);
        // get request to save procedure id in the store for later use
        const response = yield axios.get('/api/procedure', config);
        yield put({ type: 'SET_PROCEDURE', payload: response.data })
    } catch (error) {
        console.log(' Failed in setProcedure post request failed', error);
    }
}

// Generator function to get all procedure history
function* getAllProcedures() {
    console.log('in getAllProcedures');

    try {
        const response = yield axios.get('/api/procedure/all-history');
        yield put({type: "SET_ALL_PROCEDURES", payload: response.data});
    } catch (error) {
        console.log('Error in getAllProcedures');
    }
}

function* deleteProcedure(action) {
    console.log('in deleteProcedure');

    try {
        yield axios.delete(`/api/procedure/${action.payload}`);
        yield put({type: "UNSET_PROCEDURE"});
        yield put({type: "FETCH_PROCEDURE"});
        yield put({type: "FETCH_ALL_HISTORY"})
    } catch (error) {
        console.log('Error in deleteProcedure');
    }
}

function* procedureSaga() {
    yield takeLatest('ADD_NEW_PROCEDURE', setProcedure);
    yield takeLatest("FETCH_ALL_HISTORY", getAllProcedures);
    yield takeEvery("DELETE_PROCEDURE", deleteProcedure);
}
export default procedureSaga;
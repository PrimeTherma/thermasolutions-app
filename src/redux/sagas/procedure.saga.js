import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* setProcedure() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        yield axios.post('/api/procedure', config);
    } catch (error) {
        console.log(' Failed in setProcedure post request failed', error);
    }
}

function* procedureSaga() {
    yield takeLatest('ADD_NEW_PROCEDURE', setProcedure);
}
export default procedureSaga;
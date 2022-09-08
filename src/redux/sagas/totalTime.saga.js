import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector } from 'react-redux';



function* postTime(action) {
    console.log('in postTIME');
    console.log('action.payload', action.payload.id);
    // const procedure=useSelector((store) => store.setProcedure);
    try {
        // const procedure=useSelector((store) => store.setProcedure);
        const response = yield axios.put(`/api/procedure/time/${action.payload.id}`, action.payload);
        yield put({type: "SET_TOTAL_TIME", payload: response.data});
    } catch (error) {
        console.log('Error in posTIme', error);
    }
}

function* totalTimeSaga() {
    yield takeLatest("POST_TIME", postTime);
}

export default totalTimeSaga;
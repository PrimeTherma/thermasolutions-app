import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector } from 'react-redux';



function* postHTU(action) {
    console.log('in postHTU');
    console.log('action.payload', action.payload.id);
    // const procedure=useSelector((store) => store.setProcedure);
    try {
        // const procedure=useSelector((store) => store.setProcedure);
        const response = yield axios.put(`/api/procedure/htu/${action.payload.id}`, action.payload);
        yield put({type: "SET_TOTAL_HTUS", payload: response.data});
    } catch (error) {
        console.log('Error in postHTUS', error);
    }
}

function* totalHTUSaga() {
    yield takeLatest("POST_HTU", postHTU);
}

export default totalHTUSaga;
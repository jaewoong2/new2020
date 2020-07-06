import { takeLatest, delay, call, fork, all, put } from "redux-saga/effects"
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, UP_LOAD_POST_REQUEST, UP_LOAD_POST_SUCCESS, UP_LOAD_POST_FAILURE } from "../reducer/post"
import axios from 'axios';


/////////////////////////////////////////////////////////////////////////////

function loadPostAPI() {
    return axios.get('/post')
}

function* loadPost(action) {
    try {  
        //  const result = yield call(loadPostAPI, action.data)
        yield delay(1000);
        yield put({
            type : LOAD_POST_SUCCESS,
            data : action.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : LOAD_POST_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLoadPosts() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

//로드
//업로드

function upLoadPostAPI(data) {
    return axios.post('/post', data)
}

function* upLoadPost(action) {
    try {  
        //  const result = yield call(upLoadPostAPI, action.data)
        const data = yield call(() => {
            return {
                id : action.data.id,
                title : action.data.title,
                description : action.data.content,
                image : action.data.image[0],
                price : action.data.price,
            }
        });
        yield delay(1000);
        yield put({
            type : UP_LOAD_POST_SUCCESS,
            data : data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : UP_LOAD_POST_FAILURE,
            error : err.response.data
        })
    }
}

function* watchUpLoadPosts() {
    yield takeLatest(UP_LOAD_POST_REQUEST, upLoadPost);
}

/////////////////////////////////////////////////////////////////////////////
export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchUpLoadPosts),
    ])
}
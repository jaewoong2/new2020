import { takeLatest, delay, call, fork, all, put } from "redux-saga/effects"
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, UP_LOAD_POST_REQUEST, UP_LOAD_POST_SUCCESS, UP_LOAD_POST_FAILURE, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, LOAD_ONE_POST_REQUEST, LOAD_ONE_POST_SUCCESS, LOAD_ONE_POST_FAILURE } from "../reducer/post"
import axios from 'axios';


/////////////////////////////////////////////////////////////////////////////

function loadOnePostAPI(data) {
    return axios.get(`/post/${data}`)
}

function* loadOnePost(action) {
    try {  
         const result = yield call(loadOnePostAPI, action.id)
        yield put({
            type : LOAD_ONE_POST_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : LOAD_ONE_POST_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLoadOnePosts() {
    yield takeLatest(LOAD_ONE_POST_REQUEST, loadOnePost);
}

//로드 원
//로드
function loadPostAPI(data) {
    return axios.get(`/posts?lastId=${data || 0}`)
}

function* loadPost(action) {
    try {  
         const result = yield call(loadPostAPI, action.lastId)
        yield put({
            type : LOAD_POST_SUCCESS,
            data : result.data
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
        const result = yield call(upLoadPostAPI, action.data)
        const variables = yield call(() => {
            return {
                ...result.data,
                price : parseInt(result.data.price, 10)
            }
        })
        yield put({
            type : UP_LOAD_POST_SUCCESS,
            data : variables
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

//게시글 업로드
//게시글 삭제

function deletePostAPI(data) {
    return axios.delete(`/post/${data}`)
}

function* deletePost(action) {
    try {  
        const result = yield call(deletePostAPI, action.data)
        yield put({
            type : DELETE_POST_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : DELETE_POST_FAILURE,
            error : err.response.data
        })
    }
}

function* watchDeletePosts() {
    yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

/////////////////////////////////////////////////////////////////////////////
export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchUpLoadPosts),
        fork(watchDeletePosts),
        fork(watchLoadOnePosts),
    ])
}
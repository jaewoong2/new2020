import { takeLatest, delay, call, fork, all, put } from "redux-saga/effects"
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, UP_LOAD_POST_REQUEST, UP_LOAD_POST_SUCCESS, UP_LOAD_POST_FAILURE, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, LOAD_ONE_POST_REQUEST, LOAD_ONE_POST_SUCCESS, LOAD_ONE_POST_FAILURE, SEARCH_HASHTAG_REQUEST, SEARCH_HASHTAG_SUCCESS, SEARCH_HASHTAG_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_INFO_IMAGES_REQUEST, UPLOAD_INFO_IMAGES_SUCCESS, UPLOAD_INFO_IMAGES_FAILURE } from "../reducer/post"
import axios from 'axios';


/////////////////////////////////////////////////////////////////////////////

function loadOnePostAPI(data) {
    return axios.get(`/post/${data}`)
}

function* loadOnePost(action) {
    try {  
         const result = yield call(loadOnePostAPI, action.data)
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

//해쉬태그 검색
function searchHashtagAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
}

function* searchHashtag(action) {
    try {  
         const result = yield call(searchHashtagAPI, action.data ,action.lastId)
        yield put({
            type : SEARCH_HASHTAG_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : SEARCH_HASHTAG_FAILURE,
            error : err.response.data
        })
    }
}

function* watchSearchHashtag() {
    yield takeLatest(SEARCH_HASHTAG_REQUEST, searchHashtag);
}

// 이미지 업로드
function imageUploadAPI(data) {
    return axios.post('/post/images', data)
}

function* imageUpload(action) {
    try {  
         const result = yield call(imageUploadAPI, action.data)
        yield put({
            type : UPLOAD_IMAGES_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : UPLOAD_IMAGES_FAILURE,
            error : err.response.data
        })
    }
}

function* watchImageUpload() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, imageUpload);
}


// 상품정보 업로드
function imageInfoUploadAPI(data) {
    return axios.post('/post/imageInfo', data)
}

function* imageInfoUpload(action) {
    try {  
         const result = yield call(imageInfoUploadAPI, action.data)
        yield put({
            type : UPLOAD_INFO_IMAGES_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : UPLOAD_INFO_IMAGES_FAILURE,
            error : err.response.data
        })
    }
}

function* watchImageInfoUpload() {
    yield takeLatest(UPLOAD_INFO_IMAGES_REQUEST, imageInfoUpload);
}



/////////////////////////////////////////////////////////////////////////////
export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchUpLoadPosts),
        fork(watchDeletePosts),
        fork(watchLoadOnePosts),
        fork(watchSearchHashtag),
        fork(watchImageUpload),
        fork(watchImageInfoUpload)
    ])
}
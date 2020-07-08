import { takeLatest, delay, call, fork, all, put } from "redux-saga/effects"
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_OUT_REQUEST, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, ITEM_TO_CART_REQUEST, ITEM_TO_CART_SUCCESS, ITEM_TO_CART_FAILURE, ITEM_BYE_CART_REQUEST, ITEM_BYE_CART_SUCCESS, ITEM_BYE_CART_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE } from "../reducer/user"
import axios from 'axios';
import { dummyCardMaking } from "../reducer/post";


/////////////////////////////////////////////////////////////////////////////

function signupAPI(data) {
    return axios.post('/user', data)
}

function* signup(action) {
    try {  
         const result = yield call(signupAPI, action.data)
        // yield delay(1000);
        yield put({
            type : SIGN_UP_SUCCESS,
            // data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : SIGN_UP_FAILURE,
            error : err.response.data
        })
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

/////////////////////////     회원가입    /////////////////////////////////

function loginAPI(data) {
    return axios.post('/user/login', data)
}

function* login(action) {
    try {  
         const result = yield call(loginAPI, action.data)
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : LOG_IN_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
/////////////////////////     로그인    /////////////////////////////////////


function logoutAPI() {
    return axios.post('/user/logout')
}

function* logout(action) {
    try {  
         const result = yield call(logoutAPI, action.data)
        // yield delay(1000);
        yield put({
            type : LOG_OUT_SUCCESS,
            // data : action.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : LOG_OUT_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
/////////////////////////     로그아웃    /////////////////////////////////////

function loadMyInfoAPI() {
    return axios.get('/user')
}

function* loadMyInfo(action) {
    try {  
         const result = yield call(loadMyInfoAPI, action.data)
        // yield delay(1000);
        yield put({
            type : LOAD_MY_INFO_SUCCESS,
            data : result.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : LOAD_MY_INFO_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
/////////////////////////  내정보 받아오기    /////////////////////////////////////


function itemToCartAPI() {
    return axios.post('/user/cart')
}

function* itemToCart(action) {
    try {  
        //  const result = yield call(itemToCartAPI, action.data)
        yield delay(2000);
        yield put({
            type : ITEM_TO_CART_SUCCESS,
            data : action.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : ITEM_TO_CART_FAILURE,
            // error : err.response.data
        })
    }
}

function* watchItemToCart() {
    yield takeLatest(ITEM_TO_CART_REQUEST, itemToCart);
}
/////////////////////////     장바구니    /////////////////////////////////////


function itemByeCartAPI(data) {
    return axios.delete('/user/cart', data)
}

function* itemByeCart(action) {
    try {  
        //  const result = yield call(itemByeCartAPI, action.data)
        yield delay(1000);
        yield put({
            type : ITEM_BYE_CART_SUCCESS,
            data : action.data
        })
        
    } catch(err) {
        console.error(err)
        yield put({
            type : ITEM_BYE_CART_FAILURE,
            // error : err.response.data
        })
    }
}

function* watchItemByeCart() {
    yield takeLatest(ITEM_BYE_CART_REQUEST, itemByeCart);
}
/////////////////////////     장바구니 빼기   /////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogout),
        fork(watchItemToCart),
        fork(watchItemByeCart),
        fork(watchLoadMyInfo),
    ])
}
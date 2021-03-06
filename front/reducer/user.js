import produce from 'immer'

////////////////////////////////////////////////////////////////////////////

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const ITEM_TO_CART_REQUEST = 'ITEM_TO_CART_REQUEST'
export const ITEM_TO_CART_SUCCESS = 'ITEM_TO_CART_SUCCESS'
export const ITEM_TO_CART_FAILURE = 'ITEM_TO_CART_FAILURE'

export const ITEM_BYE_CART_REQUEST = 'ITEM_BYE_CART_REQUEST'
export const ITEM_BYE_CART_SUCCESS = 'ITEM_BYE_CART_SUCCESS'
export const ITEM_BYE_CART_FAILURE = 'ITEM_BYE_CART_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

////////////////////////////////////////////////////////////////////////////

const initialState = {
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,

    loginLoading: false, //로그아웃 동일
    loginDone: false, // 로그아웃 동일
    loginError: null, // 로그아웃 동일

    loadMyInfoLoading: false, //로그아웃 동일
    loadMyInfoDone: false, // 로그아웃 동일
    loadMyInfoError: null, // 로그아웃 동일

    itemToCartLoading: false,
    itemToCartDone: false,
    itemToCartError: null,

    itemByeCartLoading: false,
    itemByeCartDone: false,
    itemByeCartError: null,

    // signUpInfo: [],
    me: {},
    cartMessage: '',
}


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;

            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                // draft.signUpInfo.push(action.data);
                break;


            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                draft.signUpError = action.error;
                break;

            //회원가입

            case LOG_IN_REQUEST:
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;

            case LOG_IN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.me = action.data
                break;


            case LOG_IN_FAILURE:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.loginError = action.error;
                break;

            //로그인

            case LOG_OUT_REQUEST:
                draft.loginLoading = true;
                draft.loginError = null;
                draft.loginDone = false;
                break;

            case LOG_OUT_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.me = {};
                break;


            case LOG_OUT_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.loginError = action.error;
                break;
            //로그인

            //장바구니 담기
            case ITEM_TO_CART_REQUEST:
                draft.itemToCartLoading = true;
                draft.itemToCartDone = false;
                draft.itemToCartError = null;
                break;

            case ITEM_TO_CART_SUCCESS:
                draft.itemToCartLoading = false;
                draft.itemToCartDone = true;
                draft.me.Carts.unshift({Cart : action.data});
                draft.cartMessage = '장바구니에 상품이 추가 됐습니다.'
                break;

            case ITEM_TO_CART_FAILURE:
                draft.itemToCartLoading = false;
                draft.itemToCartDone = true;
                draft.itemToCartError = action.error;
                break;

            //장바구니 빼기
            case ITEM_BYE_CART_REQUEST:
                draft.itemByeCartLoading = true;
                draft.itemByeCartDone = false;
                draft.itemByeCartError = null;
                break;

            case ITEM_BYE_CART_SUCCESS:
                draft.itemByeCartLoading = false;
                draft.itemByeCartDone = true;
                draft.me.Carts = draft.me.Carts.filter(v => v?.Cart.PostId !== action.data);
                draft.cartMessage = '장바구니의 상품을 삭제했습니다.'
                break;

            case ITEM_BYE_CART_FAILURE:
                draft.itemByeCartLoading = false;
                draft.itemByeCartDone = true;
                draft.itemByeCartError = action.error;
                break;

            // 로그인 정보 받아오기
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = null;
                break;

            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.me = action.data;
                break;

            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.loadMyInfoError = action.error;
                break;

        }
    })
}

export default reducer;
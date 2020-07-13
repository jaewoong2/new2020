import produce from 'immer'
import faker from 'faker';


export const dummyCardMaking = () => {
    const values = {
        id: faker.random.number(),
        title: faker.random.word(),
        description: faker.random.words(),
        image: faker.image.image(),
        price: Math.floor(Math.random() * 200) * 100
    }
    return values
}

////////////////////////////////////////////////////////////////////////////

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const LOAD_ONE_POST_REQUEST = 'LOAD_ONE_POST_REQUEST'
export const LOAD_ONE_POST_SUCCESS = 'LOAD_ONE_POST_SUCCESS'
export const LOAD_ONE_POST_FAILURE = 'LOAD_ONE_POST_FAILURE'

export const UP_LOAD_POST_REQUEST = 'UP_LOAD_POST_REQUEST'
export const UP_LOAD_POST_SUCCESS = 'UP_LOAD_POST_SUCCESS'
export const UP_LOAD_POST_FAILURE = 'UP_LOAD_POST_FAILURE'

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'

export const SEARCH_HASHTAG_REQUEST = 'SEARCH_HASHTAG_REQUEST'
export const SEARCH_HASHTAG_SUCCESS = 'SEARCH_HASHTAG_SUCCESS'
export const SEARCH_HASHTAG_FAILURE = 'SEARCH_HASHTAG_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UPLOAD_INFO_IMAGES_REQUEST = 'UPLOAD_INFO_IMAGES_REQUEST';
export const UPLOAD_INFO_IMAGES_SUCCESS = 'UPLOAD_INFO_IMAGES_SUCCESS';
export const UPLOAD_INFO_IMAGES_FAILURE = 'UPLOAD_INFO_IMAGES_FAILURE';

////////////////////////////////////////////////////////////////////////////

const initialState = {
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,

    upLoadPostLoading: false,
    upLoadPostDone: false,
    upLoadPostError: null,

    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,

    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,

    searchHashtagsLoading: false,
    searchHashtagsDone: false,
    searchHashtagsError: null,

    infiniteScroll: true,
    mainPosts: [],
    first: true,
    imagePaths: [],
    imageInfoPaths : [],
    onePost: {},
}


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            // 로드
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;

            case LOAD_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.mainPosts = draft.first ? action.data : draft.mainPosts.concat(action.data);
                draft.first = false;
                draft.infiniteScroll = action.data.length === 10;
                break;

            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.loadPostError = action.error;
                break;

            //로드 원
            case LOAD_ONE_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;

            case LOAD_ONE_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.onePost = action.data;
                break;

            case LOAD_ONE_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.loadPostError = action.error;
                break;

            //업로드
            case UP_LOAD_POST_REQUEST:
                draft.upLoadPostLoading = true;
                draft.upLoadPostDone = false;
                draft.upLoadPostError = null;
                break;

            case UP_LOAD_POST_SUCCESS:
                draft.upLoadPostLoading = false;
                draft.upLoadPostDone = true;
                draft.mainPosts.unshift(action.data);
                break;

            case UP_LOAD_POST_FAILURE:
                draft.upLoadPostLoading = false;
                draft.upLoadPostDone = true;
                draft.upLoadPostError = action.error;
                break;

            //삭제
            case DELETE_POST_REQUEST:
                draft.deletePostLoading = true;
                draft.deletePostDone = false;
                draft.deletePostError = null;
                break;

            case DELETE_POST_SUCCESS:
                draft.deletePostLoading = false;
                draft.deletePostDone = true;
                draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data.PostId);
                break;

            case DELETE_POST_FAILURE:
                draft.deletePostLoading = false;
                draft.deletePostDone = true;
                draft.deletePostError = action.error;
                break;

            //해쉬태그
            case SEARCH_HASHTAG_REQUEST:
                draft.searchHashtagsLoading = true;
                draft.searchHashtagsDone = false;
                draft.searchHashtagsError = null;
                break;

            case SEARCH_HASHTAG_SUCCESS:
                draft.searchHashtagsLoading = false;
                draft.searchHashtagsDone = true;
                draft.infiniteScroll = action.data.length === 10;
                draft.mainPosts = action.data;
                break;

            case SEARCH_HASHTAG_FAILURE:
                draft.searchHashtagsLoading = false;
                draft.searchHashtagsDone = true;
                draft.searchHashtagsError = action.error;
                break;

            //업로드 이미지
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;

            case UPLOAD_IMAGES_SUCCESS:
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                draft.imagePaths = action.data
                break;

            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                draft.uploadImagesError = action.error;
                break;

           //업로드 이미지
            case UPLOAD_INFO_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;

            case UPLOAD_INFO_IMAGES_SUCCESS:
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                draft.imageInfoPaths = action.data
                break;

            case UPLOAD_INFO_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                draft.uploadImagesError = action.error;
                break;




        }
    })
}

export default reducer;
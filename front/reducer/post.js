import produce from 'immer'
import faker from 'faker';


export const dummyCardMaking = () => {
    const values = {
        id: faker.random.number(),
        title: faker.random.word(),
        description: faker.random.words(),
        image: faker.image.image(),
        price : Math.floor(Math.random() * 200) * 100 
    }
    return values
}

////////////////////////////////////////////////////////////////////////////

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const UP_LOAD_POST_REQUEST = 'UP_LOAD_POST_REQUEST'
export const UP_LOAD_POST_SUCCESS = 'UP_LOAD_POST_SUCCESS'
export const UP_LOAD_POST_FAILURE = 'UP_LOAD_POST_FAILURE'



////////////////////////////////////////////////////////////////////////////

const initialState = {
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,

    upLoadPostLoading: false,
    upLoadPostDone: false,
    upLoadPostError: null,
   

    mainPosts: [],
    imagePaths: [],
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
                draft.mainPosts = action.data;
                break;

            case LOAD_POST_FAILURE:
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




        }
    })
}

export default reducer;
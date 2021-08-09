import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT
} from '../constants/actionTypes';

// Types
import { CommentsAction } from '../actions/comments';
import { Comment } from '../services/placeholderService';


export interface CommentsState {
  loading: boolean;
  error: string;
  comments: Comment[];
  comment?: Comment
};

const initialState: CommentsState = {
  loading: false,
  error: '',
  comments: []
};

const reducer = (state: CommentsState = initialState, action: CommentsAction) => {
  switch(action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        comments: action.comments
      };

    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        comments: [],
        error: action.error
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          { ...action.comment },
          ...state.comments
        ]
      };

    default:
      return state;
  }
}

export default reducer;

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../constants/actionTypes';

// Types
import { PostAction } from '../actions/posts';
import { Post } from '../services/placeholderService';


export interface PostsState {
  loading: boolean;
  error: string;
  posts: Post[];
};

const initialState: PostsState = {
  loading: false,
  error: '',
  posts: []
};

const postsReducer = (state: PostsState = initialState, action: PostAction) => {
  switch(action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        posts: action.posts
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.error
      };

    default:
      return state;
  }
}

export default postsReducer;

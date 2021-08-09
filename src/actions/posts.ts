import * as types from '../constants/actionTypes';
import PlaceholderService, { Post } from '../services/placeholderService';
import { AppDispatch } from '../store';

export interface PostAction {
  type: string;
  posts?: Post[];
  error?: string;
}

const fetchPostRequest = (): PostAction => ({
  type: types.FETCH_POSTS_REQUEST
});

const fetchPostSuccess = (posts: Post[]): PostAction => ({
  type: types.FETCH_POSTS_SUCCESS,
  posts
});

const fetchPostFailure = (error: string): PostAction => ({
  type: types.FETCH_POSTS_FAILURE,
  error
});

export function fetchPosts() {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(fetchPostRequest());

      const response = await PlaceholderService.fetchPosts();

      if (response.status >= 400) {
        dispatch(fetchPostFailure('Failed to fetch the posts'));
        return;
      }

      dispatch(fetchPostSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostFailure(error.message));
    }
  };
}

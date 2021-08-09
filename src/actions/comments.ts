import * as types from '../constants/actionTypes';
import PlaceholderService, { Comment } from '../services/placeholderService';
import { AppDispatch } from '../store';

export interface CommentsAction {
  type: string;
  comments?: Comment[];
  error?: string;
  comment?: Comment;
}

const fetchCommentRequest = (): CommentsAction => ({
  type: types.FETCH_COMMENTS_REQUEST
});

const fetchCommentSuccess = (comments: Comment[]): CommentsAction => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  comments
});

const fetchCommentFailure = (error: string): CommentsAction => ({
  type: types.FETCH_COMMENTS_FAILURE,
  error
});

export const addComment = (comment: Comment): CommentsAction => ({
  type: types.ADD_COMMENT,
  comment
});

export function fetchComments() {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(fetchCommentRequest());

      const response = await PlaceholderService.fetchComments();

      if (response.status >= 400) {
        dispatch(fetchCommentFailure('Failed to fetch the comments'));
        return;
      }

      dispatch(fetchCommentSuccess(response.data));
    } catch (error) {
      dispatch(fetchCommentFailure(error.message));
    }
  };
}

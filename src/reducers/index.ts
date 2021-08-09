import { combineReducers } from 'redux';
import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({
  posts,
  comments
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

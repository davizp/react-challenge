// Libraries
import React, { ReactElement, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { RootState } from '../store';

// Components
import PostList from '../components/PostList';

// Redux
import { fetchPosts } from '../actions/posts';
import { fetchComments } from '../actions/comments';
import { CommentsState } from '../reducers/comments';
import { PostsState } from '../reducers/posts';

interface StateProps {
  posts: PostsState,
  comments: CommentsState
};

interface DispatchProps {
  fetchPosts: () => void,
  fetchComments: () => void,
};

type Props = DispatchProps & StateProps;

const useStyles = makeStyles({
  wrapper: {
    padding: 30
  }
});

function HomePage(props: Props): ReactElement {
  const classes = useStyles();

  useEffect(() => {
    props.fetchPosts();
    props.fetchComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h3" component="h2">
        Posts
      </Typography>

      <PostList postsState={props.posts} />
    </div>
  );
}

const mapStateToProps = (state: RootState | any): StateProps => ({
  posts: state.posts,
  comments: state.comments
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    fetchPosts: (): void => {
      dispatch(fetchPosts());
    },
    fetchComments: (): void => {
      dispatch(fetchComments());
    }
  };
};


export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(HomePage);

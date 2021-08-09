import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

// React Components
import Comment from './Comment';

// Redux
import { CommentsState } from '../reducers/comments';

// Types
import { Comment as CommentType } from '../services/placeholderService';

interface StateProps {
  comments: CommentsState;
}

interface OwnProps {
  postId: string;
}

type Props = StateProps & OwnProps;

interface IndexedCommentsByPostId {
  [key: string]: CommentType[];
}

function CommentList(props: Props) {
  const { loading, error, comments } = props.comments;
  const [indexedCommentsByPostId, setIndexedCommentsByPostId] = useState<IndexedCommentsByPostId>({});

  useEffect(() => {
    const indexedComments = getIndexedCommentsByPostId(comments);

    setIndexedCommentsByPostId(indexedComments);
  }, [comments]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const commentsByIndex = indexedCommentsByPostId[props.postId] || [];

  return (
    <>
      {commentsByIndex.map((comment: CommentType) => {
        return <Comment key={`comment-${comment.id}`} name={comment.name} body={comment.body} />;
      })}
    </>
  );
}

function getIndexedCommentsByPostId(comments: CommentType[]): IndexedCommentsByPostId {
  const initialValue: IndexedCommentsByPostId = {};

  return comments.reduce((acc, comment) => {
    const postIdFound = acc[comment.postId];

    if (!postIdFound) {
      acc[comment.postId] = [];
    }

    acc[comment.postId].push(comment);

    return acc;
  }, initialValue);
}

const mapStateToProps = (state: RootState | any): StateProps => ({
  comments: state.comments
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps, {})(CommentList);

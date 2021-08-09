import React from 'react';

// React Components
import Post from './Post';

// Redux
import { PostsState } from '../reducers/posts';

// Types
import { Post as PostType } from '../services/placeholderService';

interface Props {
  postsState: PostsState;
}

function PostList(props: Props) {
  const { loading, error, posts } = props.postsState;

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {posts.map((post: PostType) => (
        <Post key={`post-${post.id}`} id={post.id} title={post.title} body={post.body} comments={[]} />
      ))}
    </>
  );
}

export default PostList;

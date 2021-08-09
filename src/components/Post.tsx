import React, { useState } from 'react';
import { Grid, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

// Components
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';

interface Props {
  id: string;
  title: string;
  body: string;
  comments: Comment[]
}

const useStyles = makeStyles({
  wrapper: {
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  body: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  expandMoreIcon: {
    paddingRight: '.5rem'
  }
});

function Post(props: Props) {
  const { id, title, body } = props;
  const classes = useStyles();
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);

  function toggleComments(): void {
    setShowComments(!showComments);
  }

  function handleReply() {
    setShowAddComment(!showAddComment);
  }

  return (
    <Paper className={classes.wrapper} elevation={4}>
      <Typography variant="h6" component="h3" data-testid="title">
        {title}
      </Typography>

      <Typography className={classes.body} data-testid="content">
        {body}
      </Typography>

      <Grid container justifyContent="space-between">
        <Grid item>
          <Button>Like</Button>
          <Button onClick={handleReply}>Reply</Button>
        </Grid>

        <Grid item>
          <Button onClick={toggleComments}>
            {showComments
              ? <ExpandLess className={classes.expandMoreIcon} />
              : <ExpandMore className={classes.expandMoreIcon} />
            } View Comments
          </Button>
        </Grid>
      </Grid>

      {showAddComment && <AddCommentForm postId={id} />}
      {showComments && <CommentList postId={id} />}
    </Paper>
  );
}

export default Post;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, OutlinedInput, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { addComment } from '../actions/comments';

// Types
import { Comment } from '../services/placeholderService';

interface DispatchProps {
  addComment: (comment: Comment) => void;
}

interface OwnProps {
  postId: string;
}

type Props = OwnProps & DispatchProps;

const useStyles = makeStyles({
  wrapper: {
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: 4,
  },
  input: {
    width: '100%',
  },
  alignRight: {
    textAlign: 'right',
  },
});

function AddComment(props: Props) {
  const classes = useStyles();
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (comment && error) {
      setError(false);
    }

    setComment(value);
  }

  function submitComment(): void {
    const randomNumber: number = Math.ceil(Math.random() * 100000);

    const newComment: Comment = {
      postId: props.postId as string,
      id: randomNumber,
      name: 'John Doe',
      email: `dummy${randomNumber}@test.com`,
      body: comment
    };

    if (!comment) {
      return setError(true);
    }

    props.addComment(newComment);

    setComment('');
  }

  return (
    <Grid container className={classes.wrapper} spacing={2}>
      <Grid item xs={12}>
        <OutlinedInput
          className={classes.input}
          placeholder="Write a comment"
          onChange={handleChange}
          value={comment}
          error={error}
        />
        {error && <FormHelperText>Comment must not be empty.</FormHelperText>}
      </Grid>
      <Grid item className={classes.alignRight} xs={12}>
        <Button variant="contained" color="primary" onClick={submitComment}>Post Comment</Button>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    addComment: (comment: Comment): void => {
      dispatch(addComment(comment));
    }
  };
};

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(AddComment);

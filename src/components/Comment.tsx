import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  name: string;
  body: string;
}

const useStyles = makeStyles({
  wrapper: {
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: '#ccc',
    borderRadius: 4,
  },
  bold: {
    fontWeight: 'bold'
  }
});

interface Props {
  name: string;
  body: string;
}

function Comment(props: Props) {
  const { name, body } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography
        className={classes.bold}
        variant="subtitle1"
        component="h4"
        data-testid="name"
      >
        {name}
      </Typography>

      <Typography data-testid="content">{body}</Typography>

      <Button>Like</Button>
      <Button>Reply</Button>
    </div>
  );
}

export default Comment;

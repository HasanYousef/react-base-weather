import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: 60,
  },
});

const WelcomeHeader = (props) => {
  const classes = useStyles();

  let welcomeString;
  const curHr = (new Date()).getHours()

  if (curHr < 12) {
    welcomeString = "Good morning sir!";
  } else if (curHr < 18) {
    welcomeString = "Good afternoon sir!";
  } else {
    welcomeString = "Good evening sir!";
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">{welcomeString}</Typography>
    </div>
  );
};

export default WelcomeHeader;

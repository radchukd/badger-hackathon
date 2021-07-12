import React from 'react';
import { MobxRouter } from 'mobx-router';
import { makeStyles } from '@material-ui/core';
import store from './mobx/store';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    maxWidth: '100%',
    paddingTop: theme.spacing(2),
    minHeight: '100vh',
    backgroundColor: '#292929',
    color: '#Ccd6db',
  },
}));

export default function App(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <MobxRouter store={store} />
    </div>
  );
}

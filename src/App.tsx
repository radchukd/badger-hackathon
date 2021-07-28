import { MobxRouter } from 'mobx-router';
import React from 'react';

import { makeStyles } from '@material-ui/core';

import { rootStore } from './mobx/rootStore';

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
      <MobxRouter store={rootStore} />
    </div>
  );
}

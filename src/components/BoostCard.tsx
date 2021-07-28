import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import { formatNumber } from '../utils/numberUtils';

const useStyles = makeStyles((theme) => ({
  rank: {
    marginTop: theme.spacing(2),
    fontSize: '16px',
    lineHeight: '28px',
  },
}));

const BoostCard = observer(() => {
  const classes = { ...useStyles(), ...useCardStyles() };
  const store = React.useContext(StoreContext);
  const {
    accountStore: { account },
  } = store;

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={clsx(classes.content, classes.centeredContent)}>
        <Typography className={classes.cardHeading1}>{formatNumber(account?.boost, 'decimal')}</Typography>
        <Typography className={classes.cardSubheading1}>My Boost</Typography>
        <Typography className={classes.rank}>Rank No. {account?.boostRank}</Typography>
      </CardContent>
    </Card>
  );
});

export default BoostCard;

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import useCardStyles from '../styles/cardStyles';
import { StoreContext } from '..';
import { formatNumber } from '../utils/numberUtils';

const useStyles = makeStyles((theme) => ({
  claimButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

const PendingCard = observer(() => {
  const classes = { ...useStyles(), ...useCardStyles() };
  const store = useContext(StoreContext);
  const { account, totalClaimable } = store;
  const canClaim = !!account?.claimableBalances.length;

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={clsx(classes.content, classes.centeredContent)}>
        <Typography className={classes.heading}>{formatNumber(totalClaimable, 'currency')}</Typography>
        <Typography className={classes.boostSubheading}>Pending</Typography>
        <Button variant="contained" color="primary" className={classes.claimButton} disabled={!canClaim}>
          Claim all pending {canClaim ? `(${account?.claimableBalances.length})` : ''}
        </Button>
      </CardContent>
    </Card>
  );
});

export default PendingCard;

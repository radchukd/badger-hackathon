import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import { formatNumber } from '../utils/numberUtils';

const useStyles = makeStyles((theme) => ({
  claimButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

const PendingCard = observer(() => {
  const classes = { ...useStyles(), ...useCardStyles() };
  const store = React.useContext(StoreContext);
  const {
    accountStore: { account, totalClaimable },
  } = store;
  const canClaim = !!account?.claimableBalances.length;

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={clsx(classes.content, classes.centeredContent)}>
        <Typography className={classes.cardHeading1}>{formatNumber(totalClaimable, 'currency')}</Typography>
        <Typography className={classes.cardSubheading1}>Pending</Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.claimButton}
          disabled={!canClaim}
          data-testid="pending-card-claim-button"
        >
          Claim all pending {canClaim ? `(${account?.claimableBalances.length})` : ''}
        </Button>
      </CardContent>
    </Card>
  );
});

export default PendingCard;

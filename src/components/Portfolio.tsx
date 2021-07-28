import { observer } from 'mobx-react-lite';
import React from 'react';

import { Box, Button, CircularProgress, Grid, makeStyles, Modal, useMediaQuery } from '@material-ui/core';

import { StoreContext } from '../mobx/rootStore';
import useGlobalStyles from '../styles/globalStyles';
import { formatNumber } from '../utils/numberUtils';
import AllocationCard from './AllocationCard';
import BalanceTableCard from './BalanceTableCard';
import BoostCard from './BoostCard';
import EarningsGraphCard from './EarningsGraphCard';
import NetWorthCard from './NetWorthCard';
import PendingCard from './PendingCard';
import StrategyBalancesModal from './StrategyBalancesModal';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    height: '100%',
    padding: `${theme.spacing(6)}px ${theme.spacing(2)}px`,
    background: `url('assets/background.png') no-repeat center center fixed`,
  },
  content: {
    margin: 'auto',
    maxWidth: '80%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  boostButton: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Portfolio = observer(() => {
  const classes = { ...useStyles(), ...useGlobalStyles() };
  const isMobile = useMediaQuery('(max-width: 767px)');
  const store = React.useContext(StoreContext);
  const {
    accountStore: {
      account,
      isLoading,
      assetValue,
      assetValueBTC,
      allocationDistribution,
      allocationPerAsset,
      totalAllocation,
      strategyROI,
    },
    portfolioStore: { selectedVault, setSelectedVault },
  } = store;

  if (isLoading) {
    return (
      <Box className={classes.rootContainer}>
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <CircularProgress color="secondary" data-testid="portfolio-loading-spinner" />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.rootContainer}>
      <Modal
        open={Boolean(selectedVault)}
        onClose={() => setSelectedVault(undefined)}
        className={classes.modal}
        BackdropProps={
          {
            'data-testid': 'portfolio-strategy-balances-modal-backdrop',
          } as any
        }
        data-testid="portfolio-strategy-balances-modal"
      >
        <div className={classes.modalContent}>
          <StrategyBalancesModal onClose={() => setSelectedVault(undefined)} />
        </div>
      </Modal>
      <Box className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <NetWorthCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PendingCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BoostCard />
          </Grid>
          <Grid item xs={12}>
            <Box mt={5}>
              <Box mb={2} display="flex" alignItems="center" justifyContent={isMobile ? 'space-between' : 'flex-start'}>
                <Box mr={2}>
                  <Button variant="contained" color="primary">
                    My Dashboard
                  </Button>
                </Box>
                <Box>
                  <Button variant="contained" color="primary" className={classes.boostButton}>
                    My Badger Boost
                  </Button>
                </Box>
              </Box>
              <EarningsGraphCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AllocationCard title="Asset Allocation" subtitle="Subtext" data={allocationDistribution('balance')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AllocationCard title="Strategy Allocation" subtitle="Subtext" data={allocationDistribution('strategy')} />
          </Grid>
          <Grid item xs={12}>
            <BalanceTableCard
              title="Asset Balances"
              title2={formatNumber(totalAllocation(false, 'balance'), 'currency')}
              subtitle1="Assets that are in your wallet"
              subtitle2="Your total asset holdings"
              headCells={[
                { value: 'Tokens', align: 'left' },
                { value: 'Portfolio % Alloc.', align: 'center' },
                { value: 'Price', align: 'right' },
                { value: 'Balance', align: 'right' },
              ]}
              bodyCells={
                account?.balances?.map((balance) => [
                  {
                    value: [balance.asset, formatNumber(balance.value, 'currency')],
                    align: 'left',
                  },
                  {
                    value: formatNumber(allocationPerAsset(balance.value, 'balance'), 'percent'),
                    align: 'center',
                  },
                  {
                    value: [
                      formatNumber(assetValue(balance), 'currency'),
                      `${formatNumber(assetValueBTC(balance), 'decimal', 5)} BTC`,
                    ],
                    align: 'right',
                  },
                  {
                    value: [formatNumber(balance.balance, 'currency'), formatNumber(balance.value, 'currency')],
                    align: 'right',
                  },
                ]) ?? []
              }
            />
          </Grid>
          <Grid item xs={12}>
            <BalanceTableCard
              title="Strategy Balances"
              title2={formatNumber(totalAllocation(false, 'strategy'), 'currency')}
              subtitle1="Balances across all strategies"
              subtitle2="Your total strategy balances"
              headCells={[
                { value: 'Strategy', align: 'left' },
                { value: 'Portfolio % Alloc.', align: 'center' },
                { value: 'Yearly ROI', align: 'center' },
                { value: 'Deposit Balance', align: 'right' },
              ]}
              bodyCells={
                account?.balances?.map((balance) => [
                  {
                    value: [balance.name, formatNumber(balance.earnedValue, 'currency')],
                    align: 'left',
                  },
                  {
                    value: formatNumber(allocationPerAsset(balance.earnedValue, 'strategy'), 'percent'),
                    align: 'center',
                  },
                  {
                    value: formatNumber(strategyROI(balance.asset) / 100, 'percent'),
                    valueColor: 'info.main',
                    align: 'center',
                  },
                  {
                    value: [
                      formatNumber(balance.earnedBalance, 'decimal'),
                      formatNumber(balance.earnedValue, 'currency'),
                    ],
                    align: 'right',
                  },
                ]) ?? []
              }
              onRowClick={(row) => {
                setSelectedVault((row[0].value as [string, string])[0]);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default Portfolio;

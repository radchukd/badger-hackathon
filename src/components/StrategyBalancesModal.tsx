import React from 'react';

import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import useGlobalStyles from '../styles/globalStyles';
import Table from './Table';
import VaultListItem from './VaultListItem';

const useStyles = makeStyles((/* theme */) => ({
  closeIcon: {
    color: '#cccccc',
  },
}));

export interface IStrategyBalancesModal {
  onClose: () => void;
}

const StrategyBalancesModal: React.FC<IStrategyBalancesModal> = ({ onClose }) => {
  const classes = { ...useStyles(), ...useCardStyles(), ...useGlobalStyles() };
  const store = React.useContext(StoreContext);
  const {
    portfolioStore: { selectedVault },
  } = store;

  if (!selectedVault) return <Box />;

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">My Strategy Balances</Typography>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" color="secondary" className={classes.closeIcon} />
        </IconButton>
      </Box>
      <Divider className={classes.divider} />
      <Box mt={4} mb={2} className={classes.cardSubheading4}>
        Vault Details
      </Box>
      <Box bgcolor="#1E1E1E">
        <Table
          headCells={[
            { value: 'VAULT', align: 'left' },
            { value: 'BALANCE/VALUE', align: 'center' },
            { value: 'MY BOOST', align: 'center' },
            { value: 'YEARLY ROI', align: 'center' },
          ]}
          bodyCells={[
            [
              {
                valueComponent: <VaultListItem vault={selectedVault} />,
              },
              { value: ['0.00523 UNIV2 LP', '$ 20,498.00'], align: 'center' },
              { value: '48.33%', align: 'center', valueColor: 'info.main' },
              { value: '36.44-55.33%', align: 'center' },
            ],
          ]}
        />
      </Box>
      <Box mt={4} mb={2} className={classes.cardSubheading4}>
        Holdings
      </Box>
      <Box>
        <Table
          headCells={[
            { value: 'Underlying Tokens', align: 'left' },
            { value: 'Price', align: 'center' },
            { value: 'Amount', align: 'center' },
            { value: 'Balance', align: 'center' },
          ]}
          bodyCells={[
            [
              {
                valueComponent: (
                  <Box display="flex">
                    <Box mr={2} className={classes.avatarSmall} />
                    <Box>Badger</Box>
                  </Box>
                ),
              },
              { value: '14.2', align: 'center' },
              { value: '10.2', align: 'center' },
              { value: '$ 10,249.00', align: 'center' },
            ],
            [
              {
                valueComponent: (
                  <Box color="text.secondary" className={classes.cardSubheading2}>
                    Total
                  </Box>
                ),
                colSpan: 3,
                align: 'left',
              },
              {
                valueComponent: (
                  <Box fontWeight="bold" className={classes.cardSubheading4}>
                    $ 20,498.00
                  </Box>
                ),
                align: 'center',
              },
            ],
          ]}
        />
      </Box>
      <Box mt={4} mb={2} className={classes.cardSubheading4}>
        My Boost Breakdown
      </Box>
      <Table
        bodyCells={[
          [
            {
              valueComponent: (
                <Box display="flex">
                  <Box mr={2} className={classes.avatarSmall} />
                  <Box>Wack-A-Badger</Box>
                </Box>
              ),
            },
            {
              value: '+20%',
              align: 'right',
              valueColor: 'info.main',
            },
          ],
        ]}
      />
      <Box mt={4} mb={2} className={classes.cardSubheading4}>
        Transaction History
      </Box>
      <Box>
        <Table
          headCells={[
            { value: 'Actions', align: 'left' },
            { value: 'Amount', align: 'center' },
            { value: 'Gas spent', align: 'center' },
            { value: 'Date', align: 'center' },
          ]}
          bodyCells={[
            [
              { value: 'Deposit', align: 'left', valueColor: 'info.main' },
              { value: '+0.00523 UNIV2 LP', align: 'center' },
              { value: '0.00512 ETH', align: 'center' },
              { value: '30 May,2020 11:11 PM', align: 'center' },
            ],
            [
              { value: 'Deposit', align: 'left', valueColor: 'info.main' },
              { value: '+0.00523 UNIV2 LP', align: 'center' },
              { value: '0.00512 ETH', align: 'center' },
              { value: '30 May,2020 11:11 PM', align: 'center' },
            ],
          ]}
        />
      </Box>
    </Box>
  );
};

export default StrategyBalancesModal;

import React from 'react';

import { Box, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import useGlobalStyles from '../styles/globalStyles';
import Table from './Table';
import VaultListItem from './VaultListItem';

const useStyles = makeStyles((/* theme */) => ({
  vaultItemWhite: {
    color: '#ffffff',
  },
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
      <Box mt={4} mb={2} ml={1} className={classes.cardSubheading4}>
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
                valueComponent: <VaultListItem vault={selectedVault} className={classes.vaultItemWhite} />,
              },
              { value: ['0.00523 UNIV2 LP', '$ 20,498.00'], align: 'center' },
              { value: '48.33%', align: 'center', valueColor: 'info.main' },
              { value: '36.44-55.33%', align: 'center' },
            ],
          ]}
          variant="dark"
        />
      </Box>
      <Box mt={4} mb={2} ml={1} className={classes.cardSubheading4}>
        Holdings
      </Box>
      <Box>
        <Table
          headCells={[
            { value: 'Tokens', align: 'left' },
            { value: 'Price', align: 'center' },
            { value: 'Amount', align: 'center' },
            { value: 'Balance', align: 'right' },
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
              { value: '$ 10,249.00', align: 'right' },
            ],
            [
              {
                valueComponent: (
                  <Box display="flex">
                    <Box mr={2} className={classes.avatarSmall} />
                    <Box>wBTC</Box>
                  </Box>
                ),
              },
              { value: '36,040.00', align: 'center' },
              { value: '0.004', align: 'center' },
              { value: '$ 10,249.00', align: 'right' },
            ],
          ]}
          variant="dark"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box color="text.secondary" bgcolor="transparent" className={classes.cardSubheading2}>
            Total
          </Box>
          <Box mr={4} fontWeight="bold" bgcolor="transparent!important" className={classes.cardSubheading4}>
            $ 20,498.00
          </Box>
        </Box>
      </Box>
      <Box mt={4} mb={2} ml={1} className={classes.cardSubheading4}>
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
          [
            {
              valueComponent: (
                <Box display="flex">
                  <Box mr={2} className={classes.avatarSmall} />
                  <Box>Badgerpack Joyride</Box>
                </Box>
              ),
            },
            {
              value: '+11%',
              align: 'right',
              valueColor: 'info.main',
            },
          ],
        ]}
        variant="dark"
      />
      <Box mt={4} mb={2} ml={1} className={classes.cardSubheading4}>
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
              { value: 'Withdraw', align: 'left', valueColor: 'warning.main' },
              { value: '-0.00523 UNIV2 LP', align: 'center' },
              { value: '0.00512 ETH', align: 'center' },
              { value: '30 May,2020 11:11 PM', align: 'center' },
            ],
          ]}
          variant="dark"
        />
      </Box>
    </Box>
  );
};

export default StrategyBalancesModal;

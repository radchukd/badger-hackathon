import { observer } from 'mobx-react-lite';
import React from 'react';

import { Box, Chip, ListItem, makeStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import { Vault } from '../mobx/portfolioStore';

const useStyles = makeStyles((theme) => ({
  vaultItem: {
    marginTop: theme.spacing(1) / 2,
    marginBottom: theme.spacing(1) / 2,
    padding: theme.spacing(1) / 2,
    paddingRight: theme.spacing(2),
    borderRadius: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
  selectedVaultItem: {
    '&.Mui-selected': {
      backgroundColor: '#333333',
    },
  },
  vaultName: {
    color: theme.palette.primary.light,
  },
  vaultChip: {
    fontSize: '10px',
    lineHeight: '12px',
    color: '#FFFFFF',
    marginLeft: theme.spacing(1) / 2,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.spacing(1) / 2,
  },
}));

export interface IVaultListItem {
  vault: Vault;
  isButton?: boolean;
  onItemClick?: (value: Vault) => void;
  isItemChecked?: boolean;
}

const VaultListItem = observer(({ vault, isButton, onItemClick, isItemChecked }: IVaultListItem) => {
  const classes = { ...useStyles() };

  const getVaultIcon = (vault: string): JSX.Element => {
    if (isItemChecked) return <Check />;

    let iconPath = '';

    switch (vault) {
      case 'wBTC/Digg':
        iconPath = 'DIGG-WBTC.png';
        break;
      case 'Badger/wBTC':
        iconPath = 'BADGER-WBTC.png';
        break;
      case 'Wrapped BTC/Digg':
        iconPath = 'SLP-DIGG-WBTC.png';
        break;
      case 'Wrapped BTC/Badger':
        iconPath = 'SLP-BADGER-WBTC.png';
        break;
      case 'Wrapped BTC/Wrapped Ether':
        iconPath = 'SLP-WBTC-ETH.png';
        break;
      case 'crvRenWBTC':
      case 'renBTC/wBTC/sBTC':
      case 'tBTC/sBTCCrv LP':
      case 'crvRenWBTC':
      default:
        iconPath = 'UNI-WBTC-DIGG.png';
    }

    return <img src={`/assets/${iconPath}`} width="24" height="24" />;
  };

  return (
    <ListItem
      button={isButton as any}
      className={classes.vaultItem}
      onClick={() => onItemClick && onItemClick(vault)}
      selected={isItemChecked}
      classes={{ selected: classes.selectedVaultItem }}
      data-testid="vault-selector-vault-list-item"
    >
      <Box mr={1}>{getVaultIcon(vault.value)}</Box>
      <Box className={classes.vaultName}>{vault.value}</Box>
      {vault.tags.map((label, labelIndex) => (
        <Chip key={labelIndex} size="small" label={label} className={classes.vaultChip} />
      ))}
    </ListItem>
  );
});

export default VaultListItem;

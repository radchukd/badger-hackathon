import clsx from 'clsx';
import React from 'react';

import { Box, Chip, ListItem, ListItemIcon, ListItemProps, makeStyles } from '@material-ui/core';
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
    color: theme.palette.primary.light,
  },
  selectedVaultItem: {
    '&.Mui-selected': {
      color: theme.palette.info.main,
      backgroundColor: '#333333',
    },
  },
  vaultIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(1),
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

export interface IVaultListItem extends ListItemProps {
  vault: Vault;
  isButton?: boolean;
  onItemClick?: (value: Vault) => void;
  isItemChecked?: boolean;
}

const VaultListItem = React.forwardRef<HTMLLIElement, IVaultListItem>(
  ({ vault, isButton, onItemClick, isItemChecked, className, ...props }, ref) => {
    const classes = { ...useStyles() };

    const getVaultIcon = (vault: string): JSX.Element => {
      if (isItemChecked) return <Check color="secondary" />;

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
        ref={ref}
        button={isButton as any}
        className={clsx(classes.vaultItem, className)}
        onClick={() => onItemClick && onItemClick(vault)}
        selected={isItemChecked}
        classes={{ selected: classes.selectedVaultItem }}
        {...props}
        data-testid="vault-selector-vault-list-item"
      >
        <ListItemIcon className={classes.vaultIcon}>{getVaultIcon(vault.value)}</ListItemIcon>
        <Box>{vault.value}</Box>
        {vault.tags.map((label, labelIndex) => (
          <Chip key={labelIndex} size="small" label={label} className={classes.vaultChip} />
        ))}
      </ListItem>
    );
  },
);

export default VaultListItem;

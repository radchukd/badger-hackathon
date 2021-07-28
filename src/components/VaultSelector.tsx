import { observer } from 'mobx-react-lite';
import React from 'react';

import { Box, Checkbox, FormControlLabel, IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { Vault } from '../mobx/portfolioStore';
import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import useGlobalStyles from '../styles/globalStyles';
import VaultListItem from './VaultListItem';

const useStyles = makeStyles((theme) => ({
  dropdownContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  closeIcon: {
    color: theme.palette.primary.light,
  },
}));

export interface IVaultSelector {
  onClose: () => void;
}

const VaultSelector = observer(({ onClose }: IVaultSelector) => {
  const classes = { ...useStyles(), ...useCardStyles(), ...useGlobalStyles() };
  const store = React.useContext(StoreContext);
  const {
    portfolioStore: { vaults, areAllSelected, onAllClick, onVaultClick, isVaultSelected },
  } = store;

  return (
    <Box className={classes.dropdownContainer} data-testid="vault-selector-container">
      <Box display="flex" justifyContent="space-between">
        <Box ml={1}>
          <FormControlLabel
            control={
              <Checkbox
                name="allSettVaultsCheckbox"
                checked={areAllSelected}
                onClick={onAllClick}
                data-testid="vault-selector-vault-all-checkbox"
              />
            }
            label="All Sett Vaults"
          />
        </Box>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" className={classes.closeIcon} />
        </IconButton>
      </Box>
      <Box display="flex" flexWrap="wrap" className={classes.boxGap}>
        {vaults.map((subvaults, subVaultIndex) => (
          <Box key={subVaultIndex} display="flex" flexDirection="column" flexGrow={1}>
            {subvaults.map((vault, vaultIndex) => (
              <VaultListItem
                key={vaultIndex}
                vault={vault}
                isButton={true}
                onItemClick={(vault: Vault) => onVaultClick(vault)}
                isItemChecked={isVaultSelected(vault)}
                data-testid="vault-selector-vault-list-item"
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default VaultSelector;

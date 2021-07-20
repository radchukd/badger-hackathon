import React from 'react';

import { Box, Checkbox, Chip, FormControlLabel, Grid, IconButton, ListItem, makeStyles } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

import useCardStyles from '../styles/cardStyles';

const useStyles = makeStyles((theme) => ({
  dropdownContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    width: '55vw',
    borderRadius: theme.spacing(1),
  },
  closeIcon: {
    color: theme.palette.primary.light,
  },
  vaultItem: {
    marginTop: theme.spacing(1) / 2,
    marginBottom: theme.spacing(1) / 2,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
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

interface IVaultSelector {
  vaults: Array<Array<{ icon: string; value: string; labels: Array<string> }>>;
  onClose: () => void;
  onAllClick: () => void;
  isAllChecked: boolean;
  onItemClick: (item: string) => void;
  isItemChecked: (item: string) => boolean;
}

const VaultSelector: React.FC<IVaultSelector> = ({
  vaults,
  onClose,
  onAllClick,
  isAllChecked,
  onItemClick,
  isItemChecked,
}) => {
  const classes = { ...useStyles(), ...useCardStyles() };

  return (
    <Box className={classes.dropdownContainer}>
      <Box display="flex" justifyContent="space-between">
        <Box ml={1}>
          <FormControlLabel
            control={<Checkbox name="allSettVaultsCheckbox" checked={isAllChecked} onClick={onAllClick} />}
            label="All Sett Vaults"
          />
        </Box>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" className={classes.closeIcon} />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        {vaults.map((subvaults, subVaultIndex) => (
          <Grid key={subVaultIndex} item xs={12} md={4}>
            <Box display="flex" flexDirection="column">
              {subvaults.map((vault, vaultIndex) => (
                <ListItem
                  key={vaultIndex}
                  button
                  className={classes.vaultItem}
                  onClick={() => onItemClick(vault.value)}
                  selected={isItemChecked(vault.value)}
                  classes={{ selected: classes.selectedVaultItem }}
                >
                  <Box mr={1}>
                    {isItemChecked(vault.value) ? (
                      <Check />
                    ) : (
                      <img src={`/assets/${vault.icon}`} width="24" height="24" />
                    )}
                  </Box>
                  <Box className={classes.vaultName}>{vault.value}</Box>
                  {vault.labels.map((label, labelIndex) => (
                    <Chip key={labelIndex} size="small" label={label} className={classes.vaultChip} />
                  ))}
                </ListItem>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VaultSelector;

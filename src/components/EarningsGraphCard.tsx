import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  Popper,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown, Close, FiberManualRecord } from '@material-ui/icons';

import useCardStyles from '../styles/cardStyles';
import { StoreContext } from '..';

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
    padding: theme.spacing(1),
    paddingLeft: 0,
  },
  vaultName: {
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.primary.light,
  },
}));

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type GraphPeriod = '1D' | '1W' | '1M' | '1Y' | 'All Time';

const graphPeriods: Array<GraphPeriod> = ['1D', '1W', '1M', '1Y', 'All Time'];

const EarningsGraphCard = observer(() => {
  const classes = { ...useStyles(), ...useCardStyles() };
  const store = useContext(StoreContext);
  const { vaults } = store;
  const [vaultsMenuAnchor, setVaultsMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [graphPeriod, setGraphPeriod] = React.useState<GraphPeriod>('1W');
  console.log(vaults, graphPeriod);

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">
              <Box fontWeight="fontWeightRegular">Earnings from Sett vaults</Box>
            </Typography>
            <Box className={classes.earningsSubheading} color="text.secondary">
              Compounding and $BADGER rewards
            </Box>
            <Box mt={2}>
              <Button
                aria-controls="vaults-menu"
                aria-haspopup="true"
                onClick={(event) => setVaultsMenuAnchor(vaultsMenuAnchor ? null : event.currentTarget)}
              >
                All Sett Vaults
                <ArrowDropDown />
              </Button>
            </Box>
            <Popper
              id="vaults-menu"
              open={Boolean(vaultsMenuAnchor)}
              anchorEl={vaultsMenuAnchor}
              placement="top-start"
              keepMounted
            >
              <Box className={classes.dropdownContainer}>
                <Box display="flex" justifyContent="space-between">
                  <FormControlLabel control={<Checkbox name="allSettVaultsCheckbox" />} label="All Sett Vaults" />
                  <IconButton onClick={() => setVaultsMenuAnchor(null)}>
                    <Close className={classes.closeIcon} />
                  </IconButton>
                </Box>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column">
                      {['DIGG-WBTC.png', 'BADGER-WBTC.png'].map((asset, index) => (
                        <ListItem key={index} button className={classes.vaultItem}>
                          <Box mr={1}>
                            <img src={`/assets/${asset}`} width="24" height="24" />
                          </Box>
                          <ListItemText primary={asset} primaryTypographyProps={{ className: classes.vaultName }} />
                        </ListItem>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column">
                      {['SLP-DIGG-WBTC.png', 'SLP-BADGER-WBTC.png', 'SLP-WBTC-ETH.png'].map((asset, index) => (
                        <ListItem key={index} button className={classes.vaultItem}>
                          <Box mr={1}>
                            <img src={`/assets/${asset}`} width="24" height="24" />
                          </Box>
                          <ListItemText primary={asset} primaryTypographyProps={{ className: classes.vaultName }} />
                        </ListItem>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column">
                      {['UNI-WBTC-DIGG.png', 'UNI-WBTC-DIGG.png', 'UNI-WBTC-DIGG.png', 'UNI-WBTC-DIGG.png'].map(
                        (asset, index) => (
                          <ListItem key={index} button className={classes.vaultItem}>
                            <Box mr={1}>
                              <img src={`/assets/${asset}`} width="24" height="24" />
                            </Box>
                            <ListItemText primary={asset} primaryTypographyProps={{ className: classes.vaultName }} />
                          </ListItem>
                        ),
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Popper>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="h6">
              <Box fontWeight="fontWeightRegular" color="info.main">
                $1,434.66
              </Box>
            </Typography>
            <Box className={classes.earningsSubheading}>271.14 $BADGER</Box>
            <Box mt={2}>
              <ButtonGroup>
                {graphPeriods.map((value, index) => (
                  <Button key={index} onClick={() => setGraphPeriod(value)}>
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
        <Box mt={2}>
          <ResponsiveContainer width="100%" height={465}>
            <AreaChart
              height={465}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" style={{ gap: '16px' }}>
              <Box display="flex" alignItems="center" className={classes.earningsSubheading}>
                <FiberManualRecord style={{ fontSize: '8px' }} />
                <Box ml={1}>crvRenWBTC</Box>
              </Box>
              <Box display="flex" alignItems="center" className={classes.earningsSubheading}>
                <FiberManualRecord style={{ fontSize: '8px' }} />
                <Box ml={1}>BADGER/WBTC</Box>
              </Box>
            </Box>
            <Box className={classes.earningsSubheading} color="text.secondary">
              Data as of :29 May, 2021 11:39 PM
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

export default EarningsGraphCard;

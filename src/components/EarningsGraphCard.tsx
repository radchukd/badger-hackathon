import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  makeStyles,
  Popper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Cached, ExpandMore, FiberManualRecord } from '@material-ui/icons';

import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import useGlobalStyles from '../styles/globalStyles';
import { formatNumber } from '../utils/numberUtils';
import VaultSelector from './VaultSelector';

const useStyles = makeStyles((theme) => ({
  periodButton: {
    color: theme.palette.primary.light,
    fontWeight: 'normal',
  },
  normalCaseButton: {
    textTransform: 'none',
  },
  normalPeriodButton: {
    backgroundColor: theme.palette.background.paper,
  },
  selectedPeriodButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  chartContainer: {
    overflowX: 'auto',
    backgroundColor: '#101010',
  },
  refreshIcon: {
    marginRight: theme.spacing(1),
    fontSize: '14px',
    fill: '#444444',
  },
  assetIcon: {
    fontSize: '8px',
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
  const classes = { ...useStyles(), ...useCardStyles(), ...useGlobalStyles() };
  const isMobile = useMediaQuery('(max-width: 767px)');
  const store = React.useContext(StoreContext);
  const {
    accountStore: { account, lastUpdate, earnedBadger },
  } = store;
  const [vaultsMenuAnchor, setVaultsMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [graphPeriod, setGraphPeriod] = React.useState<GraphPeriod>('1W');

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.content}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={isMobile ? 'column' : 'row'}
          className={classes.boxGap}
        >
          <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-start'}>
            <Typography variant="h6">
              <Box fontWeight="fontWeightRegular">Earnings from Sett vaults</Box>
            </Typography>
            <Box className={classes.cardSubheading2} color="text.secondary">
              Compounding and $BADGER rewards
            </Box>
            <Box mt={2}>
              <Button
                aria-controls="vaults-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                className={clsx(classes.cardSubheading2, classes.normalCaseButton)}
                onClick={(event) => setVaultsMenuAnchor(vaultsMenuAnchor ? null : event.currentTarget)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  data-testid="earnings-graph-card-dropdown-button"
                >
                  All Sett Vaults
                  <ExpandMore fontSize="small" />
                </Box>
              </Button>
            </Box>
            <Popper
              id="vaults-menu"
              open={Boolean(vaultsMenuAnchor)}
              anchorEl={vaultsMenuAnchor}
              placement="bottom-start"
              keepMounted
            >
              <VaultSelector onClose={() => setVaultsMenuAnchor(null)} />
            </Popper>
          </Box>
          <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-end'}>
            <Typography variant="h6">
              <Box
                fontWeight="fontWeightRegular"
                color={(account?.earnedValue ?? -1) < 0 ? 'warning.main' : 'info.main'}
              >
                {formatNumber(account?.earnedValue, 'currency')}
              </Box>
            </Typography>
            <Box className={classes.cardSubheading2} color={earnedBadger < 0 ? 'warning.main' : 'info.main'}>
              {formatNumber(earnedBadger, 'decimal')} $BADGER
            </Box>
            <Box mt={2}>
              <ButtonGroup data-testid="earnings-graph-card-period-group">
                {graphPeriods.map((value, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    color="secondary"
                    className={clsx(
                      classes.periodButton,
                      classes.cardSubheading2,
                      value === graphPeriod ? classes.selectedPeriodButton : classes.normalPeriodButton,
                      value === 'All Time' ? classes.normalCaseButton : undefined,
                    )}
                    onClick={() => setGraphPeriod(value)}
                  >
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
        <Box mt={2}>
          <Box className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height={465} minWidth={600}>
              <AreaChart height={465} data={data}>
                <defs>
                  <linearGradient id="colorUv">
                    <stop offset="0%" stopColor="rgba(70, 125, 51, 0.5)" />
                    <stop offset="100%" stopColor="rgba(154, 255, 119, 0.06)" />
                  </linearGradient>
                  <linearGradient id="colorPv">
                    <stop offset="0%" stopColor="rgba(109, 85, 255, 0.76)" />
                    <stop offset="80.73%" stopColor="rgba(158, 142, 255, 0.06)" />
                  </linearGradient>
                </defs>
                <Tooltip isAnimationActive={false} />
                <Area type="linear" dataKey="uv" stackId="1" stroke="#F2A627" strokeWidth={4} fill="url(#colorUv)" />
                <Area type="linear" dataKey="pv" stackId="1" stroke="#9E8EFF" strokeWidth={4} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" flexDirection={isMobile ? 'column' : 'row'}>
            <Box display="flex" className={classes.boxGap}>
              <Box display="flex" alignItems="center" className={classes.cardSubheading2}>
                <FiberManualRecord className={classes.assetIcon} />
                <Box ml={1}>crvRenWBTC</Box>
              </Box>
              <Box display="flex" alignItems="center" className={classes.cardSubheading2}>
                <FiberManualRecord className={classes.assetIcon} />
                <Box ml={1}>BADGER/WBTC</Box>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Cached className={classes.refreshIcon} />
              <Box className={classes.cardSubheading2} color="text.secondary">
                {lastUpdate?.toLocaleString('en-US')}
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

export default EarningsGraphCard;

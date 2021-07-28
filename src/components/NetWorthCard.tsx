import { observer } from 'mobx-react-lite';
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { Box, Card, CardContent, Divider, makeStyles, Typography, useMediaQuery } from '@material-ui/core';

import { StoreContext } from '../mobx/rootStore';
import useCardStyles from '../styles/cardStyles';
import useGlobalStyles from '../styles/globalStyles';
import { formatNumber } from '../utils/numberUtils';

const useStyles = makeStyles((theme) => ({
  roiline: {
    gap: theme.spacing(5),
  },
  roiSubheading: {
    fontSize: '13px',
    lineHeight: '17px',
    color: theme.palette.text.secondary,
  },
  // https://github.com/recharts/recharts/issues/172#issuecomment-633651459
  netWorthGraphContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
}));

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
];

const NetWorthCard = observer(() => {
  const classes = { ...useStyles(), ...useCardStyles(), ...useGlobalStyles() };
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTabletOrSmaller = useMediaQuery('(max-width: 1280px)');
  const store = React.useContext(StoreContext);
  const {
    accountStore: { account, roiPercentage, earnedBadger },
  } = store;

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.content}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
          <Box display="flex" flexDirection="column" mr={2}>
            <Typography variant="h4">
              <Box fontWeight="fontWeightRegular">{formatNumber(account?.value, 'currency')}</Box>
            </Typography>
            <Typography variant="h6" color="textSecondary">
              <Box fontWeight="fontWeightRegular">Your net worth</Box>
            </Typography>
          </Box>
          <Box className={classes.netWorthGraphContainer}>
            <ResponsiveContainer width="100%" height={75}>
              <AreaChart height={75} data={data}>
                <defs>
                  <linearGradient id="colorUv">
                    <stop offset="0%" stopColor="rgba(70, 125, 51, 0.5)" />
                    <stop offset="100%" stopColor="rgba(154, 255, 119, 0.06)" />
                  </linearGradient>
                </defs>
                <Tooltip isAnimationActive={false} />
                <XAxis dataKey="name" hide={true} />
                <Area
                  type="linear"
                  dataKey="uv"
                  stroke="#52B330"
                  strokeWidth={4}
                  fill="url(#colorUv)"
                  name="Net worth"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'center' : 'flex-start'}
          justifyContent={isTabletOrSmaller ? 'center' : 'flex-start'}
          className={classes.roiline}
        >
          <Box>
            <Box className={classes.cardSubheading3} color={roiPercentage >= 0 ? 'info.main' : 'warning.main'}>
              {formatNumber(roiPercentage, 'percent', 3)}
            </Box>
            <Box className={classes.roiSubheading}>ROI in %</Box>
          </Box>
          <Box>
            <Box className={classes.cardSubheading3}>{formatNumber(account?.earnedValue, 'currency')}</Box>
            <Box className={classes.roiSubheading}>ROI in $ value</Box>
          </Box>
          <Box>
            <Box className={classes.cardSubheading3}>{formatNumber(earnedBadger, 'decimal')}</Box>
            <Box className={classes.roiSubheading}>Earned $Badger</Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

export default NetWorthCard;

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { Box, Card, CardContent, Divider, makeStyles, Typography, useMediaQuery } from '@material-ui/core';

import { StoreContext } from '../';
import useCardStyles from '../styles/cardStyles';
import { formatNumber } from '../utils/numberUtils';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: `${theme.spacing(1)}px -${theme.spacing(2)}px`,
    height: '0.5px',
    backgroundColor: theme.palette.primary.dark,
  },
  roiline: {
    gap: theme.spacing(5),
  },
  roiSubheading: {
    fontSize: '13px',
    lineHeight: '17px',
    color: theme.palette.text.secondary,
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
  const classes = { ...useStyles(), ...useCardStyles() };
  const isMobile = useMediaQuery('(max-width: 767px)');
  const store = useContext(StoreContext);
  const { account, roiPercentage, earnedBadger } = store;
  console.log(isMobile);
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

          <ResponsiveContainer width="100%" height={75}>
            <AreaChart height={75} data={data}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(70, 125, 51, 0.5)" />
                  <stop offset="100%" stopColor="rgba(154, 255, 119, 0.06)" />
                </linearGradient>
              </defs>
              <Tooltip />
              <XAxis dataKey="name" hide={true} />
              <Area type="linear" dataKey="uv" stroke="#52B330" strokeWidth={4} fill="url(#colorUv)" name="Net worth" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Divider className={classes.divider} />
        <Box display="flex" className={classes.roiline}>
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

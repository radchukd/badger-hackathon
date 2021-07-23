import { observer } from 'mobx-react-lite';
import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import useCardStyles from '../styles/cardStyles';
import { formatNumber } from '../utils/numberUtils';

const useStyles = makeStyles((/* theme */) => ({
  otherAvatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#000000',
    borderRadius: '48px',
  },
}));

export interface IAllocationCard {
  title: string;
  subtitle: string;
  data: Array<{ name: string; value: number }>;
}

const AllocationCard = observer(({ title, subtitle, data }: IAllocationCard) => {
  const classes = { ...useStyles(), ...useCardStyles() };
  const isTabletOrSmaller = useMediaQuery('(max-width: 1280px)');

  const COLORS = ['#E8C6A7', '#6F80BB', '#304DB3', '#52B330', '#000000'];

  const getAssetIcon = (name: string): JSX.Element => {
    if (name === 'Other') return <Box className={classes.otherAvatar} />;

    return <img src={`/assets/${name}.png`} width="40" height="40" />;
  };

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.content}>
        <Typography className={classes.cardSubheading4}>{title}</Typography>
        <Typography className={classes.cardSubheading2} color="textSecondary">
          {subtitle}
        </Typography>
        <Box display="flex" flexDirection={isTabletOrSmaller ? 'column' : 'row'} alignItems="center">
          <Box>
            <PieChart width={240} height={240}>
              <Tooltip formatter={(value: number, name: string) => [formatNumber(value, 'percent'), name]} />
              <Pie data={data} cx="50%" cy="50%" stroke="none" fill="#8884d8" dataKey="value">
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Box>
          <Box>
            <List>
              {data.map((entry) => (
                <ListItem key={entry.name} data-testid={`allocation-card-${entry.name}`}>
                  <ListItemAvatar>{getAssetIcon(entry.name)}</ListItemAvatar>
                  <ListItemText
                    primary={entry.name}
                    primaryTypographyProps={{ className: classes.cardSubheading4 }}
                    secondary={formatNumber(entry?.value, 'percent')}
                    secondaryTypographyProps={{ className: classes.cardSubheading2 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

export default AllocationCard;

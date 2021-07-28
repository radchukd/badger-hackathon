import clsx from 'clsx';
import React from 'react';

import { Box, Card, CardContent, makeStyles, Typography, useMediaQuery } from '@material-ui/core';

import useCardStyles from '../styles/cardStyles';
import useGlobalStyles from '../styles/globalStyles';
import Table, { BodyCell, HeadCell } from './Table';

const useStyles = makeStyles((theme) => ({
  contentWithoutPadding: {
    padding: 0,
  },
  headline: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(2),
  },
}));

export interface IBalanceTableCard {
  title: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
  headCells?: Array<HeadCell>;
  bodyCells: Array<Array<BodyCell>>;
  onRowClick?: (row: Array<BodyCell>) => void;
}

const BalanceTableCard: React.FC<IBalanceTableCard> = ({
  title,
  title2,
  subtitle1,
  subtitle2,
  headCells,
  bodyCells,
  onRowClick,
}) => {
  const classes = { ...useStyles(), ...useCardStyles(), ...useGlobalStyles() };
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={clsx(classes.content, classes.contentWithoutPadding)}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={isMobile ? 'column' : 'row'}
          className={clsx(classes.headline, classes.boxGap)}
        >
          <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-start'}>
            <Typography variant="h6">
              <Box fontWeight="fontWeightRegular">{title}</Box>
            </Typography>
            <Box className={classes.cardSubheading3} color="text.secondary">
              {subtitle1}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-end'}>
            <Typography variant="h6">
              <Box color={title2.startsWith('-') ? 'warning.main' : 'info.main'}>{title2}</Box>
            </Typography>
            <Box className={classes.cardSubheading3} color="text.secondary">
              {subtitle2}
            </Box>
          </Box>
        </Box>
        <Table headCells={headCells} bodyCells={bodyCells} onRowClick={onRowClick} />
      </CardContent>
    </Card>
  );
};

export default BalanceTableCard;

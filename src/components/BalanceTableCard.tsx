import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import useCardStyles from '../styles/cardStyles';

const useStyles = makeStyles((theme) => ({
  contentWithoutPadding: {
    padding: 0,
  },
  headline: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(2),
  },
  balanceTable: {
    minWidth: '600px',
  },
  tableHeadRow: {
    '& th:first-child': {
      paddingLeft: theme.spacing(2),
    },
    '& th:last-child': {
      paddingRight: theme.spacing(2),
    },
    '& th': {
      fontSize: '13px',
      lineHeight: '21px',
      color: theme.palette.text.secondary,
      border: 'none',
      padding: theme.spacing(1),
    },
  },
  tableBodyRow: {
    '& td': {
      padding: theme.spacing(1),
      border: 'none',
      fontSize: '16px',
      lineHeight: '24px',
    },
    '& td:first-child': {
      paddingLeft: theme.spacing(2),
    },
    '& td:last-child': {
      paddingRight: theme.spacing(2),
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  cellHeading: {
    fontWeight: 700,
  },
  cellSubheading: {
    color: theme.palette.text.secondary,
  },
}));

interface ICell {
  value: string;
  color?: 'info.main' | 'warning.main';
  align?: 'left' | 'center' | 'right';
}

export interface IBalanceTableCard {
  title: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
  headCells: Array<ICell>;
  bodyCells: Array<Array<ICell | [ICell, ICell]>>;
}

const BalanceTableCard = observer(
  ({ title, title2, subtitle1, subtitle2, headCells, bodyCells }: IBalanceTableCard) => {
    const classes = { ...useStyles(), ...useCardStyles() };
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
      <Card className={classes.cardRoot}>
        <CardContent className={clsx(classes.content, classes.contentWithoutPadding)}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={isMobile ? 'column' : 'row'}
            className={classes.headline}
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
          <TableContainer>
            <Table aria-label="balance table" className={classes.balanceTable}>
              <TableHead>
                <TableRow className={classes.tableHeadRow}>
                  {headCells.map((cell, index) => (
                    <TableCell key={index} align={cell?.align ?? 'center'}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bodyCells.map((row, index) => (
                  <TableRow key={index} className={classes.tableBodyRow}>
                    {row.map((cell, index) =>
                      (cell as ICell)?.value ? (
                        <TableCell key={index} align={(cell as ICell)?.align ?? 'center'}>
                          <Box color={(cell as ICell).color}>{(cell as ICell).value}</Box>
                        </TableCell>
                      ) : (
                        <TableCell key={index}>
                          <Box
                            display="flex"
                            flexDirection="column"
                            textAlign={(cell as [ICell, ICell])[0]?.align ?? 'center'}
                          >
                            <Box className={classes.cellHeading} color={(cell as [ICell, ICell])[0].color}>
                              {(cell as [ICell, ICell])[0].value}
                            </Box>
                            <Box className={classes.cellSubheading} color={(cell as [ICell, ICell])[1].color}>
                              {(cell as [ICell, ICell])[1].value}
                            </Box>
                          </Box>
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  },
);

export default BalanceTableCard;

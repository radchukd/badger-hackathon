import clsx from 'clsx';
import React from 'react';

import {
  Box,
  makeStyles,
  Table as MUITable,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
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
  tableBodyDark: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#1E1E1E',
    },

    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  clickableTableRow: {
    cursor: 'pointer',
  },
  cellHeading: {
    fontWeight: 700,
  },
  cellSubheading: {
    color: theme.palette.text.secondary,
  },
}));

export type CellColor = 'info.main' | 'warning.main';

export interface ICell extends TableCellProps {
  value?: string | [string, string];
  valueColor?: CellColor | [CellColor | null, CellColor | null];
}

export interface HeadCell extends ICell {
  value?: string;
  valueColor?: CellColor;
}

export interface BodyCell extends ICell {
  valueComponent?: JSX.Element;
}

export interface ITable {
  headCells?: Array<HeadCell>;
  bodyCells: Array<Array<BodyCell>>;
  onRowClick?: (row: Array<BodyCell>) => void;
  variant?: 'default' | 'dark';
}

const Table: React.FC<ITable & TableProps> = ({ headCells, bodyCells, variant, onRowClick, ...props }) => {
  const classes = { ...useStyles() };

  const buildCell = (cell: BodyCell, index: number): JSX.Element => {
    const { value, valueColor, valueComponent, ...cellProps } = cell;

    if (valueComponent) {
      return (
        <TableCell key={index} {...cellProps}>
          {valueComponent}
        </TableCell>
      );
    } else if (Array.isArray(value)) {
      return (
        <TableCell key={index} {...cellProps}>
          <Box display="flex" flexDirection="column" textAlign={cell?.align}>
            <Box className={classes.cellHeading} color={valueColor && (valueColor as Array<CellColor>)[0]}>
              {value[0]}
            </Box>
            <Box className={classes.cellSubheading} color={valueColor && (valueColor as Array<CellColor>)[1]}>
              {value[1]}
            </Box>
          </Box>
        </TableCell>
      );
    }

    return (
      <TableCell key={index} {...cellProps}>
        <Box color={valueColor}>{value}</Box>
      </TableCell>
    );
  };

  return (
    <TableContainer>
      <MUITable aria-label="balance table" {...props} className={classes.table}>
        {headCells && (
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {headCells.map((cell, index) => (
                <TableCell key={index} {...(cell as TableCellProps)}>
                  <Box color={cell.valueColor}>{cell.value}</Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {bodyCells.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => (onRowClick ? onRowClick(row) : undefined)}
              className={clsx(
                classes.tableBodyRow,
                variant === 'dark' ? classes.tableBodyDark : undefined,
                onRowClick ? classes.clickableTableRow : undefined,
              )}
            >
              {row.map(buildCell)}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;

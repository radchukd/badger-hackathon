import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardRoot: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: theme.spacing(2),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeading1: {
    fontSize: '24px',
    lineHeight: '40px',
  },
  cardSubheading1: {
    fontSize: '13px',
    lineHeight: '28px',
    color: theme.palette.text.secondary,
  },
  cardSubheading2: {
    fontSize: '13px',
    lineHeight: '21px',
  },
  cardSubheading3: {
    fontSize: '16px',
    lineHeight: '21px',
  },
  cardSubheading4: {
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

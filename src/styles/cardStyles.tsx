import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardRoot: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  centeredContent: {
    alignItems: 'center',
  },
  heading: {
    fontSize: '24px',
    lineHeight: '40px',
  },
  boostSubheading: {
    fontSize: '13px',
    lineHeight: '28px',
    color: theme.palette.text.secondary,
  },
  earningsSubheading: {
    fontSize: '13px',
    lineHeight: '21px',
  },
}));

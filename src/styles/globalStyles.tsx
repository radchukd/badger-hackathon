import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  modal: {
    margin: 'auto',
    maxWidth: '65vw',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    maxHeight: '90vh',
    overflowY: 'auto',
    border: `1px solid ${theme.palette.primary.dark}`,
    boxSizing: 'border-box',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.35)',
    borderRadius: theme.spacing(1),
  },
  modalContent: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  boxGap: {
    gap: theme.spacing(1),
  },
  divider: {
    margin: `${theme.spacing(1)}px -${theme.spacing(2)}px`,
    height: '0.5px',
    backgroundColor: theme.palette.primary.dark,
  },
  avatarSmall: {
    width: '24px',
    height: '24px',
    backgroundColor: '#000000',
    borderRadius: '48px',
  },
  avatarBig: {
    width: '40px',
    height: '40px',
    backgroundColor: '#000000',
    borderRadius: '48px',
  },
}));

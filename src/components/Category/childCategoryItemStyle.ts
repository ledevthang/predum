import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    childWapper: {
      marginBottom: 8,
      maxWidth: 160,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
      },
    },
    imageIcon: {
      height: 20,
      width: 20,
    },
    competition: {
      marginLeft: 24,
      marginBottom: 6,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '19px',
      color: '#BDBDBD',
      display: 'none',
    },
    child: {
      marginLeft: 12,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12,
      '& svg': {
        height: 20,
        width: 20,
      },
      '& p': {
        marginLeft: 8,
      },
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
        marginLeft: 0,
        padding: 8,
      },
    },
    isActive: {
      fontWeight: 600,
      '& svg': {
        fill: '#3FADD5 !important',
      },
      '& p': {
        color: '#3FADD5 !important',
      },
    },
    closeMenu: {
      margin: '4px 0px',
    },
    competitionActive: {
      color: '#3FADD5',
      fontWeight: 600,
    },
  });

export const useStyles = makeStyles(styles);

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container1: {
      paddingBottom: '108px !important',
      [theme.breakpoints.down('md')]: {
        paddingBottom: '65px !important',
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '0px !important',
      },
    },
    container: {
      backgroundColor: '#1C1C1E',
      paddingBottom: 64,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        paddingBottom: 47,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 16px 42px 16px',
      },
    },
    containerStep3: {
      padding: '0px 175px 32px 175px',
      [theme.breakpoints.down('md')]: {
        padding: '0px 122px 47px 122px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 16px 42px 16px',
      },
    },
    textHead: {
      fontSize: 32,
      fontWeight: 600,
      marginTop: 32,
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
        marginTop: 24,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
    confirm: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      padding: '12px 26px !important',
      borderRadius: 30,
      color: '#0B0B0E',
      fontSize: 16,
      fontWeight: 600,
      marginTop: 36,
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        padding: '8px 24px !important',
        fontSize: 14,
      },
    },
    step: {
      width: '100%',
      marginTop: 16,
      padding: '24px 75px 24px 75px',
      [theme.breakpoints.down('sm')]: {
        padding: '24px 8px',
      },
    },
    back: {
      fontSize: 16,
      marginTop: 24,
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    wrapperBtnStep3: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&>button': {
        width: 'fit-content',
      },
      '&>button:last-child': {
        marginBottom: 60,
      },
    },
    description: {
      fontSize: 14,
      color: '#BDBDBD',
      marginTop: 36,
      [theme.breakpoints.down('md')]: {
        marginTop: 24,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        padding: '0px 16px',
      },
    },
  });

export const useStyles = makeStyles(styles);

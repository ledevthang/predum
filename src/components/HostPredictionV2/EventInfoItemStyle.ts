import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#1C1C1E',
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: 12,
      },
    },
    competitionLogo: {
      width: 16,
      height: 16,
    },
    header: {
      display: 'flex',
      backgroundColor: '#2C2C2F',
      justifyContent: 'space-between',
      padding: 12,
    },
    competitionName: {
      fontSize: 14,
      color: '#BDBDBD',
      marginLeft: 8,
    },
    main: {
      padding: '36px 24px',
      [theme.breakpoints.down('md')]: {
        padding: 24,
      },
    },
    teamLogo: {
      width: 56,
      height: 84,
      backgroundSize: 'contain',
    },
    vs: {
      fontSize: 14,
      color: '#BDBDBD',
      margin: '0px 24px',
    },
    teams: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 24,
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    wrapperDateTime: {
      display: 'flex',
      marginTop: 4,
      alignItems: 'center',
      '&>p:first-child': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p:nth-child(2)': {
        fontSize: 14,
        fontWeight: 600,
        marginLeft: 4,
      },
      '&>p:last-child': {
        fontSize: 13,
        fontWeight: 600,
        marginLeft: 4,
      },
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    host: {
      width: 167,
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      color: '#0B0B0E',
      height: 40,
      marginBottom: 36,
    },
    wrapperCommission: {
      display: 'flex',
      borderTop: '1px solid #BDBDBD',
      justifyContent: 'center',
      padding: '8px 0px',
      margin: 12,
      '& svg': {
        width: 12,
        height: 12,
        marginLeft: 6,
      },
    },
    commission: {
      display: 'flex',
      '&>p:first-child': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p:last-child': {
        fontSize: 14,
        fontWeight: 600,
        marginLeft: 4,
      },
    },
  });

export const useStyles = makeStyles(styles);

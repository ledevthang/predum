import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    wapperHeader: {
      padding: '12px 20px',
      background: '#2C2C2F',
      borderBottom: '1px solid #5A5A5E',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    category: {
      '&>svg': {
        fontSize: 14,
        marginRight: 4,
      },
    },
    wapperBody: {
      width: '100%',
      cursor: 'pointer',
    },
    wapperLogo: {
      background: '#2C2C2F',
      height: 140,
      padding: '12px 20px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wapperScoreGroup: {
      display: 'flex',
      marginTop: 8,
      '&>p': {
        fontSize: 16,
        fontWeight: 600,
        color: '#3FADD5',
        padding: '0px 5px',
      },
    },
    logo: {
      height: 80,
      width: 80,
      [theme.breakpoints.down('sm')]: {
        width: 64,
        height: 64,
      },
    },
    icon: {
      height: 24,
      width: 24,
      background: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      '&>svg': {
        fontSize: 14,
      },
      cursor: 'pointer',
    },
    boldText: {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '19px',
    },
    wapperPredict: {
      width: '100%',
      background: '#1C1C1E',
      padding: '12px 20px',
      borderBottom: '1px solid #5A5A5E',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    wapper: {
      width: 'calc(100% - 200px)',
      borderRight: '1px solid #5A5A5E',
      paddingRight: 20,
      '&>p:nth-child(2)': {
        marginTop: 8,
        marginBottom: 8,
      },
      [theme.breakpoints.down('sm')]: {
        borderRight: 'unset',
        width: '100%',
        paddingRight: 0,
        paddingBottom: 8,
      },
    },
    wapper1: {
      width: '320px',
      display: 'flex',
      minHeight: 129,
      paddingLeft: 10,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        alignItems: 'unset',
        minHeight: 80,
      },
    },
    priceText: {
      fontWeight: 600,
      marginLeft: 8,
      color: `${theme.colors.yellow1} !important`,
    },
    wapperFooter: {
      width: '100%',
      padding: '12px 20px',
      display: 'flex',
      background: '#1C1C1E',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    wapperButton: {
      marginTop: 16,
      '& span': {
        textTransform: 'uppercase',
        color: '#3FADD5',
      },
      '&>button': {
        border: '1px solid #3FADD5',
        padding: '12px 20px !important',
        borderRadius: '30px',
      },
    },
    hostBy: {
      display: 'flex',
      alignItems: 'center',
      '&>svg': {
        height: 16,
        width: 16,
        marginRight: 4,
      },
      '&>p:first-child': {
        cursor: 'pointer',
        fontSize: 14,
      },
    },
    status: {
      '&>div': {
        height: 20,
        marginTop: 0,
      },
    },
  });

export const useStyles = makeStyles(styles);

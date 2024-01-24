import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '16px 35px',
      zIndex: 3,
      backgroundColor: '#111111',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        padding: '16px 20px',
        height: 56,
      },
    },
    logo: {
      width: 140,
      height: 30,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        width: 112,
        height: 24,
      },
    },
    input: {
      flexGrow: 1,
      height: 36,
      marginLeft: 44,
      width: 200,
      '&::placeholder': {
        color: 'red',
      },
    },
    menuBurger: {
      borderTop: '1px solid gray',
      paddingLeft: 16,
      paddingTop: 16,
      '&>p': {
        fontSize: '14px',
        textTransform: 'uppercase',
        color: '#5A5A5E',
        marginBottom: 8,
        cursor: 'pointer',
      },
      '&>div>p:first-child': {
        fontSize: '14px',
        textTransform: 'uppercase',
        color: '#5A5A5E',
        marginBottom: 8,
        cursor: 'pointer',
      },
    },
    inputMenu: {
      height: 36,
      padding: '0px 16px',
      marginTop: 24,
      width: 292,
      color: '#BDBDBD',
      backgroundColor: '#333333',
      [theme.breakpoints.down('md')]: {
        width: 265,
      },
    },
    account: {
      '& button': {
        fontSize: 16,
        zIndex: 3,
        color: theme.colors.black3,
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
      '&>p': {
        margin: '0px 12px',
        color: theme.colors.black3,
      },
    },
    accountLight: {
      '& button': {
        fontSize: 16,
        color: '#1C1C1E',
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
      '&>p': {
        margin: '0px 12px',
        color: '#1C1C1E',
      },
    },
    wrapper: {
      display: 'flex',
    },
    btnAccount: {
      '& span svg': {
        marginLeft: 12,
        width: 16,
        height: 16,
      },
    },
    btnHost: {
      backgroundColor: theme.colors.yellow1,
      borderRadius: 22,
      width: 164,
      height: 40,
      marginLeft: 36,
      textDecoration: 'none',
      '& p': {
        fontSize: 16,
        color: 'white',
        fontWeight: 600,
      },
    },
    icon: {
      '& svg': {
        color: '#111111',
      },
      marginLeft: 4,
      cursor: 'pointer',
    },
    btnHostMenu: {
      backgroundColor: theme.colors.yellow1,
      borderRadius: 22,
      width: 164,
      height: 40,
      marginLeft: 16,
      marginTop: 24,
      marginBottom: 24,
      '& span': {
        padding: '9px 28px 10px 29px',
      },
      '& p': {
        fontSize: 16,
        color: 'white',
        fontWeight: 600,
      },
    },
    menu: {
      marginRight: 27,
    },
    userMenu: {
      backgroundColor: '#616161',
      padding: 12,
      width: 94,
      '& hr': {
        backgroundColor: '#FFFFFF',
        margin: '12px 0px',
      },
      '& button': {
        width: '100%',
        justifyContent: 'flex-end',
      },
    },
    btnConnect: {
      color: '#5A5A5E',
    },
    dialog: {
      padding: 0,
      margin: 0,
      '& .MuiDialog-scrollPaper': {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        '& .MuiPaper-root': {
          margin: 0,
          backgroundColor: '#333333',
          height: '105vh',
        },
        '& .MuiPaper-rounded': {
          borderRadius: 0,
        },
      },
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: '100%',
      },
    },
    history: {
      textTransform: 'uppercase',
    },
  });

export const useStyles = makeStyles(styles);

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexDirection: 'column',
    },
    wapperChart: {
      marginBottom: 24,
      padding: '32px 60px',
      width: '100%',
      background: '#1C1C1E',
      // '&>div:first-child': {
      //   height: 400,
      // },
      [theme.breakpoints.down('sm')]: {
        padding: '32px 0px',
      },
    },
    wapperQuestion: {
      width: '100%',
    },
    contract: {
      display: 'flex',
      '& svg': {
        fontSize: 20,
        cursor: 'pointer',
        fill: 'none',
      },
      marginBottom: 20,
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        margin: '0px 20px 20px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0px 20px 15px 20px',
      },
    },
    contract2: {
      display: 'flex',
      '& svg': {
        fontSize: 20,
        cursor: 'pointer',
      },
      marginBottom: 20,
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        margin: '0px 20px 20px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0px 20px 15px 20px',
      },
    },
    forceSvg: {
      '& svg': {
        fill: 'currentColor',
      },
    },
    text: {
      fontSize: 16,
      fontWeight: 600,
      marginRight: 4,
    },
    wapperInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 24,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
      },
    },
    wapper: {
      '&>div>p': {
        fontWeight: 600,
        fontSize: 16,
        marginLeft: 6,
        cursor: 'pointer',
      },
      '& button': {
        width: 80,
        height: 30,
        border: '1px solid #3FADD5',
        borderRadius: '18px',
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        color: '#1C1C1E',
        '& span': {
          fontWeight: 600,
          fontSize: 14,
        },
        [theme.breakpoints.down('sm')]: {
          width: 80,
        },
      },
    },
    logo: {
      width: 24,
      height: 23,
      marginRight: 4,
    },
    wapperButton: {
      marginTop: 24,
      '& button': {
        width: 171,
        height: 44,
        border: '1px solid #3FADD5',
        borderRadius: '22px',
        color: '#3FADD5',
        '& span': {
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: 16,
        },
      },
      '&>button:first-child': {
        color: '#1C1C1E',
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        marginRight: 16,
      },
      // '&>button:last-child': {
      //   '& span': {
      //     background: 'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      //     WebkitBackgroundClip: 'text',
      //     WebkitTextFillColor: 'transparent',
      //     backgroundClip: 'text',
      //     textFillColor: 'transparent',
      //   },
      // },
    },
    viewInvesment: {
      marginTop: 24,
      textAlign: 'center',
      cursor: 'pointer',
      color: '#BDBDBD',
      fontSize: 16,
      lineHeight: '19px',
      textTransform: 'uppercase',
    },
  });

export const useStyles = makeStyles(styles);

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      padding: '0px 75px',
      [theme.breakpoints.down('md')]: {
        padding: '0px 24px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 16px',
      },
    },
    main: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      '& div:first-child': {
        pointerEvents: 'none',
        opacity: 0.6,
      },
    },
    title: {
      fontSize: 14,
      color: '#BDBDBD',
      marginTop: 48,
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0,
        textAlign: 'center',
        marginTop: 12,
      },
    },
    block: {
      padding: 16,
      width: 220,
      borderRadius: 2,
      border: '1px solid #5A5A5E',
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginTop: 24,
      },
    },
    img: {
      width: '100%',
      height: 162,
    },
    name: {
      fontSize: 18,
      fontWeight: 500,
      color: '#FFFFFF',
      textAlign: 'center',
      marginTop: 12,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    selectedBackground: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    shortDescription: {
      fontSize: 13,
      color: '#BDBDBD',
      textAlign: 'center',
    },
    description: {
      fontSize: 14,
      color: '#BDBDBD',
    },
    dot: {
      width: 8,
      height: 8,
      marginTop: 8,
      marginRight: 8,
      fill: '#BDBDBD',
    },
    wrapperDes: {
      display: 'flex',
      marginTop: 12,
    },
    borderSelected: {
      border: '1px solid #3FADD5',
    },
    selectedIcon: {
      fill: '#3FADD5',
    },
    text: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 48,
      width: '100%',
      textAlign: 'center',
    },
    hint: {
      fontSize: 14,
      color: '#BDBDBD',
      textAlign: 'center',
    },
    wrapperPool: {
      marginBottom: 24,
      width: 460,
      display: 'flex',
      position: 'relative' as any,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingRight: 24,
      },
    },
    clear: {
      position: 'absolute' as any,
      right: -40,
      top: 12,
      '& svg': {
        width: 16,
        height: 16,
      },
      [theme.breakpoints.down('sm')]: {
        right: -8,
      },
    },
    selectCoin: {
      width: '124px !important',
      marginRight: '12px !important',
      [theme.breakpoints.down('sm')]: {
        width: '86px !important',
      },
    },
    liquidityPool: {
      height: 44,
      flexGrow: 1,
      width: 'unset !important',
      borderRadius: '0px !important',
      backgroundColor: '#4B4B4B',
      '& input::placeholder': {
        color: '#FFFFFF',
      },
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    coin: {
      height: 24,
      width: 24,
      marginRight: 8,
    },
    wrapperPool2: {
      marginTop: 24,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

export const useStyles = makeStyles(styles);

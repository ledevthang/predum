import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: '46px 100px 46px 54px',
      display: 'flex',
      backgroundColor: '#1C1C1E',
      [theme.breakpoints.down('md')]: {
        padding: '36px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: 16,
        flexDirection: 'column',
      },
    },
    main: {
      marginLeft: 120,
      flexGrow: 1,
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        marginLeft: 80,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginTop: 12,
      },
    },
    marginTop: {
      marginTop: 24,
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
      },
    },
    predictionText: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: 500,
    },
    commonInput: {
      height: 44,
      backgroundColor: '#4B4B4B',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    annotate: {
      '& p': {
        marginBottom: 8,
      },
    },
    answerType: {
      fontSize: 16,
      color: '#BDBDBD',
    },
    disabled: {
      color: 'white !important',
      opacity: '0.7',
    },
    answerTypeActive: {
      color: 'white',
      fontWeight: 600,
    },
    divider: {
      height: 18,
      margin: '0px 30px',
      backgroundColor: 'white',
    },
    inputMarket: {
      width: 'calc(100% - 32px)',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 12px)',
      },
    },
    proWrapTooltip: {
      display: 'flex',
      marginBottom: 26,
      '& svg': {
        width: 12,
        height: 12,
        marginLeft: 4,
      },
    },
    selectPriceType: {
      backgroundColor: '#616161',
      width: 80,
      height: 44,
      margin: '0px 16px',
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    dateTime: {
      height: 44,
      backgroundColor: '#4B4B4B',
      width: 175,
      marginLeft: 16,
      [theme.breakpoints.down('sm')]: {
        height: 36,
        marginLeft: 0,
      },
    },
    wrapperMarketPriceQuestion2: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
    wrapperMarketPriceQuestion: {
      display: 'flex',
      alignItems: 'center',
      '&>p': {
        fontSize: 14,
        whiteSpace: 'nowrap',
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 24,
      },
    },
    updateText: {
      fontSize: 14,
      color: '#BDBDBD',
      marginTop: 8,
    },
    optionDetail: {
      fontWeight: 500,
      fontSize: 16,
      marginTop: 24,
      marginBottom: 16,
    },
    addBtn: {
      fontSize: 14,
      width: 'fit-content',
      padding: '0px 12px 0px 8px !important',
      height: 32,
      backgroundColor: '#FFFFFF',
      color: '#212121',
      borderRadius: 2,
      textTransform: 'none',
      whiteSpace: 'nowrap',
      '&:hover': {
        backgroundColor: '#FFFFFF !important',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    wrapperPriceRange: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      '&>div': {
        width: '44%',
      },
      '&>hr': {
        width: 24,
        backgroundColor: '#4B4B4B',
      },
    },
    clear: {
      position: 'absolute' as any,
      right: -40,
      top: 44,
      '& svg': {
        width: 16,
        height: 16,
      },
      [theme.breakpoints.down('sm')]: {
        right: -20,
        '& svg': {
          width: 12,
          height: 12,
        },
      },
    },
    radioOption: {
      '& .MuiFormControlLabel-label': {
        whiteSpace: 'nowrap',
      },
    },
    errorRange: {
      fontSize: 12,
      color: 'red',
      position: 'absolute',
      bottom: -28,
    },
    wrapperInput: {
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    odd: {
      marginLeft: 12,
      width: 100,
      [theme.breakpoints.down('sm')]: {
        width: 118,
      },
      '&>p': {
        width: 'inherit',
      },
    },
    flex1: {
      flexGrow: 1,
    },
    index: {
      fontSize: 20,
      fontWeight: 500,
      marginRight: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
    wrapper: {
      [theme.breakpoints.down('md')]: {
        paddingRight: 36,
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: 16,
      },
    },
  });

export const useStyles = makeStyles(styles);

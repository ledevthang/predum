import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: 24,
      [theme.breakpoints.down('md')]: {
        marginTop: 24,
      },
    },
    selectEventType: {
      fontSize: 14,
      color: '#BDBDBD',
    },
    groupPredict: {
      marginTop: 24,
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    description: {
      fontSize: 14,
      color: '#BDBDBD',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    wrapperLabel: {
      flexGrow: 1,
    },
    commonInput: {
      height: 44,
      backgroundColor: '#4B4B4B',
      marginBottom: 12,
      '& .MuiInputBase-root.Mui-disabled': {
        color: '#FFFFFF',
      },
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    marketInput: {
      width: 'calc(100% - 16px)',
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
    wrapper: {
      display: 'flex',
      position: 'relative',
    },
    odd: {
      marginLeft: 12,
      width: 160,
      [theme.breakpoints.down('sm')]: {
        width: 118,
      },
      '&>p': {
        width: 'inherit',
      },
    },
    multipleChoiceOption: {
      flexGrow: 1,
    },
    predictOption: {
      fontSize: 14,
      color: '#BDBDBD',
      marginBottom: 12,
    },
    italic: {
      '&>p': {
        color: '#FFFFFF',
        fontStyle: 'italic',
      },
    },
    oddTeamScore: {
      width: 80,
      marginLeft: 12,
      '&>p': {
        width: 'inherit',
      },
      [theme.breakpoints.down('sm')]: {
        width: 64,
      },
    },
    reviewText: {
      height: 44,
      [theme.breakpoints.down('md')]: {
        height: 36,
      },
      [theme.breakpoints.down('sm')]: {
        height: 28,
      },
    },
    containerReview: {
      width: '100%',
      padding: '0px 195px',
      [theme.breakpoints.down('md')]: {
        padding: '0px 122px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 48px',
      },
    },
    mainReview: {
      backgroundColor: '#4B4B4B',
      display: 'flex',
      alignItems: 'center',
      '&>button': {
        textTransform: 'none',
        backgroundColor: '#FFFFFF',
        color: '#212121',
        fontSize: 14,
        borderRadius: 2,
        width: 68,
        height: 32,
        marginRight: 6,
      },
    },
    oddTeamScoreHomeAway: {
      width: 120,
      marginLeft: 12,
      '&>p': {
        width: 'inherit',
      },
      [theme.breakpoints.down('sm')]: {
        width: 100,
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
    wrapperInput: {
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    wrapperMultiple: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginRight: 12,
      },
    },
    overUnderName: {
      marginLeft: 16,
      width: 100,
      height: 44,
      fontSize: 14,
      marginBottom: 8,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        width: 80,
      },
      [theme.breakpoints.down('sm')]: {
        width: 64,
        height: 32,
        marginLeft: 0,
      },
    },
    overUnderValue: {
      width: 64,
      backgroundColor: '#4B4B4B',
      height: 44,
      [theme.breakpoints.down('md')]: {
        width: 56,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 32,
      },
    },
    wrapperOverUnder: {
      display: 'flex',
      marginTop: 16,
    },
    wrapperUnderClear: {
      marginBottom: 8,
    },
    clearOverUnder: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, 4px)',
      '& svg': {
        height: 16,
        width: 16,
        [theme.breakpoints.down('sm')]: {
          height: 12,
          width: 12,
        },
      },
    },
    wrapperHeader: {
      height: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    addButtonOverUnder: {},
    wrapperOverUnderInput: {
      position: 'relative',
      marginLeft: 8,
      [theme.breakpoints.down('sm')]: {
        width: '13%',
        paddingBottom: 16,
      },
    },
    errorTotalScore: {
      position: 'absolute',
      fontSize: '0.75rem',
      color: '#f44336',
      marginTop: -8,
    },
    errorHandicap: {
      position: 'absolute',
      fontSize: '0.75rem',
      color: '#f44336',
      bottom: -12,
    },
    wrapperImage: {
      marginBottom: 12,
    },
    img: {
      width: '128px !important',
      height: '100px !important',
    },
  });

export const useStyles = makeStyles(styles);

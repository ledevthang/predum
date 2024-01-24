import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      marginTop: 48,
    },
    header: {
      border: '1px solid #5A5A5E',
      borderRadius: 2,
      display: 'flex',
    },
    competitionLogo: {
      height: 80,
      width: 80,
      margin: '30px 40px 36px 40px',
      backgroundSize: 'contain',
    },
    competitionLogoMobile: {
      height: 36,
      width: 36,
      marginRight: 8,
      backgroundSize: 'contain',
    },
    competitionInfo: {
      display: 'flex',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0px 8px 16px 8px',
      },
    },
    competitionName: {
      fontSize: 20,
      fontWeight: 600,
      margin: '20px 0px 16px 0px',
      [theme.breakpoints.down('sm')]: {
        margin: 0,
      },
    },
    cell1: {
      width: '10%',
      '&>p': {
        textAlign: 'start !important',
      },
      [theme.breakpoints.down('sm')]: {
        width: '24%',
        marginTop: 16,
      },
    },
    cell2: {
      width: '27%',
      [theme.breakpoints.down('sm')]: {
        width: '40%',
        marginTop: 16,
      },
    },
    cell3: {
      width: '15%',
      [theme.breakpoints.down('sm')]: {
        width: '36%',
        marginTop: 16,
      },
    },
    cell4: {
      width: '20%',
      [theme.breakpoints.down('sm')]: {
        width: '33%',
        marginTop: 16,
        marginRight: 16,
      },
    },
    cell5: {
      width: '28%',
      [theme.breakpoints.down('sm')]: {
        width: '33%',
        marginTop: 16,
      },
    },
    type: {
      fontSize: 14,
      fontWeight: 500,
      width: '100%',
      textAlign: 'center',
    },
    value: {
      fontSize: 14,
      width: '100%',
      textAlign: 'center',
      color: '#BDBDBD',
    },
    wrapperOption: {},
    wrapperOptionItem: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 24,
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    mainOption: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    optionHeader: {
      backgroundColor: '#4B4B4B',
      height: 46,
      fontSize: 18,
      width: '100%',
    },
    listOption: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 12,
      alignItems: 'center',
    },
    listOptionMobile: {
      flexWrap: 'wrap',
    },
    optionDetail: {
      width: 'calc((100% - 40px) / 3)',
      flexDirection: 'column',
      backgroundColor: '#111111',
      '&>p': {
        fontSize: 14,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'calc((100% - 24px) / 3)',
      },
    },
    heightOptionDetail1x2: {
      height: 62,
    },
    heightOptionDetailCorrectScore: {
      height: 97,
      width: 'calc((100% - 40px) / 3)',
      [theme.breakpoints.down('sm')]: {
        width: 'calc((100% - 24px) / 2)',
      },
    },
    optionDetailCorrectScore3: {
      width: '100% !important',
    },
    tickBtn: {
      height: 'fit-content',
      marginLeft: 14,
      marginRight: 40,
      width: 'fit-content',
      '& svg': {
        height: 36,
        width: 36,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        '& svg': {
          height: 24,
          width: 24,
        },
      },
    },
    wrapperCorrectScore: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      '&>p': {
        fontSize: 14,
      },
      '&>p:last-child': {
        marginLeft: 24,
      },
    },
    viewMoreCorrectScore: {
      fontSize: 14,
      fontWeight: 500,
      color: '#BDBDBD',
      float: 'right',
      marginTop: 8,
      '& svg': {
        height: 12,
        width: 12,
        marginLeft: 4,
        marginTop: 2,
      },
    },
    handicap: {
      '&>p': {
        fontSize: 18,
        fontWeight: 600,
      },
    },
    competitionNameMobile: {
      display: 'flex',
      marginBottom: 16,
    },
    handicapMobile: {
      width: 136,
    },
    overUnderName: {
      flexGrow: 1,
      marginLeft: 16,
    },
    overUnderValue: {
      cursor: 'pointer',
      width: 32,
      margin: '0px 4%',
      display: 'flex',
      borderRadius: 2,
      height: 30,
      justifyContent: 'center',
      '& input': {
        paddingLeft: 0,
        textAlign: 'center',
      },
      '& .Mui-disabled': {
        color: 'white',
      },
    },
    borderOverUnderOdd: {
      border: '1px solid #BDBDBD',
    },
    wapperOverUnder: {
      width: '100%',
      marginRight: 20,
      marginTop: 12,
      '&>div': {
        height: 44,
      },
      '&>div:first-child': {
        backgroundColor: '#2C2C2F',
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    rateInput: {
      height: 36,
      width: 44,
      border: '1px solid #BDBDBD',
      borderRadius: 2,
      '& input': {
        textAlign: 'center',
        paddingLeft: 0,
        color: '#BDBDBD',
      },
    },
    wrapperRate: {
      marginLeft: 16,
      marginTop: 24,
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        display: 'flex',
        alignItems: 'center',
      },
    },
    wrapper: {
      display: 'flex',
    },
    wrapperPoolValue: {
      marginTop: 8,
      '& p': {
        color: '#BDBDBD',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        marginLeft: 8,
      },
    },
    border: {
      border: '1px solid #BDBDBD',
    },
    commonInput: {
      width: 32,
      height: 32,
      borderRadius: 2,
      '& input': {
        textAlign: 'center',
        paddingLeft: 0,
      },
      '& .Mui-disabled': {
        opacity: '0.8',
        color: 'white',
      },
    },
    errorHandicap: {
      position: 'absolute',
      fontSize: '0.75rem',
      color: '#f44336',
      bottom: -12,
    },
    margin: {
      marginRight: 8,
    },
  });

export const useStyles = makeStyles(styles);

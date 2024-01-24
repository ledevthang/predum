import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      padding: '0px 16px',
      display: 'flex',
      marginTop: 48,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    competitionLogo: {
      height: 36,
      width: 36,
      backgroundSize: 'contain',
    },
    competitionName: {
      fontSize: 16,
      color: '#BDBDBD',
      marginTop: 4,
      width: 'inherit',
      textAlign: 'center',
    },
    wrapperCompetition: {
      minWidth: 120,
      height: 100,
      border: '1px solid #5A5A5E',
      borderRadius: 2,
      marginBottom: 16,
      '&>span': {
        flexDirection: 'column',
      },
      [theme.breakpoints.down('md')]: {
        marginRight: 24,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 16,
      },
    },
    table: {
      flexGrow: 1,
      marginLeft: 30,
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: 8,
      },
    },
    tableMain: {
      height: 700,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    header: {
      height: 40,
      display: 'flex',
      padding: '0px 20px',
      alignItems: 'center',
      backgroundColor: '#4B4B4B',
      '&>p': {
        fontWeight: 500,
        fontSize: 14,
      },
    },
    cell1: {
      width: '15%',
      textAlign: 'center',
    },
    cell2: {
      width: '33%',
      textAlign: 'center',
    },
    cell3: {
      width: '12%',
      textAlign: 'center',
    },
    cell4: {
      width: '20%',
      textAlign: 'center',
    },
    cell5: {
      width: '20%',
      textAlign: 'center',
    },
    cell: {
      width: '100%',
      marginTop: 15,
      '&>span': {
        padding: '0px 20px',
        '&>p': {
          fontSize: 14,
          color: '#BDBDBD',
        },
      },
    },
    wrapperCompetitionList: {
      [theme.breakpoints.up('lg')]: {
        minWidth: 'min-content',
        overflowY: 'scroll',
        height: 740,
        width: 120,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
    round: {
      height: 50,
      fontSize: 16,
      borderRadius: 8,
      backgroundColor: '#616161',
      fontWeight: 700,
      marginBottom: 12,
      width: '100%',
    },
    body: {
      borderRadius: 8,
      width: '100%',
    },
    wrapperCellMobile: {
      marginTop: 16,
      padding: '16px !important',
      width: '100%',
      '&>span': {
        flexDirection: 'column',
      },
      border: '1px solid #5A5A5E',
    },
    textMobile: {
      fontSize: 14,
      fontWeight: 500,
    },
    wrapperText: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    textMobile2: {
      fontSize: 14,
      fontWeight: 500,
      width: '40%',
      textAlign: 'start',
      color: '#BDBDBD',
    },
    competitionSelected: {
      border: '1px solid #3FADD5',
    },
    roundSelected: {
      '& p': {
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
    roundSelectedMobile: {
      border: '1px solid #3FADD5',
      '& p': {
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  });

export const useStyles = makeStyles(styles);

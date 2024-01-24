import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    choice: {
      marginTop: 12,
      backgroundColor: theme.colors.black2,
      width: 96,
      boxSizing: 'content-box',
      height: 54,
      cursor: 'pointer',
      flexDirection: 'column',
      padding: '0px 16px',
      '& p': {
        width: 'inherit',
        fontSize: 14,
        textAlign: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
      },
    },
    wapperMultiChoice: {
      display: 'flex',
      flexWrap: 'wrap',
      '&>div': {
        marginRight: '10px',
      },
    },
    choiceOverUnderUvU: {
      marginTop: 12,
      backgroundColor: theme.colors.black2,
      width: 128,
      height: 54,
      cursor: 'pointer',
      '& p': {
        fontSize: 14,
        marginLeft: 8,
        textAlign: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
      },
    },
    handicap: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: '20px !important',
      '&>p': {
        whiteSpace: 'nowrap',
        fontSize: 18,
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
        },
      },
    },
    overUnderName: {
      flexGrow: 1,
      marginLeft: 16,
    },
    overUnderValue: {
      cursor: 'pointer',
      width: '5%',
      margin: '0px 4%',
      display: 'flex',
      justifyContent: 'center',
    },
    resetCursor: {
      cursor: 'default',
      pointerEvents: 'none',
    },
    wrapperChoiceScroll: {
      '&> .react-horizontal-scrolling-menu--item:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    actived: {
      color: '#3FADD5 !important',
      border: '1px solid #3FADD5',
      '& p': {
        color: '#3FADD5',
      },
    },
    disableOption: {
      pointerEvents: 'none',
      '&>p': {
        color: '#666666',
      },
    },
    disableOptionOverUnder: {
      color: '#666666',
    },
  });

export const useStyles = makeStyles(styles);

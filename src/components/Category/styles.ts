import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    label: {
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '19px',
      marginLeft: '12px',
      textTransform: 'none',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: 8,
      },
      [theme.breakpoints.down('sm')]: {
        whiteSpace: 'nowrap',
      },
    },
    wapperCategory: {
      position: 'fixed',
      left: '25px',
      top: 82,
      zIndex: 3,
      height: 'calc(100vh - 100px)',
      overflowY: 'scroll',
      overflow: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },

      [theme.breakpoints.down('md')]: {
        height: 50,
        position: 'static',
        display: 'flex',
        marginTop: 24,
        padding: '0px 20px',
        justifyContent: 'space-between',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        overflowX: 'scroll',
        overflow: 'hidden',
        padding: 0,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
    isActive: {
      fontWeight: 600,
      '& svg': {
        fill: '#3FADD5 !important',
      },
      '& p': {
        color: '#3FADD5 !important',
      },
    },
    wapperCategoryItem: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      width: 160,
      height: 40,
      backgroundColor: '#1C1C1E',
      marginBottom: 12,
      [theme.breakpoints.down('md')]: {
        marginRight: 0,
        backgroundColor: 'unset',
        marginLeft: 0,
        width: 'unset',
      },
      '& svg': {
        marginRight: 8,
        marginLeft: 12,
      },
      '& p': {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        // width: '60px',
        color: '#FFFFFF',
      },
    },
    wrapperMenuIcon: {
      width: 32,
      height: 32,
      background: '#4B4B4B',
      borderRadius: '20px',
      cursor: 'pointer',
      position: 'fixed',
      top: 86,
      left: 168,
      zIndex: 10,
      '& svg': {
        height: 20,
        width: 20,
      },
    },
    wrapperCloseMenu: {
      width: 32,
      height: 32,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 10,
      '& svg': {
        height: 20,
        width: 20,
      },
    },
  });

export const useStyles = makeStyles(styles);

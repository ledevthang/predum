import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    label: {
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '19px',
      marginLeft: '12px',
      textTransform: 'none',
      fontWeight: 500,
      color: '#FFFFFF',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: 8,
      },
      [theme.breakpoints.down('sm')]: {
        whiteSpace: 'nowrap',
      },
    },
    line: {
      display: 'flex',
      margin: '10px 0px',
      justifyContent: 'flex-end',
      '& svg': {
        width: 21,
      },
    },
    wapperCategoryItem: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      width: 160,
      height: 40,
      backgroundColor: '#1C1C1E',
      marginBottom: 12,
      [theme.breakpoints.down('md')]: {
        marginRight: 12,
        backgroundColor: 'unset',
        marginLeft: 12,
        width: 'unset',
        paddingBottom: 10,
        cursor: 'default',
      },
    },
    buttonWrapperCategory: {
      [theme.breakpoints.down('md')]: {
        '& span': {
          display: 'flex',
        },
      },
      '& svg': {
        marginTop: 30,
      },
      '& p': {
        marginRight: 10,
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
    wapperChild: {
      [theme.breakpoints.down('md')]: {
        position: 'absolute',
        zIndex: 10,
        background: '#333333',
        paddingTop: 8,
        paddingRight: 8,
      },
    },
    wrapperSubcategory: {
      background: '#333333',
      padding: 4,
    },
    wapper: {
      // position: 'absolute',
    },
    dropDownBtn: {
      marginTop: 25,
    },
  });

export const useStyles = makeStyles(styles);

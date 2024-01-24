import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      '& #video': {
        width: '100% !important',
        [theme.breakpoints.down('sm')]: {
          padding: '0px 16px',
        },
      },
    },
    video: {},
    breadcrumb: {
      cursor: 'pointer',
      display: 'inline-block',
    },
    thumbnail: {
      height: 200,
      width: '100%',
      marginBottom: 24,
    },
    header: {
      marginBottom: 36,
      lineHeight: '17px',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    delete: {
      marginRight: 6,
      padding: '7px 12px',
      cursor: 'pointer',
      fontSize: 14,
      backgroundColor: '#616161',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        padding: '6px 10px',
      },
    },
    description: {
      marginTop: 36,
      fontSize: 14,
      lineHeight: '150%',
      color: '#BDBDBD',
      [theme.breakpoints.down('md')]: {
        marginTop: 24,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 20px',
      },
    },
    containerReview: {
      width: '100%',
      marginBottom: 36,
      '& div:first-child': {
        width: 460,
      },
      [theme.breakpoints.down('sm')]: {
        '& div:first-child': {
          width: 'calc(100% - 40px)',
          '& p': {
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            color: '#BDBDBD',
          },
        },
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
    reviewText: {
      height: 44,
      '& .Mui-disabled': {
        color: '#BDBDBD',
      },
    },
  });

export const useStyles = makeStyles(styles);

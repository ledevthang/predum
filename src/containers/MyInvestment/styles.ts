import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: '108px !important',
      [theme.breakpoints.down('md')]: {
        paddingBottom: '65px !important',
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '0px !important',
      },
    },
    chart: {
      height: 400,
    },
    wrapperChart: {
      padding: '40px 90px 32px 90px',
      backgroundColor: '#1C1C1E',
      [theme.breakpoints.down('md')]: {
        padding: '24px 60px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '24px 10px',
      },
    },
  });

export const useStyles = makeStyles(styles);

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    title: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
      },
    },
    wrapperViewMore: {
      width: '100%',
    },
    viewMore: {
      height: 44,
      borderRadius: 22,
      border: '1px solid #3FADD5',
      color: '#3FADD5',
      padding: '0px 46px !important',
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
  });

export const useStyles = makeStyles(styles);

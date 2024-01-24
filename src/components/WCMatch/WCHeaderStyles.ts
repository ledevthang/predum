import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: 16,
      '& .Mui-disabled': {
        color: 'white',
        opacity: 0.26,
      },
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 4,
      padding: '0px 24px',
    },
    image: {
      width: 40,
      height: 48,
    },
    wrapperText: {
      marginLeft: 12,
      '&>p:first-child': {
        fontSize: 18,
        fontWeight: 600,
      },
      '&>p:last-chid': {
        fontSize: 16,
        color: '#BDBDBD',
      },
    },
    tab: {
      width: '25%',
      fontSize: 16,
      fontWeight: 600,
      padding: '12px 0px !important',
      borderRadius: 0,
    },
    activeTab: {
      borderBottom: '1px solid #3FADD5',
    },
  });

export const useStyles = makeStyles(styles);

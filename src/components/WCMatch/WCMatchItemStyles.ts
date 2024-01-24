import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      padding: '8px 14px',
      fontSize: 16,
      fontWeight: 600,
      borderBottom: '1px solid #616161',
      background: '#2C2C2F',
    },
    wrapper: {
      padding: '12px 14px',
      background: '#2C2C2F',
      display: 'flex',
      width: '100%',
    },
    wrapper2: {
      display: 'flex',
      alignItems: 'center',
      '& p': {
        fontSize: 16,
        fontWeight: 600,
        marginLeft: 16,
      },
    },
    image: {
      width: 40,
      height: 30,
    },
    wrapper3: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderLeft: '1px solid #616161',
      width: 200,
      paddingLeft: 14,
      alignItems: 'center',
      '&>p:nth-child(2)': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p:nth-child(3)': {
        fontSize: 14,
        fontWeight: 600,
      },
    },
    wapperButton: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    button: {
      height: 32,
      fontSize: 14,
      fontWeight: 600,
      padding: '0px 12px !important',
      borderRadius: 22,
      background: '#3FADD5',
      marginBottom: 8,
      color: '#0B0B0E',
    },
    button2: {
      height: 32,
      fontSize: 14,
      fontWeight: 600,
      padding: '0px 16px !important',
      borderRadius: 22,
      color: '#3FADD5',
      marginBottom: 8,
      border: '1px solid #3FADD5',
    },
    wrapper4: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

export const useStyles = makeStyles(styles);

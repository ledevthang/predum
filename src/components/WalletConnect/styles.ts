import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#202020',
      padding: '24px 36px',
      width: 300,
      '&>div:not(:last-child)': {
        marginBottom: 12,
      },
      '&>p': {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 16,
      },
    },
    item: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      cursor: 'pointer',
      border: '1px solid rgba(104,117,140,0.3)',
      padding: '12px 16px',
      borderRadius: '10px',
      '& p': {
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#5b5b5b',
      },
      '& svg': {
        height: 32,
        width: 32,
        marginRight: 12,
      },
      '&:hover': {
        background: 'rgba(104,117,140,.3)',
        border: '1px solid transparent',
        '& p': {
          color: 'white',
        },
      },
    },
  });

export const useStyles = makeStyles(styles);

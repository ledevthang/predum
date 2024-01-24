import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    wrapperHeader: {
      display: 'flex',
      '&>button': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p': {
        margin: '0px 12px',
      },
      '&>button:last-child': {
        color: '#FFFFFF',
      },
    },
  });

export const useStyles = makeStyles(styles);

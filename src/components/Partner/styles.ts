import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    wrapper: {
      position: 'relative',
      '&>button': {
        width: 'fit-content',
        '& svg': {
          width: 36,
          height: 36,
        },
      },
      '&>button:first-child': {
        left: -40,
      },
      '&>button:last-child': {
        right: -40,
      },
    },
    wrapperEventScroll: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    logo: {
      width: 146,
      height: 75,
      backgroundSize: 'contain',
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      marginTop: 20,
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
      },
    },
    cursorPointer: {
      cursor: 'pointer',
    },
  });

export const useStyles = makeStyles(styles);

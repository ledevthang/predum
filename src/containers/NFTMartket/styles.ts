import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexDirection: 'column',
    },
    mainText: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '32px',
    },
    noteText: {
      fontSize: '14px',
      lineHeight: '16px',
      textTransform: 'uppercase',
      margin: '4px 0px 8px 0px',
      color: '#BDBDBD',
    },
    wapperCard: {
      marginTop: 20,
      width: '100%',
    },
    wapperCardScroll: {
      marginRight: 16,
    },
    highlight: {
      color: '#3FADD5',
    },
    cardInfo: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '24px',
      margin: '8px 0px',
      textAlign: 'center',
    },
    cardInfo2: {
      fontSize: 16,
      lineHeight: '19px',
      textTransform: 'uppercase',
      textAlign: 'center',
    },

    wapperFilter: {
      width: '100%',
    },
    wapperScroll: {
      width: '100%',
      marginTop: 24,
      marginBottom: 24,
    },
    wrapperEventScroll: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
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
    image: {
      height: 180,
      width: 300,
    },
  });

export const useStyles = makeStyles(styles);

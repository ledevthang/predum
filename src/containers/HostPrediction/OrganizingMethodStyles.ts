import { makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  container: {
    marginTop: 48,
    width: '100%',
  },
  header: {
    fontSize: 14,
    color: '#BDBDBD',
    marginBottom: 24,
  },
  type: {
    width: 220,
    borderRadius: 2,
    border: '1px solid #5A5A5E',
    paddingBottom: 24,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0px 60px 24px 60px',
    },
  },
  hint: {
    fontSize: 13,
    color: '#BDBDBD',
    marginLeft: 12,
    display: 'flex',
    alignItems: 'baseline',
    '&>svg': {
      width: 6,
      height: 6,
      marginRight: 6,
      display: 'block',
    },
  },
  wrapperIcon: {
    margin: '24px 45px 12px 45px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&>p': {
      fontSize: 14,
      color: '#BDBDBD',
    },
  },
  users: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  wrapperType: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '&>div:first-child': {
        marginBottom: 20,
      },
    },
  },
  selected: {
    border: '1px solid #3FADD5',
  },
  label: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 14,
    color: '#BDBDBD',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginTop: 20,
    },
  },
  coin: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  selectCoin: {
    width: 124,
    marginRight: 12,
  },
  liquidityPool: {
    height: 44,
    flexGrow: 1,
    width: 'unset',
    backgroundColor: '#4B4B4B',
    '& input::placeholder': {
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('sm')]: {
      height: 36,
    },
  },
  wrapperPool: {
    marginBottom: 24,
    display: 'flex',
    position: 'relative' as any,
  },
  clear: {
    position: 'absolute' as any,
    right: -40,
    top: 12,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  footer: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'baseline',
    '&>svg': {
      width: 6,
      height: 6,
      marginRight: 6,
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  wrapperFooter: {
    marginTop: 12,
  },
});

export const useStyles = makeStyles(styles);

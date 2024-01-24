import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    wrapperType: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      marginTop: 48,
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        '&>div:first-child': {
          marginBottom: 20,
        },
      },
    },
    selected: {
      border: '1px solid #3FADD5 !important',
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
    wrapperIcon: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&>p': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>svg': {
        height: 36,
        width: 36,
      },
    },
    users: {
      fontSize: 14,
      color: '#BDBDBD',
      marginTop: 8,
    },
    comingSoon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 240,
      '&>p': {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '29px',
      },
      '&>hr': {
        width: '80px',
        height: '2px',
        backgroundColor: '#BDBDBD',
        marginTop: 4,
      },
      [theme.breakpoints.down('sm')]: {
        right: 0,
        bottom: 160,
      },
    },
    type: {
      width: 220,
      borderRadius: 2,
      border: '1px solid #5A5A5E',
      alignItems: 'center',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 40px)',
      },
    },
    hint: {
      fontSize: 13,
      color: '#BDBDBD',
      marginTop: 12,
      display: 'flex',
      alignItems: 'baseline',
      '&>svg': {
        width: 6,
        height: 6,
        marginRight: 6,
        display: 'block',
      },
    },
    dataSource: {
      fontSize: 16,
      fontWeight: 600,
    },
    marginRight: {
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    selectedBg: {
      '&>svg': {
        fill: '#3FADD5',
      },
    },
    selectedText: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    wrapperIconSelected: {
      '&>svg>path': {
        fill: 'url(#paint0_linear_1774_22866)',
      },
    },
    disabled: {
      cursor: 'default',
      opacity: 0.4,
    },
    wrapperNameAndIcon: {
      display: 'flex',
      alignItems: 'center',
      '&>div>svg': {
        width: 12,
        height: 12,
        marginLeft: 6,
      },
    },
  });

export const useStyles = makeStyles(styles);

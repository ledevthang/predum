import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wrapperIcon: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 220,
      borderRadius: 2,
      border: '1px solid #5A5A5E',
      padding: 24,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    wrapperIconSelected: {
      '&>svg>path': {
        fill: 'url(#paint0_linear_3131_49144)',
      },
      borderColor: '#3FADD5',
      '& p': {
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      '& .wrapperLogoUvp': {
        '&>svg>path': {
          fill: 'url(#paint0_linear_3131_49144)',
        },
        '&>p': {
          color: '#3FADD5',
        },
      },
    },
    disabled: {
      cursor: 'default',
      opacity: 0.4,
    },
    comingSoon: {
      width: 220,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      top: 227,
      left: 0,
      bottom: 0,
      right: 0,
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
        width: '100%',
        bottom: 420,
        top: 0,
        left: 0,
      },
    },
    kindOfEvent: {
      fontSize: 16,
      fontWeight: 500,
      marginTop: 16,
      marginBottom: 8,
    },
    kindOfEventDescription: {
      fontSize: 14,
      color: '#BDBDBB',
      textAlign: 'center',
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

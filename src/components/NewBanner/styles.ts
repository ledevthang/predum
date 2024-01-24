import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      position: 'relative',
      '& .indicators': {
        position: 'absolute',
        left: '50%',
        bottom: 20,
        transform: 'translateX(-50%)',
      },
    },
    indicator: {
      cursor: 'pointer',
      borderRadius: '50%',
      width: 8,
      height: 8,
      backgroundColor: '#666',
      margin: '0px 6px',
      '&.active': {
        backgroundColor: '#3FADD5',
      },
    },
    banner: {
      height: 160,
      width: '100%',
      display: 'flex',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        height: 200,
        width: 'calc(100% - 40px)',
        margin: '0px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        height: 140,
        width: '100%',
        backgroundSize: 'cover',
        margin: '0px',
      },
    },
    sologanWapper: {
      marginTop: 55,
      marginLeft: 40,
      [theme.breakpoints.down('md')]: {
        marginTop: 40,
        marginLeft: 40,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 26,
        marginLeft: 16,
      },
    },
    sologan: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: '#FFFFFF',
      marginBottom: 8,
      '&>button': {
        '&>span': {
          fontSize: 24,
          fontWeight: 600,
          padding: '0px 4px',
          marginBottom: 8,
          [theme.breakpoints.down('sm')]: {
            marginBottom: 6,
            fontSize: 14,
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
        marginBottom: 4,
        lineHeight: '19px',
      },
    },
    descSologan: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
      color: '#FFFFFF',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        lineHeight: '14px',
      },
    },
    buttonBanner: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      textTransform: 'uppercase',
      color: '#0B0B0E',
      background: '#FFFFFF',
      borderRadius: 30,
      marginTop: 8,
      '& span': {
        paddingTop: 12,
        paddingBottom: 13,
        paddingLeft: 28,
        paddingRight: 27,
      },
      [theme.breakpoints.down('md')]: {
        lineHeight: '17px',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 16,
      },
    },
  });

export const useStyles = makeStyles(styles);

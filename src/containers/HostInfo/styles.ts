import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      '&>div:first-child': {
        // overflow: 'hidden !important',
        '&>p': {
          fontSize: '14px',
          lineHeight: '17px',
          color: '#FFFFFF',
          marginBottom: 24,
          [theme.breakpoints.down('sm')]: {
            marginBottom: 16,
          },
        },
        '&>p:first-child': {
          cursor: 'pointer',
          marginRight: 4,
        },
        [theme.breakpoints.down('sm')]: {
          // marginBottom: 16,
          marginLeft: 16,
        },
      },
    },
    addNickname: {
      display: 'flex',
      cursor: 'pointer',
      '&>p': {
        color: '#29B6F6',
      },
      '& svg': {
        width: 20,
      },
    },
    header: {
      display: 'flex',
      '&>p': {
        display: 'flex',
        alignItems: 'center',
        color: '#BDBDBD',
        fontSize: '14px',
        lineHeight: '17px',
        marginRight: '24px',
        '&>svg': {
          width: 16,
          height: 16,
          marginRight: 8,
        },
      },

      '&>button': {
        width: 80,
        height: 26,
        background: '#C6EBFC',
        borderRadius: '14px',
        '&:hover': {
          backgroundColor: '#C6EBFC !important',
        },
        '&>span': {
          color: '#1976D2',
          fontSize: '14px',
          lineHeight: '17px',
        },
      },
    },
    unfollow: {
      '&>button': {
        background: '#4B4B4B',
        '&>span': {
          color: '#BDBDBD !important',
        },
        '&:hover': {
          background: '#4B4B4B !important',
        },
      },
    },
    bannerWapper: {
      position: 'relative',
    },
    button: {
      '&>span': {
        color: '#ABABAB',
        fontSize: '14px',
        lineHeight: '17px',
      },
      '&>svg': {
        height: 12,
        width: 16,
      },
    },
    buttonWapper: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 120,
      borderRadius: 2,
      padding: 10,
      // border: '1px solid #3FADD5',
      background: '#4b4b4b',
      [theme.breakpoints.down('sm')]: {
        width: 36,
        padding: '7px 7px 7px 12px',
        borderRadius: 20,
      },
    },
    banner: {
      height: 240,
      width: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      marginBottom: 20,
      [theme.breakpoints.down('md')]: {
        height: 160,
      },
      [theme.breakpoints.down('sm')]: {
        height: 140,
        backgroundSize: 'cover',
      },
    },
    sort: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      marginTop: 24,
      borderBottom: '1px solid #616161',
      paddingBottom: 1,
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        marginRight: 36,
      },
      '&>div>p': {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#BDBDBD',
        marginBottom: 8,
      },
      '&>div>hr': {
        width: 'calc(100%)',
        height: '2px',
        backgroundColor: '#BDBDBD',
      },
      '&>div:last-child': {
        // marginLeft: 36,
        marginRight: 0,
      },
    },
    info: {
      display: 'flex',
      marginBottom: 8,
      '&>p': {
        color: '#BDBDBD',
        fontSize: '16px',
        lineHeight: '19px',
      },
      '&>p:first-child': {
        fontWeight: 600,
        color: '#FFFFFF',
        marginRight: 4,
      },
    },
    hostInfo: {
      display: 'flex',
      justifyContent: 'space-evenly',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      background: 'rgba(0,0,0,0.6)',
      paddingTop: 10,
    },
    active: {
      '&>p': {
        color: '#3FADD5 !important',
      },
      borderBottom: '2px solid #3FADD5',
      marginBottom: 4,
    },
    textBlack: {
      color: '#000000',
    },
    saveButton: {
      '&>span': {
        color: 'black',
        // background: '#3FADD5 !important',
      },
      margin: '0px 20px',
    },
    processing: {
      marginRight: 20,
      color: '#000000',
    },
    title: {
      '&>h2': {
        color: '#000000',
      },
    },
    searchFilter: {
      marginBottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
        marginRight: 16,
      },
    },
    hostName: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
      width: '100%',
      paddingLeft: 240,
      paddingBottom: 14,
      minHeight: 40,
      '&>div:first-child': {
        visibility: 'hidden',
        [theme.breakpoints.down('md')]: {
          visibility: 'initial',
        },
      },
      '&>div>p:first-child': {
        fontSize: 24,
        fontWeight: 600,
        marginRight: 8,
      },
      '&>div>div>p:last-child': {
        fontSize: 16,
        color: '#BDBDBD',
      },
      '&>div:last-child>div': {
        maxHeight: 70,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        [theme.breakpoints.down('md')]: {
          maxHeight: 43,
        },
      },
      [theme.breakpoints.down('md')]: {
        paddingLeft: 170,
        paddingBottom: 10,
      },
      [theme.breakpoints.down('sm')]: {
        '&>div>p:first-child': {
          fontSize: 18,
        },
        '&>div>div>p:last-child': {
          fontSize: 14,
        },
        paddingLeft: 100,
        paddingBottom: 4,
      },
    },
    hostNameDesktop: {
      position: 'absolute',
      right: 0,
      marginTop: 8,
      width: '100%',
      minHeight: 40,
      '&>div>p:first-child': {
        fontSize: 24,
        fontWeight: 600,
      },
      '& svg': {
        position: 'initial !important',
      },
      [theme.breakpoints.down('md')]: {
        visibility: 'hidden',
      },
    },
    avatar: {
      position: 'absolute',
      left: 36,
      top: 120,
      '&>div:first-child': {
        width: 180,
        borderRadius: '100px',
        height: 180,
        [theme.breakpoints.down('md')]: {
          width: 120,
          height: 120,
        },
        [theme.breakpoints.down('sm')]: {
          width: 80,
          height: 80,
        },
      },
      '& svg': {
        position: 'absolute',
        left: 2,
        bottom: -11,
      },
      [theme.breakpoints.down('md')]: {
        top: 72,
      },
      [theme.breakpoints.down('sm')]: {
        top: 90,
        left: 16,
      },
    },
    iconChangeAva: {
      cursor: 'pointer',
      position: 'absolute',
      right: 7,
      bottom: 10,
      background: 'black',
      borderRadius: '20px',
      padding: 5,
      [theme.breakpoints.down('md')]: {
        bottom: 0,
      },
      [theme.breakpoints.down('sm')]: {
        bottom: -8,
        right: -8,
      },
    },
    wrapper: {
      marginTop: 16,
      marginLeft: 245,
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: 40,
        '&>div:first-child': {
          width: '100%',
          justifyContent: 'space-evenly',
        },
      },
      [theme.breakpoints.up('xl')]: {
        marginRight: 245,
        display: 'flex',
        justifyContent: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        '&>div:first-child': {
          width: '100%',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          '&>div': {
            marginRight: '0px !important',
            marginTop: 8,
          },
        },
      },
    },
  });

export const useStyles = makeStyles(styles);

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      marginBottom: 12,
    },
    main: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      backgroundColor: '#1C1C1E',
      padding: '44px 54px',
      [theme.breakpoints.down('md')]: {
        padding: '44px 36px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '20px 16px',
      },
    },
    wrapperMain: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    saveButton: {
      '&>span': {
        color: 'black',
        // background: '#3FADD5 !important',
      },
      margin: '0px 20px',
    },
    marginTop: {
      marginTop: 20,
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
    main1: {
      flexGrow: 1,
      marginLeft: 30,
      [theme.breakpoints.down('md')]: {
        marginLeft: 50,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        width: '100%',
      },
    },
    name: {
      fontSize: 24,
      fontWeight: 600,
    },
    time: {
      display: 'flex',
      marginBottom: 16,
      '&>p:first-child': {
        color: '#BDBDBD',
      },
      '&>p:last-child': {
        marginLeft: 4,
      },
      '&>p': {
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },
    },
    commonInput: {
      height: 44,
      backgroundColor: '#4B4B4B',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    commonInputDisabled: {
      height: 44,
      backgroundColor: '#4B4B4B',
      marginBottom: 24,
      '& input': {
        color: '#BDBDBD',
      },
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    commonInputTextArea: {
      backgroundColor: '#4B4B4B',
      marginBottom: 4,
      '& textarea': {
        height: '132px !important',
      },
    },
    wrapperFile: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 24,
      },
    },
    dateTime: {
      height: 44,
      backgroundColor: '#4B4B4B',
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    wrapperTime: {
      display: 'flex',
      '&>div:first-child': {
        marginRight: 12,
      },
    },
    marginBottom: {
      marginBottom: 24,
    },
    marginTop2: {
      marginTop: 16,
    },
    eventBanner: {
      width: '100%',
      height: 240,
      marginBottom: 24,
      [theme.breakpoints.down('md')]: {
        height: 190,
      },
      [theme.breakpoints.down('sm')]: {
        height: 90,
        flexDirection: 'row',
        '& svg': {
          marginRight: 12,
        },
      },
    },
    thumbnailUrl: {
      width: 240,
      height: 240,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    wrapperThumbnail: {
      width: 240,
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: 24,
      },
    },
    wrapperEditBanner: {
      position: 'absolute',
      right: 16,
      top: 16,
      [theme.breakpoints.down('sm')]: {
        right: 8,
        top: 8,
      },
    },
    changeBtn: {},
    teamLogo: {
      width: 56,
      height: 84,
      backgroundSize: 'contain',
    },
    vs: {
      fontSize: 14,
      color: '#BDBDBD',
      margin: '0px 24px',
    },
    buttonChangeThumbnail: {
      borderRadius: 2,
      color: '#3FADD5',
      border: '1px dashed #3FADD5',
      padding: '0px 8px !important',
    },
    wrapperEditThumbnail: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    closeBtn: {
      marginLeft: 12,
      '& svg': {
        width: 12,
        height: 12,
      },
    },
  });

export const useStyles = makeStyles(styles);
